'use strict';

var fs = require('fs');
var html;

module.exports = function(grunt) {
    grunt.initConfig({
        clean : ['build'],
        copy : {
            main : {
                files : [{
                    cwd : 'public/',
                    src : '**/*',
                    dest : 'build/',
                    expand : true
                }, {
                    cwd : 'src/',
                    src : 'index.html',
                    dest : 'build/',
                    expand : true
                }]
            }
        },
        watch : {
            scripts : {
                files : ['public/**/*', 'src/index.html'],
                tasks : ['copy'],
                options : {
                    spawn : false
                }
            }
        },
        concurrent : {
            dev : ['webpack:dev', 'watch', 'connect'],
            options : {
                logConcurrentOutput : true
            }
        },
        jshint : {
            all : ['*.js', '*.jsx', '{src}/**/*.js'],
            options : {
                jshintrc : true
            }
        },
        connect : {
            server : {
                options : {
                    port : 8000,
                    hostname : '0.0.0.0',
                    base : 'build/',
                    keepalive : true,
                    open : true,
                    middleware : function(connect, options, middlewares) {
                        // inject a custom middleware into the array of default middlewares
                        middlewares.unshift(function(req, res, next) {
                            if (!html){
                                html = fs.readFileSync(__dirname + '/build/index.html');
                            }
                            
                            function run(){
                                if (req.url === '/' || req.url.match(/^\/issues.*/ig)){
                                res.end(html);
                                } else {
                                    next();
                                }
                            }
                            
                            run();
                        });

                        return middlewares;
                    }
                }
            }
        },
        webpack : {
            dev : {
                resolve : {
                    extensions : ['', '.js', '.jsx']
                },
                entry : './src/main.js',
                output : {
                    path : './build/js',
                    publicPath : '/public/js/',
                    filename : '[name].min.js'
                },
                module : {
                    loaders : [{
                        test : /\.css$/,
                        loader : 'style!css'
                    }, {
                        test : /\.(js|jsx)$/,
                        exclude : /node_modules/,
                        loader : require.resolve('babel-loader')
                    }, {
                        test : /\.json$/,
                        loader : 'json-loader'
                    }]
                },
                stats : {
                    colors : true
                },
                devtool : 'source-map',
                watch : true,
                keepalive : true
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // tasks
    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'concurrent:dev']);
    grunt.registerTask('run', ['connect']);
};

