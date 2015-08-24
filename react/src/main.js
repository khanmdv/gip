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

var React = require('react');
var Router = require('react-router');

var Routes = require('./Routes');          

Router.run(Routes, function (Handler, state) {
    React.render(<Handler/>, document.getElementById('app'));
});