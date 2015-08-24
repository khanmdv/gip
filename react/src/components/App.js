/** 
 * Copyright (C) 2015 Anonymous Guy 
 * 
 * All Rights Reserved
 * 
 * You may use, distribute, criticize or tear apart this code under the
 * terms of the FREE license. Don't worry about patent infringements
 * or any **** of that kind.
 */

'use strict';

// Lib Imports
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/**
 * Renders the application's main container.
 */
var App = React.createClass({
    render: function() {
        return (
            <div>
                <div className="app-header" align="center">
                    <span className="github-icon"> </span>
                </div>
                <div className="app-container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;