'use strict';

// Lib Imports
var assert = require('chai').assert,
    expect = require('chai').expect,
    jsdom = require('jsdom'),
    sinon = require('sinon'),
    mockery = require('mockery'),
    rewire = require('rewire');
    
var ModelObject = require('../../src/models/ModelObject');
var GitIssueComment = require('../../src/models/GitIssueComment');

var MOCK_COMMENTS_1 = [{
    "url" : "https://api.github.com/repos/npm/npm/issues/comments/131999156",
    "html_url" : "https://github.com/npm/npm/issues/9306#issuecomment-131999156",
    "issue_url" : "https://api.github.com/repos/npm/npm/issues/9306",
    "id" : 131999156,
    "user" : {
        "login" : "KenanY",
        "id" : 733364,
        "avatar_url" : "https://avatars.githubusercontent.com/u/733364?v=3",
        "gravatar_id" : "",
        "url" : "https://api.github.com/users/KenanY",
        "html_url" : "https://github.com/KenanY",
        "followers_url" : "https://api.github.com/users/KenanY/followers",
        "following_url" : "https://api.github.com/users/KenanY/following{/other_user}",
        "gists_url" : "https://api.github.com/users/KenanY/gists{/gist_id}",
        "starred_url" : "https://api.github.com/users/KenanY/starred{/owner}{/repo}",
        "subscriptions_url" : "https://api.github.com/users/KenanY/subscriptions",
        "organizations_url" : "https://api.github.com/users/KenanY/orgs",
        "repos_url" : "https://api.github.com/users/KenanY/repos",
        "events_url" : "https://api.github.com/users/KenanY/events{/privacy}",
        "received_events_url" : "https://api.github.com/users/KenanY/received_events",
        "type" : "User",
        "site_admin" : false
    },
    "created_at" : "2015-08-18T00:04:02Z",
    "updated_at" : "2015-08-18T00:04:02Z",
    "body" : "@jacka92 I believe your best first step would be to [upgrade `npm`](https://github.com/npm/npm/wiki/Troubleshooting#try-the-latest-stable-version-of-npm), since `npm@1.3` support ended months ago."
}];

describe('IssueComment Tests', function() {
    var sandbox, fetchCommentsWithCommentsURLStub;
    var IssueComments;
    var React, TestUtils;
    
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
        
        fetchCommentsWithCommentsURLStub = sandbox.stub();
        
        mockery.registerMock('../API', {
            fetchCommentsWithCommentsURL : fetchCommentsWithCommentsURLStub
        });
        
        IssueComments = require('../../src/components/IssueComments');
        
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
    
    it('Should render one comment', function() {
        
        var mockedCommentsURL = "someurl";
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    commentsURL : mockedCommentsURL
                };
            },
            render : function(){
                return <IssueComments commentsURL={this.state.commentsURL} />
            }
        });
        
        var mockComments = MOCK_COMMENTS_1.map(function(commentsJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssueComment, commentsJSON);
        });
        
        fetchCommentsWithCommentsURLStub.onCall(0).callsArgWith(1, mockComments, null);
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ commentsURL : mockedCommentsURL });
        
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(
            testComponent,
            'issue-comments-row'
        );

        expect(rows).to.be.ok;
        expect(rows.length).to.equal(1);
    });
    
    it('Should render loading div', function() {
        
        var mockedCommentsURL = "someurl";
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    commentsURL : mockedCommentsURL
                };
            },
            render : function(){
                return <IssueComments commentsURL={this.state.commentsURL} />
            }
        });
        
        var mockComments = MOCK_COMMENTS_1.map(function(commentsJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssueComment, commentsJSON);
        });
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent/>
        );
        
        var loadingDiv = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'local-loading-div'
        );

        loadingDiv = loadingDiv.getDOMNode();
        
        expect(loadingDiv).to.be.ok;
        expect(loadingDiv.childNodes.length).to.equal(1);
    });
    
    it('Should render no comments with error', function() {
        
        var mockedCommentsURL = "someurl";
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    commentsURL : mockedCommentsURL
                };
            },
            render : function(){
                return <IssueComments commentsURL={this.state.commentsURL} />
            }
        });
        
        fetchCommentsWithCommentsURLStub.onCall(0).callsArgWith(1, null, new Error('Cannot Fetch Comments'));
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ commentsURL : mockedCommentsURL });
        
        var errMsgDiv = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'issues-message'
        );
        
        errMsgDiv = errMsgDiv.getDOMNode();

        expect(errMsgDiv).to.be.ok;
        expect(errMsgDiv.childNodes[0].innerHTML).to.equal('Cannot Fetch Comments');
    });
});
