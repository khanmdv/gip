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
 * GitLabel Class - Represents a label.
 */
var GitLabel = function(){
};

/**
 * Class Methods
 */
utils.extend(GitLabel, {
    
    /**
     * Mapping between REST API and class properties.
     */
    JSONKeyValueMap : function(){
        return {
            "url"      : "url",
            "name"     : "name",
            "color"    : "color"
        };
    }
});

/**
 * Instance Methods
 */
GitLabel.prototype = {
    toString : function(){
        return JSON.stringify({
            "url"   : this.url,
            "name"      : this.name,
            "color"    : this.color
        }, null, 4);
    }
};

module.exports = GitLabel;

