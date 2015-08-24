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
var assert = require('../utils').assert;

/**
 * Models Objects generator.
 */
var ModelObject = {
    
    /**
     * Converts a JSON blob into a model object.
     * 
     * @param {Object} Klass Model class to which the JSON would map to.
     * @param {Object} JSON JSON from some REST API.
     */
    getModelOfClassFromJSON : function(Klass, JSON){
        
        // assert just calls console.warn() in browser environment. 
        // It throws error in test env.
        assert(Klass, 'Class cannot be undefined or null.');
        
        // Make sure we dont crash.
        Klass = Klass || Object;
        
        var newObj = new Klass();
        
        // Check for null or empty json
        if (!JSON || Object.keys(JSON).length === 0){
            return newObj;
        }        
        
        assert(Klass.JSONKeyValueMap, 'Class must implement "JSONKeyValueMap" interface.');
        
        var jsonKeyValueMap = Klass.JSONKeyValueMap ? Klass.JSONKeyValueMap() : {};
        
        for (var key in jsonKeyValueMap){
            if ( jsonKeyValueMap.hasOwnProperty(key) ){
                
                var prop = jsonKeyValueMap[key];
                
                var transformerFunction = key + 'Transformer';
                var rawValue = JSON[prop];
                
                // Transform as per the model wants it.                
                if ( Klass[transformerFunction] && typeof Klass[transformerFunction] === 'function' ){
                    newObj[key] = Klass[transformerFunction](rawValue);
                } else {
                    newObj[key] = rawValue;
                } 
            }
        }
        
        return newObj;
    }
};

module.exports = ModelObject;

