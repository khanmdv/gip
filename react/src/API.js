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

// Our Imports
var constants = require('./constants');
var ModelObject = require('./models/ModelObject');
var GitIssue = require('./models/GitIssue');
var GitIssueComment = require('./models/GitIssueComment');

/**
 * Uses jQuery's I/O methods to fetch issues from GitHub API.
 */
var GitHubAPI = {
    /**
     * 
     * @param {Object} pageNumber Page number
     * @param {Object} callback Callback(issues, error)
     */
    getIssuesForPage : function(pageNumber, callback){
        
        if (global.$){
            
            global.$.ajaxSetup({
                contentType: "application/json; charset=utf-8",
            });
            
            global.$.getJSON(constants.GITHUB_ISSUES_API, {
                page : pageNumber
            }).done(function(data){
                
                if (!data || data.length === 0){
                    callback(data, new Error('There are no issues.'));
                } else {
                    
                    var issues = data.map(function(issueJSON){
                        return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
                    });
                    
                    callback(issues, null);
                }
            }).fail(function(jqxhr, textStatus, error ){
                console.log(textStatus + ' - ' + error);
                callback([], new Error('Cannot fetch issues.'));                
            });
        } else {
            callback([], new Error('jQuery not available. Please include jQuery in the head section of your page.'));
        }
    },
    
    /**
     * Fetches just an issue give the issue number.
     * 
     * @param {Object} issueNumber
     * @param {Object} callback
     */
    getIssueWithNumber : function(issueNumber, callback){
        
        if (global.$){
            
            global.$.ajaxSetup({
                contentType: "application/json; charset=utf-8",
            });
            
            global.$.getJSON(constants.GITHUB_ISSUES_API + '/' + issueNumber).done(function(data){
                
                if (!data || Object.keys(data).length === 0){
                    callback(data, new Error('Issue does not exists.'));
                } else {
                    var issue = ModelObject.getModelOfClassFromJSON(GitIssue, data);
                    callback(issue, null);
                }
            }).fail(function(jqxhr, textStatus, error ){
                callback({}, new Error('Cannot fetch issue.'));                
            });
        } else {
            callback({}, new Error('jQuery not available. Please include jQuery in the head section of your page.'));
        }
    },
    
    /**
     * The name says it all.
     *  
     * @param {Object} commentsURL
     * @param {Object} callback
     */
    fetchCommentsWithCommentsURL : function(commentsURL, callback){
        
        if (global.$){
            
            global.$.ajaxSetup({
                contentType: "application/json; charset=utf-8",
            });
            
            global.$.getJSON(commentsURL).done(function(data){
                
                if (!data || data.length === 0){
                    callback(data, new Error('There are no comments.'));
                } else {
                    
                    var issues = data.map(function(issueJSON){
                        return ModelObject.getModelOfClassFromJSON(GitIssueComment, issueJSON);
                    });
                    
                    callback(issues, null);
                }
            }).fail(function(jqxhr, textStatus, error ){
                console.log(textStatus + ' - ' + error);
                callback({}, new Error('Cannot fetch comments.'));                
            });
        } else {
            callback({}, new Error('jQuery not available. Please include jQuery in the head section of your page.'));
        }
    }
};

module.exports = GitHubAPI;
