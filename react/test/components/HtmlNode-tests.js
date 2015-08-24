'use strict';

// Lib Imports
var assert = require('chai').assert,
    expect = require('chai').expect,
    jsdom = require('jsdom'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    rewire = require('rewire');

describe('HtmlNode Tests', function() {
    
    var HtmlNode;
    var React, TestUtils;
    
    beforeEach(function(done) {
        this.timeout(15000);
        
        mockery.enable({
            warnOnReplace : false,
            warnOnUnregistered : false,
            useCleanCache : true
        });

        global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
        global.window = global.document.parentWindow;
        global.navigator = {
            userAgent: 'node.js'
        };
        
        require('react/lib/ExecutionEnvironment').canUseDOM = true;
        
        React = require('react/addons');
        TestUtils = require('react/lib/ReactTestUtils');
        
        HtmlNode = require('../../src/components/HtmlNode');
        
        done();
    });

    afterEach(function(done) {
        delete global.window;
        delete global.document;
        delete global.navigator;
        mockery.disable();

        done();
    });
    
    it('Should render just fine', function() {
        
        var mockHTML = 'MOCK TEXT';
        
        var testComponent = TestUtils.renderIntoDocument(
            <HtmlNode html={mockHTML}/>
        );
        
        var div = TestUtils.findRenderedDOMComponentWithTag(
            testComponent,
            'div'
        );
        
        div = div.getDOMNode();

        expect(div).to.be.ok;
        expect(div.childNodes[0].innerHTML).to.equal('MOCK TEXT');
    });
});
