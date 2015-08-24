'use strict';

// Lib Imports
var assert = require('chai').assert,
    expect = require('chai').expect,
    jsdom = require('jsdom'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    rewire = require('rewire');
    
var ModelObject = require('../../src/models/ModelObject');
var GitIssue = require('../../src/models/GitIssue');

var MOCK_ISSUE_1 = {
    "url": "https://api.github.com/repos/npm/npm/issues/9362",
    "labels_url": "https://api.github.com/repos/npm/npm/issues/9362/labels{/name}",
    "comments_url": "https://api.github.com/repos/npm/npm/issues/9362/comments",
    "events_url": "https://api.github.com/repos/npm/npm/issues/9362/events",
    "html_url": "https://github.com/npm/npm/issues/9362",
    "id": 102314568,
    "number": 9362,
    "title": "error : npm install gulp ",
    "user": {
      "login": "fuyc3",
      "id": 12891820,
      "avatar_url": "https://avatars.githubusercontent.com/u/12891820?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/fuyc3",
      "html_url": "https://github.com/fuyc3",
      "followers_url": "https://api.github.com/users/fuyc3/followers",
      "following_url": "https://api.github.com/users/fuyc3/following{/other_user}",
      "gists_url": "https://api.github.com/users/fuyc3/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/fuyc3/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/fuyc3/subscriptions",
      "organizations_url": "https://api.github.com/users/fuyc3/orgs",
      "repos_url": "https://api.github.com/users/fuyc3/repos",
      "events_url": "https://api.github.com/users/fuyc3/events{/privacy}",
      "received_events_url": "https://api.github.com/users/fuyc3/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [

    ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "milestone": null,
    "comments": 0,
    "created_at": "2015-08-21T07:06:58Z",
    "updated_at": "2015-08-21T07:06:58Z",
    "closed_at": null,
    "body": "E:\\hongbao>npm install -g gulp\r\nnpm ERR! Windows_NT 6.1.7601\r\nnpm ERR! argv \"D:\\\\nodejs\\\\\\\\node.exe\" \"D:\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-\r\ncli.js\" \"install\" \"-g\" \"gulp\"\r\nnpm ERR! node v0.12.7\r\nnpm ERR! npm  v2.11.3\r\nnpm ERR! code EAI_AGAIN\r\nnpm ERR! errno EAI_AGAIN\r\nnpm ERR! syscall getaddrinfo\r\n\r\nnpm ERR! getaddrinfo EAI_AGAIN\r\nnpm ERR!\r\nnpm ERR! If you need help, you may report this error at:\r\nnpm ERR!     <https://github.com/npm/npm/issues>\r\n\r\nnpm ERR! Please include the following file with any support request:\r\nnpm ERR!     E:\\hongbao\\npm-debug.log\r\n\r\n\r\n\r\n\r\nwhy ?  who can tell me ."
};

describe('IssueDetail Tests', function() {
    var sandbox, fetchIssueStub, stubContext;
    var React, TestUtils;
    var Router;
    
    beforeEach(function(done) {
        mockery.enable({
            warnOnReplace : false,
            warnOnUnregistered : false,
            useCleanCache : true
        });

        this.timeout(15000);
        sandbox = sinon.sandbox.create();

        global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
        global.window = global.document.parentWindow;
        global.navigator = {
            userAgent: 'node.js'
        };
        
        require('react/lib/ExecutionEnvironment').canUseDOM = true;
        
        React = require('react/addons');
        TestUtils = require('react/lib/ReactTestUtils');
        
        fetchIssueStub = sandbox.stub();
        
        mockery.registerMock('../API', {
            getIssueWithNumber : fetchIssueStub
        });
        
        
        Router = function(){
        };
        
        Router.getCurrentParams = function(){
                return {
                    issueId : 1
                };
        };
        
        Router.makeHref = function(){
            return '';
        };
        
        Router.isActive = function(){};
        
        done();
    });

    afterEach(function(done) {
        delete global.window;
        delete global.document;
        delete global.navigator;
        sandbox.restore();
        
        mockery.disable();

        done();
    });
    
    it('Should render issue', function() {
        
        stubContext = require('react-stub-context');
        var IssueDetail = rewire('../../src/components/IssueDetail');
        IssueDetail.__set__('IssueComments', React.createClass({
            render : function(){
                return <div></div>
            }
        }));
        
        IssueDetail = stubContext(IssueDetail, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <IssueDetail />
            }
        });
        
        var mockIssue = ModelObject.getModelOfClassFromJSON(GitIssue, MOCK_ISSUE_1); 
        
        fetchIssueStub.onCall(0).callsArgWith(1, mockIssue, null);
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ "something" : "haha" });
        
        var h3 = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'issue-title'
        );

        h3 = h3.getDOMNode();

        expect(h3).to.be.ok;
        expect(h3.childNodes[0].innerHTML).to.equal(MOCK_ISSUE_1.title);
    });
    
    it('Should render loading div', function() {
        
        stubContext = require('react-stub-context');
        var IssueDetail = rewire('../../src/components/IssueDetail');
        
        IssueDetail.__set__('IssueComments', React.createClass({
            render : function(){
                return <div></div>
            }
        }));
        
        IssueDetail = stubContext(IssueDetail, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <IssueDetail/>
            }
        });
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent/>
        );
        
        var loadingDiv = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'loading-div'
        );

        loadingDiv = loadingDiv.getDOMNode();
        
        expect(loadingDiv).to.be.ok;
        expect(loadingDiv.childNodes.length).to.equal(1);
    });
    
    it('Should render no issue with error', function() {
        
        stubContext = require('react-stub-context');
        var IssueDetail = rewire('../../src/components/IssueDetail');
        
        IssueDetail.__set__('IssueComments', React.createClass({
            render : function(){
                return <div></div>;
            }
        }));
        
        IssueDetail = stubContext(IssueDetail, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <IssueDetail />
            }
        });
        
        var mockIssue = ModelObject.getModelOfClassFromJSON(GitIssue, MOCK_ISSUE_1); 
        
        fetchIssueStub.onCall(0).callsArgWith(1, null, new Error('Cannot fetch issue'));
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ "something" : "haha" });
        
        var errMsgDiv = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'issues-message'
        );

        errMsgDiv = errMsgDiv.getDOMNode();

        expect(errMsgDiv).to.be.ok;
        expect(errMsgDiv.childNodes[0].innerHTML).to.equal('Cannot fetch issue');
    });
});
