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
var utils = require('../utils');

/**
 * GitUser Class - Represents a user.
 */
var GitUser = function(){
};

/**
 * Class Methods
 */
utils.extend(GitUser, {
    
    /**
     * Mapping between REST API and class properties.
     */
    JSONKeyValueMap : function(){
        return {
            "userName"      : "login",
            "gravatarURL"   : "avatar_url",
            "profileURL"    : "html_url"
        };
    }
});

/**
 * Instance Methods
 */
GitUser.prototype = {
    toString : function(){
        return JSON.stringify({
            "gravatarURL"   : this.gravatarURL,
            "userName"      : this.userName,
            "profileURL"    : this.profileURL
        }, null, 4);
    }
};

module.exports = GitUser;

