'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;

var ModelObject = require('../../src/models/ModelObject');
var GitIssueComment = require('../../src/models/GitIssueComment');

describe('GitIssueComment Tests', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    it('Should return valid GitIssueComment object', function(done) {

        var mockJSON = {
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
        };

        var comment = ModelObject.getModelOfClassFromJSON(GitIssueComment, mockJSON);

        expect(comment).to.be.ok;
        expect(comment.createdAt).to.be.ok;
        expect(comment.id).to.be.ok;
        expect(comment.commentMessage).to.be.ok;
        expect(comment.user).to.be.ok;

        done();
    });
    
    it('Should return valid created time', function(done){
        var mockJSON = {
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
        };

        var comment = ModelObject.getModelOfClassFromJSON(GitIssueComment, mockJSON);

        expect(comment).to.be.ok;
        
        var dateObj = comment.createdAt;
         
        expect(dateObj).to.be.ok;
        expect(dateObj.fromNow()).to.be.ok;

        done();
    });
});
