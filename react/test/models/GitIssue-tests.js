'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;

var ModelObject = require('../../src/models/ModelObject');
var GitIssue = require('../../src/models/GitIssue');

describe('GitIssue Tests', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    it('Should return valid short summary', function(done) {

        var mockJSON = {
            "html_url" : "https://github.com/npm/npm/issues/9351",
            "number" : 9351,
            "title" : "Why don't other encoded chars like %40 work in registry URLs?",
            "created_at" : "2015-08-18T00:04:02Z",
            "user" : {
                "login" : "jameslnewell",
                "avatar_url" : "https://avatars.githubusercontent.com/u/2237996?v=3",
                "html_url" : "https://github.com/jameslnewell",
            },
            "labels" : [{
                name : 'test',
                color : 'fff',
                url : "https://api.github.com/repos/octocat/Hello-World/labels/bug"
            }],
            "state" : "open",
            "body" : "eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n"
        };

        var issue = ModelObject.getModelOfClassFromJSON(GitIssue, mockJSON);

        expect(issue).to.be.ok;
        expect(issue.summary).to.be.ok;
        
        expect(issue.summary).to.equal('eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n');
        
        var shortSummary = issue.getShortSummary();
        expect(shortSummary).to.equal('eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs');
        
        expect(issue.createdAt).to.be.ok;

        done();
    });
    
    it('Should have valid issue user', function(done){
        var mockJSON = {
            "html_url" : "https://github.com/npm/npm/issues/9351",
            "number" : 9351,
            "title" : "Why don't other encoded chars like %40 work in registry URLs?",
            "created_at" : "2015-08-18T00:04:02Z",
            "user" : {
                "login" : "jameslnewell",
                "avatar_url" : "https://avatars.githubusercontent.com/u/2237996?v=3",
                "html_url" : "https://github.com/jameslnewell",
            },
            "labels" : [{
                name : 'test',
                color : 'fff',
                url : "https://api.github.com/repos/octocat/Hello-World/labels/bug"
            }],
            "state" : "open",
            "body" : "eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n"
        };

        var issue = ModelObject.getModelOfClassFromJSON(GitIssue, mockJSON);

        expect(issue).to.be.ok;
        expect(issue.user).to.be.ok;
        expect(issue.user.userName).to.equal('jameslnewell');

        done();
    });
    
    it('Should return valid created time', function(done){
        var mockJSON = {
            "html_url" : "https://github.com/npm/npm/issues/9351",
            "number" : 9351,
            "title" : "Why don't other encoded chars like %40 work in registry URLs?",
            "created_at" : "2015-08-18T00:04:02Z",
            "user" : {
                "login" : "jameslnewell",
                "avatar_url" : "https://avatars.githubusercontent.com/u/2237996?v=3",
                "html_url" : "https://github.com/jameslnewell",
            },
            "labels" : [{
                name : 'test',
                color : 'fff',
                url : "https://api.github.com/repos/octocat/Hello-World/labels/bug"
            }],
            "state" : "open",
            "body" : "eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n"
        };

        var issue = ModelObject.getModelOfClassFromJSON(GitIssue, mockJSON);

        expect(issue).to.be.ok;
        
        var dateObj = issue.createdAt;
         
        expect(dateObj).to.be.ok;
        expect(dateObj.fromNow()).to.be.ok;

        done();
    });
    
    it('Should return valid labels', function(done){
        var mockJSON = {
            "html_url" : "https://github.com/npm/npm/issues/9351",
            "number" : 9351,
            "title" : "Why don't other encoded chars like %40 work in registry URLs?",
            "created_at" : "2015-08-18T00:04:02Z",
            "user" : {
                "login" : "jameslnewell",
                "avatar_url" : "https://avatars.githubusercontent.com/u/2237996?v=3",
                "html_url" : "https://github.com/jameslnewell",
            },
            "labels" : [{
                name : 'test',
                color : 'fff',
                url : "https://api.github.com/repos/octocat/Hello-World/labels/bug"
            }],
            "state" : "open",
            "body" : "eg:\r\n\r\n    http://registry.npmjs.com/%40digitaledgeit%2fpaypal => 404\r\n    http://registry.npmjs.com/@digitaledgeit%2fpaypal => 200\r\n\r\nIs it a bug? The reason I ask: https://github.com/rlidwka/sinopia/pull/280#issuecomment-120665175\r\n"
        };

        var issue = ModelObject.getModelOfClassFromJSON(GitIssue, mockJSON);

        expect(issue).to.be.ok;
        
        expect(issue.labels).to.be.ok;
        expect(issue.labels).to.be.an('array');
        expect(issue.labels.length).to.equal(1);

        done();
    });
});
