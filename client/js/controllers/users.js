'use strict';
/* Controllers */
angular.module('SpruceQuizApp')
    .controller('UserCtrl',
    ['_', '$routeParams', '$location', '$filter', '$rootScope', '$scope', 'Auth', 'Sections', 'Units', 'Materials', 'Students', 'Model',
        function (_, $routeParams, $location, $filter, $rootScope, $scope, Auth, Sections, Units, Materials, Students, Model) {
            //Boiler Plate for authentication info
            $scope.user = Auth.user;
            $scope.userRoles = Auth.userRoles;
            $scope.accessLevels = Auth.accessLevels; //to allow authentication based elements.

            if (window.location.host.indexOf('youzi') == 0) {
                $scope.orgTitle = "游子 - ";
            }
            ;
            $scope.debug = {
                alert: function () {
                    alert('konami code success');
                }
            };
            $rootScope.errorClear = function () {
                $rootScope.error = null;
            };
            $scope.Model = Model;

            $scope.view = {
                state: 'search',
                profile: {}
            };
            $scope.view.profile.edit = false;

            $rootScope.errors = {};


            Model.getUserProfile($routeParams.username);

            function isArray(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }

            $scope.addEmptySchool = function () {
                Model.profile.schoolRecord.push({
                    name: '',
                    classYear: null,
                    entrance: null,
                    left: null,
                    alumni: null,
                    type: '',
                    majors: ['']
                });
            };

            $scope.editProfile = function () {

                $scope.view.profile.edit = true;

                function removeNullAddEmptyToEnd(obj, key) {
                    if (isArray(obj) && key !== 'schoolRecord') {
                        obj.map(function (value, index) {
                            if (!value) {
                                obj.splice(index, 1);
                            }
                        });
                        obj.push('');
                    }
                }

                _.map(Model.profile, removeNullAddEmptyToEnd);
                _.map(Model.profile.schoolRecord[Model.profile.schoolRecord.length-1], removeNullAddEmptyToEnd);

            };
            $scope.$watch('Model.profile',
                function (newVal, oldVal) {
                },
                true)

            $scope.submitProfile = function () {

                var school = Model.profile.schoolRecord[Model.profile.schoolRecord.length - 1]

                function removeNull(obj, key) {
                    if (isArray(obj)) {
                        obj.map(function (value, index) {
                            if (!value) {
                                obj.splice(index, 1);
                            }
                        });
                    }
                }

                _.map(Model.profile, removeNull);
                _.map(Model.profile.schoolRecord[Model.profile.schoolRecord.length-1], removeNull);

                if (school !== undefined) {
                    if (!school.name) {
                        // console.log('removing the last schoolRecord')
                        Model.profile.schoolRecord.splice(-1);
                    }
                } else {
                    Model.profile.schoolRecord = [];
                }

                Model.updateUserProfile(
                    function () {
                        $scope.view.profile.edit = false;
                    },
                    function (error) {
                    })
            };
        }
    ]);