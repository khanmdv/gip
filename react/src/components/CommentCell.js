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

// Our Imports
var HtmlNode = require('./HtmlNode');
var constants = require('../constants');

/**
 * Renders a comment row (TR).
 */
var CommentCell = React.createClass({
    
    /**
     * {comment} GitComment Object
     */
    PropTypes : {
        comment : React.PropTypes.object    
    },
    
    /**
     * Uses GitHub markdown format of [Link](http://link.com) to convert @user into anchors.
     * 
     * @param {Object} str
     * 
     * @private
     */
    _convertUserNamesIntoGitHubLinks : function(str){
        if (!str){
            return '';
        }
        
        str = str.replace(/@([a-zA-Z0-9]+)/gi, '[@$1](' + constants.GITHUB_LINK + '$1)');
        return str;
    },
    
    render : function(){
        var self = this;

        return (
            <tr className="issue-comments-row">
                <td vAlign="top">
                    <div style={{textAlign:'center'}}>
                        <img className="issue-gravatar" src={this.props.comment.user.gravatarURL} />
                    </div>
                    <br/>
                </td>
                <td vAlign="top">
                    <div className="issue-comment-cell">
                        <div className="comments-header">
                            <span className="text-important">
                                <a href="{this.props.comment.user.gravatarURL}">{this.props.comment.user.userName}</a> <span className="text-muted">commented {this.props.comment.createdAt.fromNow()}</span>
                            </span>
                        </div>
                        <br/>
                        <div className="comment-message">
                            <HtmlNode html={self._convertUserNamesIntoGitHubLinks(this.props.comment.commentMessage)} />
                        </div>
                    </div>
                </td>
             </tr>
        );
    }
});

module.exports = CommentCell;

