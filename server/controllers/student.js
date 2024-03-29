/**
 * @fileOverview User Controller
 * @module User
 * @type {exports}
 * Registration and validation for authentication takes place in the
 * Auth controller and User model.
 * This `UserCtrl` module takes care of non-auth, API-related user
 * operations, such as
 *          user.index(),
 *          user.remove(:id),
 *          user.addSection(),
 *          user.addSchool(),
 *          user.addTutor(),
 *          etc.,
 * good luck coding!
 */
define(['underscore', '../models/SchemaModels', '../rolesHelper'],
    function (_, SchemaModels, rolesHelper) {
        "use strict";
        var UserM = SchemaModels.User;
        var StudentM = SchemaModels.Student;
        var userRoles = rolesHelper.userRoles;
        var keyString = 'name username signature DOB gender email addresses strongSubjects extracurriculars schoolRecord teacherFields stats sessions schools textbooks info';
        return {
            /**
             * @api {get} /user/:id Request User information
             * @apiName GetUser
             * @apiGroup User
             *
             * @apiParam {Number} id Users unique ID.
             *
             * @apiSuccess {String} firstname Firstname of the User.
             * @apiSuccess {String} lastname  Lastname of the User.
             *
             * @apiSuccessExample Success-Response:
             *     HTTP/1.1 200 OK
             *     {
             *       "firstname": "John",
             *       "lastname": "Doe"
             *     }
             *
             * @apiError UserNotFound The id of the User was not found.
             *
             * @apiErrorExample Error-Response:
             *     HTTP/1.1 404 Not Found
             *     {
             *       "error": "UserNotFound"
             *     }
             */
                //This is mostly experimental, since no testing spec is in place yet.
            search: function (req, res) {
                var query = {};
                if (req.query.school) {
                    query.schools = req.query.school;
                }
                if (req.query.createdBy) {
                    query['info.createdBy.username'] = createdBy;
                }
                //console.log(query);
                StudentM.find(
                    query,
                    keyString,
                    function (err, students) {
                        if (err) {
                            return res.json(404, err);
                        }
                        return res.json(200, students);
                    }
                );
            },
            findOne: function (req, res) {
                StudentM.findOne(
                    {username: req.params.username},
                    keyString,
                    function (err, user) {
                        if (err) {
                            return res.send(404, 'userNotFound');
                        }
                        res.send(200, user);
                    }
                );
            },
            update: function (req, res) {
                var data = req.body;
                delete data._id;
                StudentM.findOneAndUpdate(
                    {username: req.params.username},
                    data,
                    keyString,
                    function (err, student) {
                        if (err) {
                            return res.send(404, err);
                        }
                        res.send(201, student);
                    }
                );
            }//,
//            remove: function (req, res) {
//                StudentM.remove(
//                    {username: req.params.username},
//                    function (err) {
//                        if (err) {
//                            return res.send(404, 'userNotFound');
//                        }
//                        res.send(201);
//                    }
//                );
//            }
        };
    })
