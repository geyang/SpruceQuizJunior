/**
 * @fileOverview Integrated Server test
 * @module Test
 * @type {exports}
 */
require('amdefine/intercept');

var _ = require('underscore'),
    app = require('../../app.js'),
    data = require('./test.data.js'),
    sessionData = require('./session.data.js'),
    express = require('express'),
    request = require('supertest'),
    superagent = require('superagent'),
    expect = require('expect.js'),
    should = require('should'),
    passportStub = require('../../lib/passport-stub.js'),//the modified version of passport-stub, for the newer interface.
    userRoles = require('../../../client/js/rolesHelper.js').userRoles,
    accessLevels = require('../../../client/js/rolesHelper.js').accessLevels;

app.use(express.bodyParser());
passportStub.install(app);

var studentUser = data.studentUser,
    parentUser = data.parentUser,
    teacherUser = data.teacherUser,
    adminUser = data.adminUser,
    superadminUser = data.superadminUser;

describe('AnswerComment API test - ', function (done) {
    var question = {};
    var answer = {};
    var answerComment = {};

    beforeEach(function () {
        passportStub.logout(); // logout before each test
    });
    afterEach(function () {
        passportStub.logout(); // logout after each test
    });
    var session1;
    it('add a session', function (done) {
        request(app).post('/api/sessions').send(sessionData.sessions[1]).expect(201).end(function (err, res) {
            session1 = res.body;
            session1.name.should.be.eql(sessionData.sessions[1].name);
            data.questionCreate.sessions = [session1._id];
            done();
        });
    });
    it('create question', function (done) {
        passportStub.login(studentUser); // login as user
        request(app).post('/api/questions').send(data.questionCreate).expect(201).end(function (err, res) {
            question = res.body;
            res.headers.location.split('/').slice(1,3).should.be.eql(['api', 'questions']);
            done();
        });
    });
    it('add answer to question', function (done) {
        var ansText = '我是通过 answerComment 测试模块添加的答案。';
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers')
            .send({text: ansText})
            .expect(201).end(function (err, res){
                res.body.answers.slice(-1)[0].should.containEql({text: ansText});
                question.answers = res.body.answers;
                done();
            });
    });
    it('add comment to an answer in a question', function (done) {
        var commentText = '我是通过 answerComment 测试模块添加的，答案下面的评论。';
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments')
            .send({text: commentText})
            .expect(201).end(function (err, res){
                res.body.answerComments[0].should.containEql({text: commentText});
                answerComment = res.body.answerComments[0];
                question.answerComments = res.body.answerComments;
                done();
             });
    });
    it('update answer comment in a question', function (done) {
        var comment = '这是更新后的评论，请查收';
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id)
            .send({text: comment})
            .expect(201).end(function (err, res){
                res.body.answerComments[0].text.should.eql(comment);
                done();
            });
    });
    it('upvote answer comment', function (done) {
        var query = {
            voteup: 'true'
        };
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id + '/votes')
            .send(query)
            .expect(201).end(function (err, res){
                res.body.answerComments[0].voteup.should.containEql(studentUser.username);
                res.body.answerComments[0].votedown.should.not.containEql(studentUser.username);
                done();
            });
    });
    it('upvote answer comment again to remove vote', function (done) {
        var query = {
            voteup: 'true'
        };
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id + '/votes')
            .send(query)
            .expect(201).end(function (err, res){
                res.body.answerComments[0].voteup.should.not.containEql(studentUser.username);
                res.body.answerComments[0].votedown.should.not.containEql(studentUser.username);
                done();
            });
    });
    it('downvote answer', function (done) {
        var query = {
            votedown: 'true'
        };
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id + '/votes')
            .send(query)
            .expect(201).end(function (err, res){
                res.body.answerComments[0].votedown.should.containEql(studentUser.username);
                res.body.answerComments[0].voteup.should.not.containEql(studentUser.username);
                done();
            });
    });
    it('downvote answer again to remove downvote', function (done) {
        var query = {
            votedown: 'true'
        };
        passportStub.login(studentUser);
        request(app).post('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id + '/votes')
            .send(query)
            .expect(201).end(function (err, res){
                res.body.answerComments[0].votedown.should.not.containEql(studentUser.username);
                res.body.answerComments[0].voteup.should.not.containEql(studentUser.username);
                done();
            });
    });
    it('delete answer comment with Id', function (done) {
        var newLength = _.size(question.answerComments) - 1;
        if (newLength == 0) {newLength = 0; };
        passportStub.login(studentUser);
        request(app).del('/api/questions/' + question._id + '/answers/' + question.answers[0].id + '/comments/' + answerComment.id)
            .expect(201).end(function (err, res){
                _.size(res.body.answerComments).should.eql(newLength);
                done();
            });
    });

});
