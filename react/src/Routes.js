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
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Route = Router.Route;

// Our Imports
var Issues = require('./components/Issues');
var IssueDetail = require('./components/IssueDetail');
var App = require('./components/App');
var NotFound = require('./components/NotFound');

/**
 * Defines app's routes.
 */
var Routes = (
    <Route handler={App} path="/">
        <Route name="issues" path="issues" handler={Issues}/>
        <Redirect from="/" to="/issues?page=1" />
        <Route name="issue" path="issue/:issueId" handler={IssueDetail} />
        <DefaultRoute handler={Issues}/>
        <NotFoundRoute handler={NotFound} />
    </Route>
);

module.exports = Routes;
