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

var React = require('react');

/**
 * Renders a now loading div.
 */
module.exports = React.createClass({
    /**
     * {fullScreen} indicates whether the loading div should cover the entire screen.
     */
    PropTypes : {
        fullScreen : React.PropTypes.bool
    },
    
    getDefaultProps : function(){
        return {
            fullScreen : true    
        };
    },
    
    render : function(){
        var cssClass = this.props.fullScreen ? 'loading-div' : 'local-loading-div';
        return (
            <div className={cssClass}>&nbsp;</div>
        );
    }
});


