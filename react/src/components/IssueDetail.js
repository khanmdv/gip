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
var marked = require('marked');

// Our Imports
var API = require('../API');
var GitIssue = require('../models/GitIssue');
var IssueComments = require('./IssueComments');
var HtmlNode = require('./HtmlNode');
var LoadingIndicator = require('./LoadingIndicator');
var ErrorMsgWithRetry = require('./ErrorMsgWithRetry');

/**
 * Represents an issue.
 */
var IssueDetail = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState : function(){
        return {
            loading : true,
            error : null,
            issue : null
        };
    },
    
    /**
     * Fetch issue from GitHub API.
     * 
     * @private
     */
    _fetchIssue : function(){
        var self = this;
        var issueNumber = this.context.router.getCurrentParams().issueId;
        var state = this.state;
        
        state.loading = true;
        
        API.getIssueWithNumber(issueNumber, function(issue, error){
            state.loading = false;
            
            if (error){
                state.error = error.message;
                state.issue = null;
            } else if (!issue || Object.keys(issue).length === 0){
                state.error = 'Issue is unavailable.';
                state.issue = null;
            } else {
                state.error = null;
                state.issue = issue;
            }
            
            // Render            
            self.setState(state);
        });
    },
    
    /**
     * Lifecycle Methods
     */
    componentWillMount : function(){
        this._fetchIssue();
    },
    
    componentWillReceiveProps : function(){
        this._fetchIssue();
    },
    
    onRetryClicked : function(){
        this._fetchIssue();
    },
    
    /**
     * Renders issue labels
     *  
     * @param {Object} issue
     * 
     * @private
     */
    _renderLabels : function(issue){
        if (issue.labels && issue.labels.length > 0){
            
            return issue.labels.map(function(label, i){
                var style = {
                    backgroundColor : '#' + label.color,
                    marginRight:'3px',
                    float:'right'
                };
                return (
                    <span className="issue-label" style={style} key={i}>
                        <a className="label" href={label.url}>{label.name}</a>
                    </span>
                );
            });
        } else {
            return <span></span>
        }
    },
    
    /**
     * Render issue.
     */
    render: function () {
        var self = this;
        var issue = this.state.issue;
        
        var loadingDiv = '',
            errorDiv = '',
            issueInfo = '',
            issueHeader = '',
            issueSummary = '',
            issueComments = '';
        
        if (this.state.loading === true){
            loadingDiv = <LoadingIndicator fullScreen={true}/>        
        }
        
        if (this.state.error){
            errorDiv = <ErrorMsgWithRetry message={this.state.error} onRetryClicked={self.onRetryClicked}/>
        }

        if (issue){
            
            var issueStateIconColor = issue.state === GitIssue.IssueState.Open ? 'orange' : 'green';
            
            issueHeader =   <div className="issues-header">
                                <h3><span className="text-muted">npm / #{issue.number}</span></h3>
                            </div>
            
            issueInfo =   <div>
                                <i className="fa fa-dot-circle-o issue-state" style={{color : issueStateIconColor}}>&nbsp;</i>&nbsp;&nbsp;<h3 className="issue-title">{issue.title}&nbsp;&nbsp;<span className="text-muted">#{issue.number}</span></h3>
                                <br/>
                                <div className="issue-cell-user">{this._renderLabels(issue)}<img className="issue-gravatar" src={issue.user.gravatarURL} />&nbsp;<a className="user-link text-muted" href={issue.user.profileURL}>{issue.user.userName}</a> <span className="text-muted">created {issue.createdAt.fromNow()}</span></div>
                                <br/>  
                            </div> ;
                            
            issueSummary =  <div className="issue-summary">
                                <HtmlNode html={issue.summary}/>
                            </div>;
            
            issueComments = <div className="issue-comments">
                                <IssueComments commentsURL={issue.commentsURL}/>
                            </div>;
        }
        
        return (
            <div>
                {/* Issue header */}
                {issueHeader}
                <div className="issue-detail-container">
                    {loadingDiv}
                    {errorDiv}
                    
                    {/* Issue Info */}
                    {issueInfo}
                     <br/>
                    
                    {/* Issue Summary */}
                    {issueSummary}
                    
                    <hr size="1"/>
                    
                    {/* Issue Comments */}
                    <h5>Comments</h5>
                    {issueComments}
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
});

module.exports = IssueDetail;