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
var Link = Router.Link;

// Our Imports
var GitIssue = require('../models/GitIssue');
var HtmlNode = require('./HtmlNode');

/**
 * Represents a table cell. Renders issue details.
 */
var IssueCell = React.createClass({
    /**
     * Properties
     * 
     * {issue} GitIssue object
     */
    PropTypes : {
        issue : React.PropTypes.object
    },
    _renderLabels : function(){
        return this.props.issue.labels.map(function(label, i){
            var style = {
                backgroundColor : '#' + label.color,
                marginRight:'3px'
            };
            return (
                <span className="issue-label" style={style} key={i}>
                    <a className="label" href={label.url}>{label.name}</a>
                </span>
            );
        });
    },
    render : function(){
        var issueStateIconColor = this.props.issue.state === GitIssue.IssueState.Open ? 'orange' : 'green';
        var self = this;
        return (
            <div className="issue-cell">
                {/* Issue Header */}
                <h4 className="issue-title">
                    <span className="text-muted">#{this.props.issue.number}</span>&nbsp;&nbsp;
                    <Link to={'/issue/' + this.props.issue.number}>{this.props.issue.title}</Link>
                </h4>&nbsp;{self._renderLabels()}
                
                {/* User info */}
                <div className="issue-cell-user">
                    <img className="issue-gravatar" src={this.props.issue.user.gravatarURL} />&nbsp;
                    <a className="user-link text-muted" href={this.props.issue.user.profileURL}>{this.props.issue.user.userName}</a> <span className="text-muted">created {this.props.issue.createdAt.fromNow()}</span>
                </div>
                <br/>
                
                {/* Issue short summary */}
                <div className="issue-summary">
                    <div style={{display:'inline-block'}}>
                        <HtmlNode html={this.props.issue.getShortSummary()}/>
                    </div>&nbsp;
                    <i style={{display:'inline-block'}} className="fa fa-ellipsis-h">&nbsp;</i>
                </div>
            </div>
        );
    }
});

module.exports = IssueCell;