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

/**
 * Renders an error message and provides option to render a retry button as well.
 */
var ErrorMsgWithRetry = React.createClass({
    PropTypes : {
        message : React.PropTypes.string,
        showRetryButton : React.PropTypes.bool,
        onRetryClicked : React.PropTypes.func
    },
    getDefaultProps : function(){
        return {
            message : 'Something Went Wrong.',
            showRetryButton : true,
            onRetryClicked : function(){
                // Do Nothing
            }
        };
    },
    render : function(){
        var self = this;
        
        var button = '';
        
        if (self.props.showRetryButton){
            button = <button onClick={function(event){
                self.props.onRetryClicked(event);
            }} className="btn btn-default retry-button" type="button">Retry</button>
        }
        
        return (
            <div className="issues-message">
                <h4>{self.props.message}</h4>
                {button}
                <br/>
            </div>
        );
    }
});

module.exports = ErrorMsgWithRetry;
