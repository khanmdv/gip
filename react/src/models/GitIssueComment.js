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
var ModelObject = require('./ModelObject');

/**
 * GitIssueComment class - Represents a comment.
 */
var GitIssueComment = function() {
};

/**
 * Class Methods.
 */
utils.extend(GitIssueComment, {
    
    /**
     * Mapping between REST API and class properties.
     */
    JSONKeyValueMap : function() {
        return {
            "id" : "id",
            "createdAt" : "created_at",
            "commentMessage" : "body",
            "user" : "user"
        };
    },
    
    /**
     * Transformer functions
     */
    idTransformer : function(rawValue) {
        return parseInt(rawValue);
    },
    
    /** Convert the user json into a GitUser Object */
    userTransformer : function(rawValue) {
        return ModelObject.getModelOfClassFromJSON(GitUser, rawValue);
    },
    
    /** Convert a string date into monent instance */
    createdAtTransformer : function(rawValue){
        return moment(rawValue, 'YYYY-MM-DDTHH:mm:ssZ');
    }
});

/**
 * Instance Methods
 */
GitIssueComment.prototype = {
    toString : function() {
        return JSON.stringify({
            "id" : this.id,
            "createdAt" : this.createdAt,
            "commentMessage" : this.commentMessage,
            "user" : this.user.toString()
        }, null, 4);
    }
};

module.exports = GitIssueComment;
