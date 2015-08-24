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
var CommentCell = require('./CommentCell');

/**
 * Renders the issue comments.
 */
var CommentsTable = React.createClass({
    PropTypes : {
        comments : React.PropTypes.array    
    },
    
    /**
     * Renders comment rows.
     * @private
     */
    _renderCommentRows : function(){
        return this.props.comments.map(function(comment, i){
            return (
                <CommentCell key={i} comment={comment} />
            );
        });
    },
    render : function(){
        if (this.props.comments){
            return (
                <table className="table comments-table">
                    <colgroup>
                        <col width="10%"/>
                        <col width="90%"/>
                    </colgroup>
                    <tbody>
                     {this._renderCommentRows()}
                    </tbody>
                </table> 
            );
        } else {
            return (<span></span>);
        }
    }
});

module.exports = CommentsTable;
