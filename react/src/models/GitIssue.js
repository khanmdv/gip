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
var moment = require('moment');

// Our Imports
var utils = require('../utils');
var GitUser = require('./GitUser');
var GitLabel = require('./GitLabel');
var ModelObject = require('./ModelObject');

/** Constants */
var SHORT_SUMMARY_MAX_CHARS = 140;

/** Issue state enum */
var IssueState = {
    IssueStateOpen : 0,
    IssueStateClosed : 1
};

/**
 * GitIssue class - Represents an Issue.
 */
var GitIssue = function() {
};

/**
 * Class Methods.
 */
utils.extend(GitIssue, {
    
    /** IssueState Enum */
    IssueState : IssueState,
    
    /**
     * Mapping between REST API and class properties.
     */
    JSONKeyValueMap : function() {
        return {
            "number"        : "number",
            "title"         : "title",
            "labels"        : "labels",
            "summary"       : "body",
            "state"         : "state",
            "user"          : "user",
            "commentsURL"   : "comments_url",
            "createdAt"     : "created_at"
        };
    },
    
    /**
     * These transformer functions are used by the REST service
     * to convert the raw JSON value into something meaningful.
     * 
     * Transformer functions follow a "<PropertyName>Transformer" protocol.
     */
    
    /** Convert issue number to an integer */
    numberTransformer : function(rawValue) {
        return parseInt(rawValue);
    },
    
    /** Convert the user json into a GitUser Object */
    userTransformer : function(rawValue) {
        return ModelObject.getModelOfClassFromJSON(GitUser, rawValue);
    },
    
    /** Convert labels into cModel objects */
    labelsTransformer : function(rawValue){
        var labels = [];
        if (rawValue && rawValue instanceof Array && rawValue.length > 0){
            
            labels = rawValue.map(function(rawLabelJSON){
                return ModelObject.getModelOfClassFromJSON(GitLabel, rawLabelJSON);
            });
        }
        
        return labels;
    },
    
    /** Convert string to IssueState Enum */
    stateTransformer : function(rawValue) {
        return rawValue === 'open' ? IssueState.IssueStateOpen : IssueState.IssueStateClosed;
    },
    
    /** Convert a string date into moment instance */
    createdAtTransformer : function(rawValue){
        return moment(rawValue, 'YYYY-MM-DDTHH:mm:ssZ');
    }
});

/**
 * Instance Methods
 */
GitIssue.prototype = {
    toString : function() {
        return JSON.stringify({
            "number" : this.number,
            "title" : this.title,
            "labels" : this.labels,
            "summary" : this.summary,
            "state" : this.state,
            "user" : this.user.toString(),
            "commentsURL" : this.commentsURL,
            "createdAt" : this.createdAt
        }, null, 4);
    },

    /**
     * Returns a short summary. <= 140 chars(ending in a clean line or word).
     * 
     * We are searching for a space/new line/tab to make sure we get the full word.
     * Start from character at index 140 and move backwards until one of the above
     * char is encountered.
     */
    getShortSummary : function() {

        if ( !utils.trimStr(this.summary) ) {
            return '';
        }

        if (this.summary.length <= SHORT_SUMMARY_MAX_CHARS) {
            return this.summary;
        } else {
            var index = SHORT_SUMMARY_MAX_CHARS - 1;
            var ch = this.summary.charAt(index--);
            while (!(ch === ' ' || ch === '\r' || ch === '\n' || ch === '\t')) {
                
                if (index === 0) {
                    // Not one above char was found. So we just return 140 chars.
                    index = SHORT_SUMMARY_MAX_CHARS - 1;
                    break;
                }

                ch = this.summary.charAt(index--);
            }

            return this.summary.substr(0, index + 1);
        }
    },
    
    /**
     * convert date into given format.
     * 
     * @param {Object} format as string.
     */
    formatCreatedAtDateAs : function(format){
        return this.createdAt.format(format);
    }
};

module.exports = GitIssue;
