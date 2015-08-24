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
 * Renders a 404 Not Found message.
 */
var NotFound = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Not Found</h1>
            </div>
        );
    }
});

module.exports = NotFound;