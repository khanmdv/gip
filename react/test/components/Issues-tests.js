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

var MOCK_ISSUES_1 = [{
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
  },
  {
    "url": "https://api.github.com/repos/npm/npm/issues/9361",
    "labels_url": "https://api.github.com/repos/npm/npm/issues/9361/labels{/name}",
    "comments_url": "https://api.github.com/repos/npm/npm/issues/9361/comments",
    "events_url": "https://api.github.com/repos/npm/npm/issues/9361/events",
    "html_url": "https://github.com/npm/npm/issues/9361",
    "id": 102311605,
    "number": 9361,
    "title": "npm error",
    "user": {
      "login": "sonill",
      "id": 421800,
      "avatar_url": "https://avatars.githubusercontent.com/u/421800?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sonill",
      "html_url": "https://github.com/sonill",
      "followers_url": "https://api.github.com/users/sonill/followers",
      "following_url": "https://api.github.com/users/sonill/following{/other_user}",
      "gists_url": "https://api.github.com/users/sonill/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sonill/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sonill/subscriptions",
      "organizations_url": "https://api.github.com/users/sonill/orgs",
      "repos_url": "https://api.github.com/users/sonill/repos",
      "events_url": "https://api.github.com/users/sonill/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sonill/received_events",
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
    "created_at": "2015-08-21T06:44:04Z",
    "updated_at": "2015-08-21T06:44:04Z",
    "closed_at": null,
    "body": "I am trying to install steroids using npm but following error occurs:\r\n\r\n```\r\nC:\\Users\\Sanil Shakya>npm install steroids -g\r\n-\r\n> steroids@4.1.15 preinstall C:\\Users\\Sanil Shakya\\AppData\\Roaming\\npm\\node_modules\\steroids\r\n> node ./bin/preinstall.js || nodejs ./bin/preinstall.js\r\n\r\n\r\nAppGyver Steroids² 4.1.15 installation\r\n\r\nIf you have any problems, please visit our forums at http://community.appgyver.com\r\nWe are now trying to detect required dependencies and problems.\r\nSome dependencies (like dtrace-provider) will print ugly warnings to the screen, but everything should be fine.\r\n\r\n  - The AppGyver team\r\n\r\nStarting installation in ...\r\n3\r\n2\r\n1\r\nLift-off!\r\n\r\n\r\nChecking for required components ...\r\n\r\n  Found git, good.\r\n\r\nDependencies looks good! Starting Steroids installation...\r\n\r\nnpm ERR! tar.unpack untar error C:\\Users\\SANILS~1\\AppData\\Local\\Temp\\npm-8820-1c1043b8\\steroids-assets.appgyver.com\\steroids-android-packages-0.0.10.tgz\r\nnpm ERR! Windows_NT 6.3.9600\r\nnpm ERR! argv \"C:\\\\Program Files\\\\nodejs\\\\\\\\node.exe\" \"C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js\" \"install\" \"steroids\" \"-g\"\r\nnpm ERR! node v0.12.7\r\nnpm ERR! npm  v2.11.3\r\n\r\nnpm ERR! unexpected eof\r\nnpm ERR!\r\nnpm ERR! If you need help, you may report this error at:\r\nnpm ERR!     <https://github.com/npm/npm/issues>\r\n\r\n```\r\nAny help please"
  }];
  
  var MOCK_ISSUES_2 = [{
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
  },
  {
    "url": "https://api.github.com/repos/npm/npm/issues/9361",
    "labels_url": "https://api.github.com/repos/npm/npm/issues/9361/labels{/name}",
    "comments_url": "https://api.github.com/repos/npm/npm/issues/9361/comments",
    "events_url": "https://api.github.com/repos/npm/npm/issues/9361/events",
    "html_url": "https://github.com/npm/npm/issues/9361",
    "id": 102311605,
    "number": 9361,
    "title": "npm error",
    "user": {
      "login": "sonill",
      "id": 421800,
      "avatar_url": "https://avatars.githubusercontent.com/u/421800?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sonill",
      "html_url": "https://github.com/sonill",
      "followers_url": "https://api.github.com/users/sonill/followers",
      "following_url": "https://api.github.com/users/sonill/following{/other_user}",
      "gists_url": "https://api.github.com/users/sonill/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sonill/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sonill/subscriptions",
      "organizations_url": "https://api.github.com/users/sonill/orgs",
      "repos_url": "https://api.github.com/users/sonill/repos",
      "events_url": "https://api.github.com/users/sonill/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sonill/received_events",
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
    "created_at": "2015-08-21T06:44:04Z",
    "updated_at": "2015-08-21T06:44:04Z",
    "closed_at": null,
    "body": "I am trying to install steroids using npm but following error occurs:\r\n\r\n```\r\nC:\\Users\\Sanil Shakya>npm install steroids -g\r\n-\r\n> steroids@4.1.15 preinstall C:\\Users\\Sanil Shakya\\AppData\\Roaming\\npm\\node_modules\\steroids\r\n> node ./bin/preinstall.js || nodejs ./bin/preinstall.js\r\n\r\n\r\nAppGyver Steroids² 4.1.15 installation\r\n\r\nIf you have any problems, please visit our forums at http://community.appgyver.com\r\nWe are now trying to detect required dependencies and problems.\r\nSome dependencies (like dtrace-provider) will print ugly warnings to the screen, but everything should be fine.\r\n\r\n  - The AppGyver team\r\n\r\nStarting installation in ...\r\n3\r\n2\r\n1\r\nLift-off!\r\n\r\n\r\nChecking for required components ...\r\n\r\n  Found git, good.\r\n\r\nDependencies looks good! Starting Steroids installation...\r\n\r\nnpm ERR! tar.unpack untar error C:\\Users\\SANILS~1\\AppData\\Local\\Temp\\npm-8820-1c1043b8\\steroids-assets.appgyver.com\\steroids-android-packages-0.0.10.tgz\r\nnpm ERR! Windows_NT 6.3.9600\r\nnpm ERR! argv \"C:\\\\Program Files\\\\nodejs\\\\\\\\node.exe\" \"C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js\" \"install\" \"steroids\" \"-g\"\r\nnpm ERR! node v0.12.7\r\nnpm ERR! npm  v2.11.3\r\n\r\nnpm ERR! unexpected eof\r\nnpm ERR!\r\nnpm ERR! If you need help, you may report this error at:\r\nnpm ERR!     <https://github.com/npm/npm/issues>\r\n\r\n```\r\nAny help please"
  },
  {
    "url": "https://api.github.com/repos/npm/npm/issues/9361",
    "labels_url": "https://api.github.com/repos/npm/npm/issues/9361/labels{/name}",
    "comments_url": "https://api.github.com/repos/npm/npm/issues/9361/comments",
    "events_url": "https://api.github.com/repos/npm/npm/issues/9361/events",
    "html_url": "https://github.com/npm/npm/issues/9361",
    "id": 102311605,
    "number": 9364,
    "title": "npm error",
    "user": {
      "login": "sonill",
      "id": 421800,
      "avatar_url": "https://avatars.githubusercontent.com/u/421800?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sonill",
      "html_url": "https://github.com/sonill",
      "followers_url": "https://api.github.com/users/sonill/followers",
      "following_url": "https://api.github.com/users/sonill/following{/other_user}",
      "gists_url": "https://api.github.com/users/sonill/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sonill/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sonill/subscriptions",
      "organizations_url": "https://api.github.com/users/sonill/orgs",
      "repos_url": "https://api.github.com/users/sonill/repos",
      "events_url": "https://api.github.com/users/sonill/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sonill/received_events",
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
    "created_at": "2015-08-21T06:44:04Z",
    "updated_at": "2015-08-21T06:44:04Z",
    "closed_at": null,
    "body": "I am trying to install steroids using npm but following error occurs:\r\n\r\n```\r\nC:\\Users\\Sanil Shakya>npm install steroids -g\r\n-\r\n> steroids@4.1.15 preinstall C:\\Users\\Sanil Shakya\\AppData\\Roaming\\npm\\node_modules\\steroids\r\n> node ./bin/preinstall.js || nodejs ./bin/preinstall.js\r\n\r\n\r\nAppGyver Steroids² 4.1.15 installation\r\n\r\nIf you have any problems, please visit our forums at http://community.appgyver.com\r\nWe are now trying to detect required dependencies and problems.\r\nSome dependencies (like dtrace-provider) will print ugly warnings to the screen, but everything should be fine.\r\n\r\n  - The AppGyver team\r\n\r\nStarting installation in ...\r\n3\r\n2\r\n1\r\nLift-off!\r\n\r\n\r\nChecking for required components ...\r\n\r\n  Found git, good.\r\n\r\nDependencies looks good! Starting Steroids installation...\r\n\r\nnpm ERR! tar.unpack untar error C:\\Users\\SANILS~1\\AppData\\Local\\Temp\\npm-8820-1c1043b8\\steroids-assets.appgyver.com\\steroids-android-packages-0.0.10.tgz\r\nnpm ERR! Windows_NT 6.3.9600\r\nnpm ERR! argv \"C:\\\\Program Files\\\\nodejs\\\\\\\\node.exe\" \"C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js\" \"install\" \"steroids\" \"-g\"\r\nnpm ERR! node v0.12.7\r\nnpm ERR! npm  v2.11.3\r\n\r\nnpm ERR! unexpected eof\r\nnpm ERR!\r\nnpm ERR! If you need help, you may report this error at:\r\nnpm ERR!     <https://github.com/npm/npm/issues>\r\n\r\n```\r\nAny help please"
  }];

describe('Issues Tests', function() {
    var sandbox, fetchIssuesStub, stubContext;
    var React, TestUtils;
    var Router;
    var activePage = 1;
    
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
        
        global.addEventListener = function(){};
        global.removeEventListener = function(){};
        
        require('react/lib/ExecutionEnvironment').canUseDOM = true;
        
        React = require('react/addons');
        TestUtils = require('react/lib/ReactTestUtils');
        
        fetchIssuesStub = sandbox.stub();
        
        mockery.registerMock('../API', {
            getIssuesForPage : fetchIssuesStub
        });
        
        
        Router = function(){
        };
        
        Router.getCurrentQuery = function(){
                return {
                    page : activePage
                };
        };
        
        Router.getCurrentPath = function(){
            return 'issues';
        };
        
        Router.makeHref = function(){
            return '';
        };
        
        Router.isActive = function(){};
        
        Router.HashLocation = [];
        
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
    
    it('Should render two issues', function() {
        
        stubContext = require('react-stub-context');
        var Issues = require('../../src/components/Issues');
        Issues = stubContext(Issues, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <Issues/>
            }
        });
        
        var mockIssues = MOCK_ISSUES_1.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        fetchIssuesStub.onCall(0).callsArgWith(1, mockIssues, null);
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ "something" : "haha" });
        
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(
            testComponent,
            'issue-table-rows'
        );

        expect(rows).to.be.ok;
        expect(rows.length).to.equal(2);
    });
    
    it('Should render on retry', function() {
        
        stubContext = require('react-stub-context');
        var Issues = require('../../src/components/Issues');
        Issues = stubContext(Issues, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <Issues/>
            }
        });
        
        var mockIssues = MOCK_ISSUES_1.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        fetchIssuesStub.onCall(1).callsArgWith(1, [], null);
        fetchIssuesStub.onCall(2).callsArgWith(1, mockIssues, null);
        
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
        
        var retryBtn = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'retry-button'
        );
        
        retryBtn = retryBtn.getDOMNode();
        
        expect(retryBtn).to.be.ok;
        
        TestUtils.Simulate.click(retryBtn);
        
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(
            testComponent,
            'issue-table-rows'
        );

        expect(rows).to.be.ok;
        expect(rows.length).to.equal(2);
    });
    
    it('Should render page 2', function() {
        
        stubContext = require('react-stub-context');
        var Issues = require('../../src/components/Issues');
        Issues = stubContext(Issues, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <Issues/>
            }
        });
        
        var mockIssues1 = MOCK_ISSUES_1.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        var mockIssues2 = MOCK_ISSUES_2.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        fetchIssuesStub.onCall(1).callsArgWith(1, mockIssues1, null);
        fetchIssuesStub.onCall(2).callsArgWith(1, mockIssues2, null);
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ "something" : "haha" });
        
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(
            testComponent,
            'issue-table-rows'
        );

        expect(rows).to.be.ok;
        expect(rows.length).to.equal(2);
        
        var ul = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'pagination'
        );
        
        ul = ul.getDOMNode();
        
        // index # 3 is page 2
        var link = ul.childNodes[3].childNodes[0];
        
        TestUtils.Simulate.click(link);
        expect(global.window.location.hash).to.equal('#?page=2');
    });
    
    it('Should render loading div', function() {
        
        stubContext = require('react-stub-context');
        var Issues = require('../../src/components/Issues');
        Issues = stubContext(Issues, { router: Router });
        
        var mockIssues = MOCK_ISSUES_1.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <Issues/>
            }
        });
        
        //fetchIssuesStub.onCall(0).callsArgWith(1, mockIssues, null);
        
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
    
    it('Should render no issues with error', function() {
        
        stubContext = require('react-stub-context');
        var Issues = require('../../src/components/Issues');
        Issues = stubContext(Issues, { router: Router });
        
        var TestComponent = React.createClass({
            getInitialState : function(){
                return {
                    something : "something"
                };
            },
            render : function(){
                return <Issues/>
            }
        });
        
        var mockIssues = MOCK_ISSUES_1.map(function(issueJSON){
            return ModelObject.getModelOfClassFromJSON(GitIssue, issueJSON);
        });
        
        fetchIssuesStub.onCall(1).callsArgWith(1, null, new Error('Cannot fetch issues'));
        
        var testComponent = TestUtils.renderIntoDocument(
            <TestComponent />
        );
        
        testComponent.setState({ something : "hehe" });
        
        var errMsgDiv = TestUtils.findRenderedDOMComponentWithClass(
            testComponent,
            'issues-message'
        );
        
        errMsgDiv = errMsgDiv.getDOMNode();

        expect(errMsgDiv).to.be.ok;
        expect(errMsgDiv.childNodes[0].innerHTML).to.equal('Cannot fetch issues');
    });
});
