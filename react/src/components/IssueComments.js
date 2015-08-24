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
var Well = require('react-bootstrap').Well;

// Our Imports
var ErrorMsgWithRetry = require('./ErrorMsgWithRetry');
var API = require('../API');
var constants = require('../constants');
var CommentsTable= require('./CommentsTable');
var LoadingIndicator = require('./LoadingIndicator');

/**
 * Renders an issue comments table.
 */
var IssueComments = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    PropTypes : {
        commentsURL : React.PropTypes.string
    },
    getInitialState : function(){
        return {
            loading : true,
            error : null,
            comments : []
        };
    },
    
    /**
     * Fetch comments from GitHub API.
     * @param {Object} props
     * 
     * @private
     */
    _fetchComments : function(commentsURL){
        var self = this;
        var state = this.state;
        state.loading = true;

        API.fetchCommentsWithCommentsURL(commentsURL, function(comments, error){
            
            state.loading = false;
        
            if (error){
                state.error = error.message;
                state.comments = [];
            } else if (!comments || comments.length === 0){
                state.error = 'There are no comments.';
                state.comments = [];
            } else {
                state.error = null;
                state.comments = comments;
            }
            
            // Render
            self.setState(state);
        });
    },
    
    /**
     * Lifecycle Methods 
     */
    componentWillMount : function(){
        if (this.props.commentsURL){
            this._fetchComments(this.props.commentsURL);
        }
    },
    
    componentWillReceiveProps : function(nextProps){
        var self = this;
        if (nextProps.commentsURL){
            this._fetchComments(nextProps.commentsURL);
        }
    },
    onRetryClicked : function(event){
        if (this.props.commentsURL){
            this._fetchComments(this.props.commentsURL);
        }
        
        event.preventDefault();
    },
    
    /**
     * Render issue comments.
     */
    render: function () {
        
        var self = this;
        var loadingDiv = '';
        var errorDiv = '';
        var issueCommentsTable = '';
        
        if (this.state.loading){
            loadingDiv = <LoadingIndicator fullScreen={false} />        
        }
        
        if (this.state.error){
            errorDiv = <ErrorMsgWithRetry message={this.state.error} onRetryClicked={this.onRetryClicked}/>
        }

        if (this.state.comments.length > 0){
            issueCommentsTable =  <CommentsTable comments={this.state.comments} />
        }

        return (
            <div className="container issue-comments-container">
                <div className="issues-comments">
                    {loadingDiv}
                    {errorDiv}
                    {issueCommentsTable}
                </div>
            </div>
        );
    }
});

module.exports = IssueComments;
