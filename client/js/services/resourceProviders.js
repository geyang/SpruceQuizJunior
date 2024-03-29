'use strict';

angular.module('resourceProvider', ['ngResource', 'ngRoute'])
    .factory('Users', ['$resource', function ($resource) {
        var Users = $resource('/api/users', {}, {
            create: {method: 'POST'},
            list: {method: 'GET'}
        });
        var User = $resource('/api/users/:username', {username: '@username'});
        var Feeds = $resource('/api/users/:username/feeds', {username: '@username'});
        var FeedsByPage = $resource('/api/users/:username/feeds/:page', {username: '@username', page: '@page'});
        var onSessions = $resource('/api/users/:username/sessions', {username: '@username'});
        var onBooks = $resource('/api/users/:username/books', {username: '@username'});
        return {
            list: $resource('/api/users'),
            onUsers: $resource('/api/users/:uuid', {uuid: '@id'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true}
            }),
            get: User.get,
            save: User.save,
            getFeeds: Feeds.get,
            getFeedsByPage: FeedsByPage.get,
            updateSessions: onSessions.save,
            updateBooks: onBooks.save
        };
    }])
    .factory('Questions', function ($resource) {
        var Questions = $resource('/api/questions', {}, {
            create: {method: 'POST'}
        });
        var Question = $resource('/api/questions/:id', {id: '@id'});
        var Feeds = $resource('/api/questions/:id/feeds', {id: '@id'});
        var Votes = $resource('/api/questions/:id/votes', {id: '@id'});
        var onSessions = $resource('/api/questions/:id/sessions', {id: '@id'});
        var onBooks = $resource('/api/questions/:id/books', {id: '@id'});
        return {
            get: Question.get,
            query: Questions.query,
            create: Questions.create,
            save: Question.save,
            remove: Question.remove,
            updateVotes: Votes.save,
            updateSession: onSessions.save,
            getSessions: onSessions.get,
            updateBook: onBooks.save,
            getBooks: onBooks.get,
            getFeeds: Feeds.get
        };
    })
    .factory('Answers', function ($resource) {
        var Answers = $resource('/api/questions/:id/answers', {id: '@id'}, {
            create: {method: 'POST'}
        });
        var Answer = $resource('/api/questions/:id/answers/:answerId', {id: '@id', answerId: '@answerId'});
        var Feeds = $resource('/api/questions/:id/answers/:answerId/feeds', {id: '@id', answerId: '@answerId'});
        var AnswerVotes = $resource('/api/questions/:id/answers/:answerId/votes', {id: '@id', answerId: '@answerId'});
        return {
            add: Answers.create,
            save: Answer.save,
            updateVotes: AnswerVotes.save,
            remove: Answer.remove,
            getFeeds: Feeds.get
        };
    })
    .factory('Comments', function ($resource) {
        var Comments = $resource('/api/questions/:id/comments', {id: '@id'}, {
            create: {method: 'POST'}
        });
        var Comment = $resource('/api/questions/:id/comments/:commentId', {id: '@id', commentId: '@commentId'});
        var CommentVotes = $resource('/api/questions/:id/comments/:commentId/Votes', {id: '@id', commentId: '@commentId'});
        return {
            add: Comments.create,
            save: Comment.save,
            updateVotes: CommentVotes.save,
            remove: Comment.remove
        };
    })
    .factory('AnswerComments', function ($resource) {
        var AnswerComments = $resource('/api/questions/:id/answers/:answerId/comments', {id: '@id', answerId: '@answerId'}, {
            create: {method: 'POST'}
        });
        var AnswerComment = $resource('/api/questions/:id/answers/:answerId/comments/:commentId', {id: '@id', answerId: '@answerId', commentId: '@commentId'});
        var AnswerCommentVotes = $resource('/api/questions/:id/answers/:answerId/comments/:commentId/votes', {id: '@id', answerId: '@answerId', commentId: '@commentId'});
        return {
            add: AnswerComments.create,
            save: AnswerComment.save,
            updateVotes: AnswerCommentVotes.save,
            remove: AnswerComment.remove
        };
    })
    .factory('Students', function ($resource) {
        var Students = $resource('/api/students');
        var Student = $resource('/api/students/:username', {username: '@username'});
        return {
            search: Students.query,
            get: Student.get,
            save: Student.save
        };
    })
    .factory('Parents', function ($resource) {
        var Parent = $resource('/api/parents/:username', {username: '@username'});
        return {
            onMaterials: $resource('/api/materials/:uuid', {uuid: '@materialUUID'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true}
            }),
            get: Parent.get
        };
    })
    .factory('Teachers', function ($resource) {
        var Teacher = $resource('/api/teachers/:username', {username: '@username'});
        return {
            onTeachers: $resource('/api/teachers/:uuid', {uuid: '@userUUID'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true}
            }),
            onSchools: $resource('/api/teachers/:uuid/schools', {uuid: '@userUUID'}, {
            }),
            onStudents: $resource('/api/teachers/:uuid/students', {uuid: '@userUUID'}, {
            }),
            onSections: $resource('/api/teachers/:uuid/sections', {uuid: '@userUUID'}, {
            }),
            get: Teacher.get
        };
    })
    .factory('Admins', function ($resource) {
        var Admin = $resource('/api/admins/:username', {username: '@username'});
        return {
//            onTeachers: $resource('/api/teachers/:uuid', {uuid:'@userUUID'}, {
//                list: {method:'GET', params:{uuid: 'all'}, isArray:true}
//            }),
//            onSchools: $resource('/api/teachers/:uuid/schools', {uuid:'@userUUID'}, {
//            }),
//            onStudents: $resource('/api/teachers/:uuid/students', {uuid:'@userUUID'}, {
//            }),
            onSections: $resource('/api/admins/sections/:id', {id: '@_id'}, {
                list: {method: 'GET', params: {id: 'all'}, isArray: true},
                create: {method: 'POST', params: {id: 'create'}}
            }),
            get: Admin.get
        };
    })
    .factory('Superadmins', function ($resource) {
        var Superadmin = $resource('/api/superadmin/:username', {username: '@username'});
        return {
//            onTeachers: $resource('/api/teachers/:uuid', {uuid:'@userUUID'}, {
//                list: {method:'GET', params:{uuid: 'all'}, isArray:true}
//            }),
//            onSchools: $resource('/api/teachers/:uuid/schools', {uuid:'@userUUID'}, {
//            }),
//            onStudents: $resource('/api/teachers/:uuid/students', {uuid:'@userUUID'}, {
//            }),
            onSections: $resource('/api/admins/sections/:id', {id: '@_id'}, {
                list: {method: 'GET', params: {id: 'all'}, isArray: true},
                create: {method: 'POST', params: {id: 'create'}}
            }),
            get: Superadmin.get
        };
    })
    .factory('Schools', function ($resource) {
        var Schools = $resource('/api/schools');
        var School = $resource('/api/schools/:name', {name: '@name'});
        var SchoolStats = $resource('/api/schools/:name/stats', {name: '@name'});
        return {
            index: Schools.query,
            search: $resource('/api/schools/:name/search', {id: '@_id'}).get,
            stats: SchoolStats.get,
            add: Schools.create,
            get: School.get,
            save: School.save,
            remove: School.remove
        };
    })
    .factory('Sessions', function ($resource) {
        var Sessions = $resource('/api/sessions');
        var Session = $resource('/api/sessions/:sessionId', {sessionId: '@sessionId'});
        var onQuestions = $resource('/api/sessions/:sessionId/questions', {sessionId: '@sessionId'});
        var onBooks = $resource('/api/sessions/:sessionId/books', {sessionId: '@sessionId'});
        var Feeds = $resource('/api/sessions/:sessionId/feeds', {sessionId: '@sessionId'});
        return {
            index: Sessions.query,
            search: $resource('/api/sessions/search').get,
            create: Sessions.save,
            get: Session.get,
            getFeeds: Feeds.get, //get one bucket, so is not array.
            save: Session.save,
            remove: Session.remove,
            updateQuestions: onQuestions.save,
            getQuestions: onQuestions.query, //return session object with questions populated. not an array.
            updateBook: onBooks.save,
            getBooks: onBooks.get
        };
    })
    .factory('Books', function ($resource) {
        var Books = $resource('/api/books');
        var Book = $resource('/api/books/:bookId', {bookId: '@_id'});
        var onQuestions = $resource('/api/books/:bookId/questions', {bookId: '@_id'});
        var onSessions = $resource('/api/books/:bookId/sessions', {bookId: '@_id'});
        var Feeds = $resource('/api/books/:bookId/feeds', {bookId: '@_id'});
        return {
            create: Books.save,
            query: Books.query,
            get: Book.get,
            getFeeds: Feeds.get, //get one bucket, so is not array.
            save: Book.save,
            remove: Book.remove,
//            updateQuestions: onQuestions.save,
            getQuestions: onQuestions.query,
            updateSessions: onSessions.save,
            getSessions: onSessions.get
        };
    })
    .factory('Sections', function ($resource) {
        return {
            onSections: $resource('/api/sections/:id', {id: '@_id'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true},
                update: {method: 'PUT', params: {uuid: '@uuid'}}
            }),
            onStudents: $resource('/api/sections/:uuid/students', {uuid: '@sectionUUID'}, {
            }),
            onTeachers: $resource('/api/sections/:uuid/teachers', {uuid: '@sectionUUID'}, {
            }),
            onSchools: $resource('/api/sections/:uuid/schools', {uuid: '@sectionUUID'}, {
            }),
            onUnits: $resource('/api/sections/:uuid/units', {uuid: '@sectionUUID'}, {
                get: {method: 'GET', params: {uuid: '@uuid'}, isArray: true}
            }),
            onFeeds: $resource('/api/sections/:uuid/feeds/:flim', {uuid: '@sectionUUID'}, {
                get: {method: 'GET', params: {uuid: '@uuid', flim: '50'}, isArray: true}
            })
        };
    })
    .factory('Units', function ($resource) {
        return {
            onUnits: $resource('/api/units/:uuid', {uuid: '@unitUUID'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true}
            }),
            onArchived: $resource('/api/units/:uuid/archived', {uuid: '@unitUUID'}, {
                get: {method: 'GET', params: {uuid: '@uuid'}, isArray: true}
            }),
            onMaterials: $resource('/api/units/:uuid/materials/:mid/:toArchive', {uuid: '@unitUUID'}, {
                update: {method: 'PUT', params: {uuid: '@uuid', mid: '@mid', toArchive: '@toArchive'}}
            })
        };
    })
    .factory('Materials', function ($resource) {
        return {
            onMaterials: $resource('/api/materials/:uuid', {uuid: '@materialUUID'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true}
            })
        };
    })
    .factory('Problems', function ($resource) {
        return {
            onProblems: $resource('/api/problems/:uuid', {uuid: '@problemUUID'}, {
                list: {method: 'GET', params: {uuid: 'all'}, isArray: true},
                update: {method: 'PUT', params: {uuid: '@problemUUID'}}
            })
        };
    });