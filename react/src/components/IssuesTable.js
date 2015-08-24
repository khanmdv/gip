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
var IssueCell = require('./IssueCell');

/**
 * Renders the Issues table.
 */
var IssuesTable = React.createClass({
    /**
     * Properties
     * 
     * {issues} List of issues to render
     */
    PropTypes : {
        issues : React.PropTypes.array    
    },
    
    /**
     * Render Issue rows
     */
    _renderIssueRows : function(){
        return this.props.issues.map(function(issue, i){
            return (
                <tr key={issue.number} className="issue-table-rows">
                    <td>
                        <IssueCell key={i} issue={issue} />
                    </td>
                 </tr>
            );
        });
    },
    /**
     * Render issues.
     */
    render : function(){
        var self = this;
        
        return (
            <table className="table table-hover issues-main-table">
                <thead>
                    <tr>
                        <td><b>Issues</b></td>
                    </tr>
                </thead>
                <tbody>
                    {self._renderIssueRows()}
                </tbody>
            </table>   
        );
    }
});

module.exports = IssuesTable;
