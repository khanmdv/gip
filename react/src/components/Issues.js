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
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

// Our Imports
var ErrorMsgWithRetry = require('./ErrorMsgWithRetry');
var IssuesTable = require('./IssuesTable');
var API = require('../API');
var constants = require('../constants');
var Paginator = require('./Paginator');
var LoadingIndicator = require('./LoadingIndicator');

/**
 * Issues - Lists all issues.
 */
var Issues = React.createClass({
    mixin : [Navigation],
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState : function(){
        return {
            loading : true,
            error : '',
            activePage : 1,
            issues : []
        };
    },
    
    /**
     * Private Methods 
     */
    
    /**
     * Fetch issues from the GitHib Issues API.
     * 
     * @param {Object} activePage Page number for which the issues are to be fetched.
     */
    _fetchGitIssuesForPage : function(activePage){
        var self = this;
        var state = this.state;
        
        // Show the loading indicator
        state.activePage = activePage;
        state.loading = true;
        state.error = null;
        
        API.getIssuesForPage(state.activePage, function(issues, error){
            state.loading = false;
            
            if (error){
                state.error = error.message;
                state.issues = [];
            } else if (!issues || issues.length === 0){
                state.error = 'There are no issues.';
                state.issues = [];
            } else {
                state.issues = issues;    
            }
            
            // Render            
            self.setState(state);
        });
    },
    
    _fetchIssues : function(){
        var queryParams = this.context.router.getCurrentQuery();
        var activePage = 1;
        if (queryParams && !isNaN(queryParams.page)){
            activePage = parseInt(queryParams.page);
        }
        
        this._fetchGitIssuesForPage(activePage); 
    },
    
    /**
     * Does some accessibility control.
     * On the issues page when tab key is clicked it moves through
     * the issue title links. Pressing Enter on it will go to the corresponding 
     * issue page.
     * 
     * Using jQuery here for some DOM searching. jQuery
     * can work with react as long as we don't manipulate the DOM thereby 
     * breaking react's virtual DOM.
     */
    _listenForKeyEvents : function(keyEvent){
        
        if (keyEvent.keyCode === 9){ // Tab key
            var currentLink = global.$('a.issue-title-link.focus');
            if (currentLink.length === 0){
                global.$('a[tabIndex="0"]').addClass('focus');
            } else {
                global.$(currentLink).removeClass('focus');
                
                // Find the next link
                var currentTabIndex = parseInt(currentLink.attr('tabIndex'));
                var nextLink = global.$('a[tabIndex="' + (currentTabIndex+1) + '"]');
                if (nextLink.length > 0){
                    nextLink.addClass('focus');
                } else {
                    global.$('a[tabIndex="0"]').addClass('focus');
                }
            }
        } else if (keyEvent.keyCode === 13){ // ENter key
            var currentLink = global.$('a.issue-title-link.focus');
            if (currentLink.length > 0 && global.location.hash){
                Router.HashLocation.push(currentLink.attr('href'));
            }
        }
    },
    
    /**
     * Lifecycle Methods     
     */
    componentWillReceiveProps(nextProps) {
        this._fetchIssues();
    },
    componentWillMount : function(){
        this._fetchIssues();
        if (global.addEventListener){
            global.addEventListener("keydown", this._listenForKeyEvents, true);
        }
    },
    componentWillUnmount : function(){
        if (global.removeEventListener){
            global.removeEventListener("keydown", this._listenForKeyEvents, true);
        }
    },
    
    /**
     * Events Handlers    
     */
    // retry button handler
    onRetryClicked : function(event){
        this._fetchGitIssuesForPage(this.state.activePage);
        event.preventDefault();
    },
    
    /**
     * Pagination handler
     * @param {Object} selectedPage
     */
    handlePageSelected : function(selectedPage){
        var currentPath = this.context.router.getCurrentPath();
        if (currentPath){
            currentPath = currentPath.substr(0, currentPath.indexOf('?'));
        }
        var query = this.context.router.getCurrentQuery();
        query.page = selectedPage;
        var queryParams = Object.keys(query).map(function(name){
            return name + '=' + query[name];
        }).join('&');
        
        Router.HashLocation.push(currentPath  + '?' + queryParams);
    },
    
    /**
     * Render
     */
    render: function () {
        var self = this;
        
        var loadingDiv = '';
        var errorDiv = '';
        var issuesTable = '';
        
        if (this.state.loading){
            loadingDiv = <LoadingIndicator fullScreen={true}/> 
        } else if (this.state.error){
            errorDiv = <ErrorMsgWithRetry message={this.state.error} onRetryClicked={this.onRetryClicked}/>
        }

        if (this.state.issues.length > 0){
            issuesTable = <IssuesTable issues={self.state.issues} />
        }
        
        return (
            <div>
                <div className="issues-header">
                    <h3><span className="text-muted">npm</span> / <b>npm</b></h3>
                </div>
                <div className="issues-container">
                    <div className="issues-table">
                        {loadingDiv}
                        {errorDiv}
                        {issuesTable}
                    </div>
                    <div className="issues-paginator" align="center">
                        <Paginator activePage={this.state.activePage} onPageSelected={self.handlePageSelected} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Issues;