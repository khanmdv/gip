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
var Pagination = require('react-bootstrap').Pagination;

/**
 * Pagination Component.
 */
var Paginator = React.createClass({
    /**
     * Properties
     * 
     * {items} number of items.
     * {maxButtons} Maximum number of buttons on screen.
     * {activePage} Current page.
     * {onPageSelected} Handler invoked when a page is selected.
     * 
     */
    PropTypes : {
        items : React.PropTypes.number,
        maxButtons : React.PropTypes.number,
        activePage : React.PropTypes.number,
        onPageSelected : React.PropTypes.func
    },
    getInitialState : function(){
        return {
            activePage: 1
        };
    },
    getDefaultProps : function(){
        return {
            items : 30,
            maxButtons : 5,
            activePage : 1,
            onPageSelected : function(){}
        };
    },
    
    /**
     * Event Handler
     */
    handleSelect : function(event, selectedEvent) {
        if (this.props.onPageSelected){
            this.props.onPageSelected(selectedEvent.eventKey);
        }
        
        this.setState({
            activePage: selectedEvent.eventKey
        });
    },
    render : function() {
        return (
            <Pagination
                prev={true}
                next={true}
                first={true}
                last={true}
                ellipsis={true}
                items={this.props.items}
                maxButtons={this.props.maxButtons}
                activePage={this.props.activePage}
                onSelect={this.handleSelect} />
        );
    }
});

module.exports = Paginator;
