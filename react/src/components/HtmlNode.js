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
var marked = require('marked');

/**
 * Renders a HTML Node from a string. Uses GitHub markdown to convert markdown
 * to HTML.
 * 
 */
var HtmlNode = React.createClass({
    /** 
     * Properties
     * 
     * {html} HTML Code as string.
     */
    PropTypes : {
        html : React.PropTypes.string
    },
    
    /**
     * Renders marked down content.
     */
    render : function(){
        var self = this;
        var html = this.props.html;
        
        return (
            <div className="html-node" dangerouslySetInnerHTML={{
                __html : marked(new String(html), {
                            renderer: new marked.Renderer(),
                            gfm: true,
                            tables: true,
                            breaks: true,
                            pedantic: false,
                            sanitize: true,
                            smartLists: true,
                            smartypants: false
                        })
            }} />
        );
    }
});

module.exports = HtmlNode;
