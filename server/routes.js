/**
 * @fileOverview Server routing configurations
 * @author Ge Yang
 * @type {_|exports}
 * @private
 */

define(['underscore', 'path', 'passport', './rolesHelper', './controllers/auth',
    './controllers/user', './controllers/userFeed',
        './controllers/student',
        './controllers/question', './controllers/answer', './controllers/comment', './controllers/answerComment', './controllers/book', './controllers/school', './controllers/session', './controllers/sessionFeed', './mailer/mailerCtrl', './spider/spiderCtrl'],
    function (_, path, passport, rolesHelper, AuthCtrl, UserCtrl, UserFeedCtrl, StudentCtrl, QuestionCtrl, AnswerCtrl, CommentCtrl, AnswerCommentCtrl, BookCtrl, SchoolCtrl, SessionCtrl, SessionFeedCtrl, MailerCtrl, SpiderCtrl) {
        "use strict";
        var accessLevels = rolesHelper.accessLevels;
        var userRoles = rolesHelper.userRoles;

        function ensureAuthorized(req, res, next) {
            var role;
            if(!req.user) role = userRoles.public;
            else          role = req.user.role;
            var accessLevel = _
                .findWhere( routes,
                            {   path: req.route.path,
                                httpMethod: req.method.toUpperCase() })
                .accessLevel || accessLevels.all;
            if (!(accessLevel.bitMask & role.bitMask)) return res.send(401);
            return next();
        }

        var routes = [
            {
                path: '/partials/*',
                httpMethod: 'GET',
                middleware: [function (req, res) {
                    var url = /^.*(?=\.html\s*$)/g.exec(req.url) || [req.url];
                    var requestedView = path.join('./', url[0]);
                    res.render(requestedView);
                }],
                accessLevel: accessLevels.all
            },
            {
                path: '/widgets/*',
                httpMethod: 'GET',
                middleware: [function (req, res) {
                    var url = /^.*(?=\.html\s*$)/g.exec(req.url) || [req.url];
                    var requestedView = path.join('./', url[0]);
                    res.render(requestedView);
                }],
                accessLevel: accessLevels.all
            },
            {   //Need to give more fine-grained control to the client side scripts,
                //so that not all client side scripts are exposed to anonymous users.
                path: '/js/mathJax/*',
                httpMethod: 'GET',
                middleware: [function (req, res) {
                    var requestedView = path.join('./', req.url);
                    res.render(requestedView);
                }],
                accessLevel: accessLevels.all
            },
            {   //Need to give more fine-grained control to the client side scripts,
                //so that not all client side scripts are exposed to anonymous users.
                path: '/js/*',
                httpMethod: 'GET',
                middleware: [function (req, res) {
                    var requestedView = path.join('./', req.url);
                    res.render(requestedView);
                }],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/register',
                httpMethod: 'POST',
                middleware: [AuthCtrl.register],
                accessLevel: accessLevels.all
            },
            {
                path: '/login',
                httpMethod: 'POST',
                middleware: [AuthCtrl.login],
                accessLevel: accessLevels.all
            },
            {
                path: '/logout',
                httpMethod: 'POST',
                middleware: [AuthCtrl.logout],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/questions',
                httpMethod: 'GET',
                middleware: [QuestionCtrl.index],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/questions',
                httpMethod: 'POST',
                middleware: [QuestionCtrl.add],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id',
                httpMethod: 'GET',
                middleware: [QuestionCtrl.findOne],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/questions/:id',
                httpMethod: 'POST',
                middleware: [QuestionCtrl.update],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id',
                httpMethod: 'DELETE',
                middleware: [QuestionCtrl.removeById],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers',
                httpMethod: 'POST',
                middleware: [AnswerCtrl.add],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers/:answerId',
                httpMethod: 'POST',
                middleware: [AnswerCtrl.update],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers/:answerId',
                httpMethod: 'DELETE',
                middleware: [AnswerCtrl.removeById],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/comments',
                httpMethod: 'POST',
                middleware: [CommentCtrl.add],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/comments/:commentId',
                httpMethod: 'POST',
                middleware: [CommentCtrl.update],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/comments/:commentId',
                httpMethod: 'DELETE',
                middleware: [CommentCtrl.removeById],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers/:answerId/comments',
                httpMethod: 'POST',
                middleware: [AnswerCommentCtrl.add],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers/:answerId/comments/:commentId',
                httpMethod: 'POST',
                middleware: [AnswerCommentCtrl.update],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/questions/:id/answers/:answerId/comments/:commentId',
                httpMethod: 'DELETE',
                middleware: [AnswerCommentCtrl.removeById],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users',
                httpMethod: 'GET',
                middleware: [UserCtrl.index],
                accessLevel: accessLevels.admin
            },
            {
                path: '/api/users/:username',
                httpMethod: 'GET',
                middleware: [UserCtrl.findOne],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/users/:username',
                httpMethod: 'POST',
                middleware: [UserCtrl.update],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/users/:username/schools',
                httpMethod: 'POST',
                middleware: [UserCtrl.updateSchools],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users/:username/sessions',
                httpMethod: 'POST',
                middleware: [UserCtrl.updateSessions],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users/:username/books',
                httpMethod: 'POST',
                middleware: [UserCtrl.updateBooks],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users/:username/schools',
                httpMethod: 'GET',
                middleware: [UserCtrl.getSchools],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users/:username/sessions',
                httpMethod: 'GET',
                middleware: [UserCtrl.getSessions],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/users/:username/books',
                httpMethod: 'GET',
                middleware: [UserCtrl.getBooks],
                accessLevel: accessLevels.loggedin
            },
            {
                path: '/api/students/:username',
                httpMethod: 'GET',
                middleware: [StudentCtrl.findOne],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/students/:username',
                httpMethod: 'post',
                middleware: [StudentCtrl.update],
                accessLevel: accessLevels.all
            },
            // {// todo: student delete api is under development
            //     path: '/api/students/:username',
            //     httpMethod: 'DELETE',
            //     middleware: [StudentCtrl.remove],
            //     accessLevel: accessLevels.all
            // },
            {
                path: '/api/users/:username/feeds',
                httpMethod: 'GET',
                middleware: [UserFeedCtrl.getByPage],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/users/:username/feeds/:page',
                httpMethod: 'GET',
                middleware: [UserFeedCtrl.getByPage],
                accessLevel: accessLevels.all
            },
            {   //Only for testing. Should disable during production.
                path: '/api/users/:userId/feeds',
                httpMethod: 'POST',
                middleware: [UserFeedCtrl.add],
                accessLevel: accessLevels.superadmin
            },
            // {
            //     path: '/api/users/:username/questions',
            //     httpMethod: 'GET',
            //     middleware: [UserCtrl.index],
            //     accessLevel: accessLevels.all
            // },
            // {
            //     path: '/api/users/:username/answers',
            //     httpMethod: 'GET',
            //     middleware: [UserCtrl.index],
            //     accessLevel: accessLevels.all
            // },
            // {
            //     path: '/api/users/:username/comments',
            //     httpMethod: 'GET',
            //     middleware: [UserCtrl.index],
            //     accessLevel: accessLevels.all
            // },
            // {
            //     path: '/api/users/:username/edits',
            //     httpMethod: 'GET',
            //     middleware: [UserCtrl.index],
            //     accessLevel: accessLevels.all
            // },
            //School API
            {// get list of schools with limited fields
                path: '/api/schools',
                httpMethod: 'GET',
                middleware: [SchoolCtrl.index],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/schools/search',
                httpMethod: 'GET',
                middleware: [SchoolCtrl.search],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/schools/:name',
                httpMethod: 'GET',
                middleware: [SchoolCtrl.get],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/schools',
                httpMethod: 'POST',
                middleware: [SchoolCtrl.create],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/schools/:name',
                httpMethod: 'POST',
                middleware: [SchoolCtrl.update],
                accessLevel: accessLevels.all
            },
            {// get list of sessions with limited fields
                path: '/api/sessions',
                httpMethod: 'GET',
                middleware: [SessionCtrl.index],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/search',
                httpMethod: 'GET',
                middleware: [SessionCtrl.search],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions',
                httpMethod: 'post',
                middleware: [SessionCtrl.add],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId',
                httpMethod: 'GET',
                middleware: [SessionCtrl.findOne],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId',
                httpMethod: 'post',
                middleware: [SessionCtrl.updateById],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/questions',
                httpMethod: 'post',
                middleware: [SessionCtrl.updateQuestions],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/questions',
                httpMethod: 'get',
                middleware: [SessionCtrl.getQuestions],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/books',
                httpMethod: 'post',
                middleware: [SessionCtrl.updateBooks],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/books',
                httpMethod: 'get',
                middleware: [SessionCtrl.getBooks],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId',
                httpMethod: 'delete',
                middleware: [SessionCtrl.remove],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/feeds',
                httpMethod: 'GET',
                middleware: [SessionFeedCtrl.getByPage],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/sessions/:sessionId/feeds/:page',
                httpMethod: 'GET',
                middleware: [SessionFeedCtrl.getByPage],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books',
                httpMethod: 'GET',
                middleware: [BookCtrl.index],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books/:title',
                httpMethod: 'GET',
                middleware: [BookCtrl.findOneByTitle],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books/:author/:title',
                httpMethod: 'GET',
                middleware: [BookCtrl.findOneByAuthorAndTitle],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books',
                httpMethod: 'POST',
                middleware: [BookCtrl.add],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books/:id',
                httpMethod: 'POST',
                middleware: [BookCtrl.updateById],
                accessLevel: accessLevels.all
            },
            {
                path: '/api/books/:title/feeds',
                httpMethod: 'GET',
                middleware: [BookCtrl.index],
                accessLevel: accessLevels.all
            },
            {
                path: '/emails/render/:templateString',
                httpMethod: 'GET',
                middleware: [MailerCtrl.render],
                accessLevel: accessLevels.admin
            },
            {
                path: '/emails/send/:templateString',
                httpMethod: 'GET',
                middleware: [MailerCtrl.testSend],
                accessLevel: accessLevels.superadmin
            },
            {
                path: '/emails/activate',
                httpMethod: 'GET',
                middleware: [MailerCtrl.activate],
                accessLevel: accessLevels.all
            },
            {
                path: '/spider',
                httpMethod: 'GET',
                middleware: [SpiderCtrl.questions],
                accessLevel: accessLevels.all
            },
            {
                path: '/spider/questions',
                httpMethod: 'GET',
                middleware: [SpiderCtrl.questions],
                accessLevel: accessLevels.all
            },
            {
                path: '/spider/questions/:id',
                httpMethod: 'GET',
                middleware: [SpiderCtrl.question],
                accessLevel: accessLevels.all
            },
            // All other get requests should be handled by AngularJS's client-side routing system
            {
                path: '/*',
                httpMethod: 'GET',
                middleware: [
                    function (req, res) {
                        var role = userRoles.public, username = '', id = '';
                        if (req.user) {
                            role = req.user.role;
                            username = req.user.username;
                            id = req.user.id;
                        }
                        res.cookie('user', JSON.stringify({
                            'username': username,
                            'role': role,
                            'id': id
                        }));
                        res.render('index');
                    }
                ]
            }
        ];
        function httpMethodRecitifier (route) {
            route.httpMethod = route.httpMethod.toUpperCase();
        }
        _.each(routes, httpMethodRecitifier);
        return function (app) {

            _.each(routes, function (route) {
                route.middleware.unshift(ensureAuthorized);
                var args = _.flatten([route.path, route.middleware]);
                // console.log(route.path + route.httpMethod);
                switch (route.httpMethod.toUpperCase()) {
                    case 'GET':
                        app.get.apply(app, args);
                        break;
                    case 'POST':
                        app.post.apply(app, args);
                        break;
                    case 'PUT':
                        app.put.apply(app, args);
                        break;
                    case 'DELETE':
                        app.delete.apply(app, args);
                        break;
                    default:
                        throw new Error('Invalid HTTP method specified for route ' + route.path);
                        break;
                }
            });
        };
    }
);

