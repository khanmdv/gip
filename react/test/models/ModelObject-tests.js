'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;

var ModelObject = require('../../src/models/ModelObject');
var GitIssue = require('../../src/models/GitIssue');

describe('ModelObject.getModelOfClassFromJSON Tests', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    it('Should throw error when no class is passed', function(done) {

        assert.throws(function() {

            ModelObject.getModelOfClassFromJSON();
        }, 'Class cannot be undefined or null.');

        done();
    });

    it('Should throw error when class does not implement JSONKeyValueMap interface', function(done) {

        var mockJSON = {
            "key" : "value"
        };

        assert.throws(function() {

            ModelObject.getModelOfClassFromJSON(Object, mockJSON);
        }, 'Class must implement "JSONKeyValueMap" interface.');

        done();
    });

    it('Should return empty model object', function(done) {
        function MockObject() {
            this.mockProperty = 'SomeValue';
        };

        var modelObj = ModelObject.getModelOfClassFromJSON(MockObject);

        expect(modelObj).to.be.ok;
        expect(modelObj.mockProperty).to.equal('SomeValue');

        done();
    });
    
    it('Should return empty model object when JSONKeyValueMap is empty', function(done) {
        function MockObject() {
            this.mockProperty = 'SomeValue';
        };
        
        MockObject.JSONKeyValueMap = function(){
            return {};
        };

        var modelObj = ModelObject.getModelOfClassFromJSON(MockObject);

        expect(modelObj).to.be.ok;
        expect(modelObj.mockProperty).to.equal('SomeValue');

        done();
    });

    it('Should return filled GitIssue object', function(done) {

        var mockJSON = {
            "url" : "https://api.github.com/repos/npm/npm/issues/9351",
            "labels_url" : "https://api.github.com/repos/npm/npm/issues/9351/labels{/name}",
            "comments_url" : "https://api.github.com/repos/npm/npm/issues/9351/comments",
            "events_url" : "https://api.github.com/repos/npm/npm/issues/9351/events",
            "html_url" : "https://github.com/npm/npm/issues/9351",
            "id" : 102039150,
            "number" : 9351,
            "title" : "Why don't other encoded chars like %40 work in registry URLs?",
            "user" : {
                "login" : "jameslnewell",
                "id" : 2237996,
                "avatar_url" : "https://avatars.githubusercontent.com/u/2237996?v=3",
                "gravatar_id" : "",
                "url" : "https://api.github.com/users/jameslnewell",
                "html_url" : "https://github.com/jameslnewell",
                "followers_url" : "https://api.github.com/users/jameslnewell/followers",
                "following_url" : "https://api.github.com/users/jameslnewell/following{/other_user}",
                "gists_url" : "https://api.github.com/users/jameslnewell/gists{/gist_id}",
                "starred_url" : "https://api.github.com/users/jameslnewell/starred{/owner}{/repo}",
                "subscriptions_url" : "https://api.github.com/users/jameslnewell/subscriptions",
                "organizations_url" : "https://api.github.com/users/jameslnewell/orgs",
                "repos_url" : "https://api.github.com/users/jameslnewell/repos",
                "events_url" : "https://api.github.com/users/jameslnewell/events{/privacy}",
                "received_events_url" : "https://api.github.com/users/jameslnewell/received_events",
                "type" : "User",
                "site_admin" : false
            },
            "labels" : [],
            "state" : "open",
            "locked" : false,
            "assignee" : null,
            "milestone" : null,
            "comments" : 0,
            "created_at" : "2015-08-20T01:54:58Z",
            "updated_at" : "2015-08-20T01:59:28Z",
            "closed_at" : null,
            "body" : "eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n"
        };

        var issue = ModelObject.getModelOfClassFromJSON(GitIssue, mockJSON);

        expect(issue).to.be.ok;
        expect(issue.title).to.be.ok;
        expect(issue.summary).to.be.ok;
        expect(issue.number).to.be.ok;
        expect(issue.user).to.be.ok;
        expect(issue.labels).to.be.ok;
        
        expect(issue.title).to.equal('Why don\'t other encoded chars like %40 work in registry URLs?');
        expect(issue.number).to.equal(9351);
        expect(issue.summary).to.equal('eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n');
        expect(issue.labels).to.be.an('array');
        expect(issue.labels.length).to.equal(0);
        expect(issue.user.gravatarURL).to.equal('https://avatars.githubusercontent.com/u/2237996?v=3');
        expect(issue.user.profileURL).to.equal('https://github.com/jameslnewell');
        expect(issue.user.userName).to.equal('jameslnewell');

        done();
    });

});
