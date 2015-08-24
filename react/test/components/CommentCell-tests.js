'use strict';

// Lib Imports
var assert = require('chai').assert,
    expect = require('chai').expect,
    jsdom = require('jsdom'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    rewire = require('rewire');

var moment = require('moment');

describe('CommentCell Tests', function() {
    
    var CommentCell;
    var React, TestUtils;
    
    beforeEach(function(done) {
        this.timeout(15000);
        
        mockery.enable({
            warnOnReplace : false,
            warnOnUnregistered : false,
            useCleanCache : true
        });

        global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
        global.window = global.document.parentWindow;
        global.navigator = {
            userAgent: 'node.js'
        };
        
        require('react/lib/ExecutionEnvironment').canUseDOM = true;
        
        React = require('react/addons');
        TestUtils = require('react/lib/ReactTestUtils');
        
        CommentCell = require('../../src/components/CommentCell');
        
        done();
    });

    afterEach(function(done) {
        delete global.window;
        delete global.document;
        delete global.navigator;
        mockery.disable();

        done();
    });
    
    it('Should render just fine', function() {
        
        var TestComponent = React.createClass({
            render : function(){
                return (
                    <table>
                        <tbody>
                            <CommentCell comment={{
                                "id" : 12345,
                                "createdAt" : moment("2015-08-18T00:04:02Z", 'YYYY-MM-DDTHH:mm:ssZ'),
                                "commentMessage" : "@user",
                                "user" : {
                                    "userName" : "name",
                                    "profileURL" : "http://someurl/",
                                    "gravatarURL" : "http://gsomeurl/"
                                }
                            }}/>
                        </tbody>
                    </table>
                );
            }
        });
        
        var renderedComponent = TestUtils.renderIntoDocument(
            <TestComponent/>
        );
        
        var tr = TestUtils.findRenderedDOMComponentWithTag(
            renderedComponent,
            'tr'
        );
        
        tr = tr.getDOMNode();

        var td1 = tr.childNodes[0];

        expect(tr).to.be.ok;
        
        // Gravatar URL
        expect(td1.childNodes[0].childNodes[0].src).to.equal('http://gsomeurl/');
        
        var commentMsgDiv = TestUtils.findRenderedDOMComponentWithClass(
            renderedComponent,
            'comment-message'
        );
        
        commentMsgDiv = commentMsgDiv.getDOMNode();
        
        expect(commentMsgDiv).to.be.ok;
        
        var aTag = commentMsgDiv.getElementsByTagName('a')[0];
        expect(aTag).to.be.ok;
        expect(aTag.href).to.equal('https://github.com/user');
    });
    
    it('Should render user names as links', function() {
        
        var TestComponent = React.createClass({
            render : function(){
                return (
                    <table>
                        <tbody>
                            <CommentCell comment={{
                                "id" : 12345,
                                "createdAt" : moment("2015-08-18T00:04:02Z", 'YYYY-MM-DDTHH:mm:ssZ'),
                                "commentMessage" : "@user",
                                "user" : {
                                    "userName" : "name",
                                    "profileURL" : "http://someurl/",
                                    "gravatarURL" : "http://gsomeurl/"
                                }
                            }}/>
                        </tbody>
                    </table>
                );
            }
        });
        
        var renderedComponent = TestUtils.renderIntoDocument(
            <TestComponent/>
        );
        
        var commentMsgDiv = TestUtils.findRenderedDOMComponentWithClass(
            renderedComponent,
            'comment-message'
        );
        
        commentMsgDiv = commentMsgDiv.getDOMNode();
        
        expect(commentMsgDiv).to.be.ok;
        
        var aTag = commentMsgDiv.getElementsByTagName('a')[0];
        expect(aTag).to.be.ok;
        expect(aTag.href).to.equal('https://github.com/user');
    });
});
