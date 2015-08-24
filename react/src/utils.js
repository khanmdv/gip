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

module.exports = {
    assert : function(condition, message){
        var warn = console.warn ? console.warn : function(){};
        
        if (!condition){
            if (typeof window === 'undefined') {
                // Must be test env
                throw new Error(message);
            } else {
                // We are in browser. Don't throw an exception.
                warn('WARNING!!! %s', message);
            }
        }
    },
    extend : function(toObj, fromObj){
        
        if (!fromObj){
            return toObj;
        }
        
        for (var prop in fromObj){
            if (fromObj.hasOwnProperty(prop)){
                toObj[prop] = fromObj[prop];
            }
        }
        
        return toObj;
    },
    trimStr : function(str){
        str = str || '';
        return String.prototype.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
};
