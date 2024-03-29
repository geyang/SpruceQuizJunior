'use strict';

var spApp = angular.module('SpruceQuizApp');

spApp.controller('SuperAdminCtrl',
    ['$scope',
        function ($scope) {
            // this object is to hold data for future tables
            $scope.userData = {
                roleTitle: 'admin',
                firstName: '歌',
                lastName: '杨',
                schools: [
                    {schoolName: '北京景山学校'}
                ],
                sections: [
                    {
                        sectionName: '三年级二班',
                        sectionParent: null,
                        sectionChildren: []
                    }
                ]
            };
        }
    ]
);

spApp.controller('DevelopmentCtrl',
    ['$scope', '_',
        function ($scope, _) {
            // this object is to hold data for future tables

            function sendMail (api) {
            }

            var designConfig = {
                frontEnd: {"title": "前端工作总表",
                    "modules": [
                        {
                            "name": "登陆界面",
                            fold: true,
                            complete: true,
                            url: '/img/ui_design/登录界面-01.png',
                            children: [
                                {name: '登陆', description: '', complete: true,
                                    url: '/img/ui_design/登录界面-01.png'
                                },
                                {name: '注册', complete: true,
                                    url: '/img/ui_design/注册界面-01.png',
                                    children: [
                                        {name: '学生', complete: true},
                                        {name: '教师', complete: true},
                                        {name: '家长', complete: true}
                                    ]
                                }
                            ]
                        },

                        {
                            "name": "UI components",
                            fold: false,
                            complete: false,
                            url: '/img/ui_design/标题栏收件栏和用户选项-01.png',
                            children: [
                                {
                                    "name": "页面框架",
                                    fold: true,
                                    complete: false,
                                    url: ''
                                },
                                {
                                    "name": "标题栏",
                                    fold: true,
                                    complete: false,
                                    url: '/img/ui_design/标题栏收件栏和用户选项-01.png',
                                    children: [
                                        {name: 'logo', complete: false},
                                        {name: '收件夹', complete: false},
                                        {name: '统计', complete: false},
                                        {name: '用户图标和得分', complete: false}
                                    ]
                                },
                                {
                                    "name": "问题编辑模块",
                                    fold: false,
                                    complete: false,
                                    url: '/img/ui_design/问题页面-01.png'
                                }
                            ]
                        },
                        {
                            "name": "搜索问题",
                            fold: true,
                            complete: false,
                            url: '/img/ui_design/搜索问题-01.png',
                            children: [
                                {
                                    name: '对象', complete: false,
                                    children: [
                                        {name: '问题', complete: false},
                                        {name: '搜索关键词', complete: false},
                                        {name: '标签', complete: false},
                                        {name: '相关问题', complete: false}
                                    ]
                                },
                                {
                                    name: 'api', complete: false,
                                    children: [
                                        {name: 'api/question/:id', complete: false},
                                        {name: 'api/user/:id', complete: false},
                                        {name: 'api/question/search?math+text+otherkeyword', complete: false},
                                        {name: '', complete: false}
                                    ]
                                },
                                {name: '数据库', complete: false,
                                    children: [
                                        {   name: 'Question', complete: false,
                                            description: '',
                                            punchCard: [
                                                {   start: Date(2014, 1, 26, 12, 0, 0),
                                                    end: Date(2014, 1, 26, 13, 12, 0)
                                                }
                                            ]
                                        },
                                        {   name: 'Tags', complete: false,
                                            description: '',
                                            punchCard: [
                                                {   start: Date(2014, 1, 26, 12, 0, 0),
                                                    end: Date(2014, 1, 26, 13, 12, 0)
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "提问",
                            fold: false,
                            complete: false,
                            url: '/img/ui_design/提问-01.png'
                        },
                        {
                            "name": "问题页面",
                            fold: false,
                            complete: false,
                            url: '/img/ui_design/问题页面-01.png'
                        },
                        {
                            "name": "用户主页",
                            fold: false,
                            complete: false,
                            url: '/img/ui_design/用户主页-01.png'
                        },
                        {
                            "name": "工具和事物",
                            fold: true,
                            complete: false,
                            children: [
                                {name: '文档', complete: false,
                                    children: [
                                        {name: 'jsDoc', complete: false},
                                        {name: 'apidoc', complete: false},
                                        {name: 'code coverage', complete: false}
                                    ]
                                },
                                {name: 'grunt 测试', complete: false},
                                {name: 'single line deployment', complete: false},
                                {name: '', complete: false}
                            ]
                        }
                    ],
                    tags: [
                        {name: '设计', url: '/img/ui_design/登录界面-01.png'},
                        {name: 'api', children: [
                            {name: '测试', complete: true}
                        ]},
                        {name: '数据库', complete: true},
                        {name: '网页', complete: true}
                    ],
                    tasks: {

                    }

                }

            };
            $scope.designConfig = designConfig;
            $scope.inputModel = {};
            $scope.inputModel.text = '';
            function edit() {
            };
            function add() {
                var newEntry = {
                    name: $scope.inputModel.entryInput
                };
                $scope.designConfig.frontEnd.main.push(newEntry);
                $scope.inputModel.textInput = '';
            };
            $scope.add = add;
            $scope.edit = edit;
            $scope.punchCard = [
                {
                    task: '页面框架',
                    description: '页面body部分代码需要一些修改' +
                        '目前已经实现的页面包括：' +
                        '- 登陆页面 (frontPage)' +
                        '- 问题页面 (problems)' +
                        '- 开发页面 (development)' +
                        '' +
                        '其中，需要的less文件包括：' +
                        '- index.less' +
                        '- loginWidget.less' +
                        '- superadmin.less' +
                        '' +
                        'Here, I wouls begin with the index.less file.',
                    start: new Date(2014, 0, 26, 10),
                    end: new Date()
                },
                {
                    task: 'navbar',
                    description: '需要添加缩小后的链接',
                    start: new Date(2014, 0, 27, 1, 30, 0),
                    end: new Date()
                },
                {
                    task: 'ui routing',
                    description: '考虑一下problems页面内部的views routing，可能需要用到angular-ui',
                    start: new Date(2014, 0, 27, 1, 30, 0),
                    end: new Date()
                },
                {
                    task: '提问界面',
                    description: '构建问题搜索和提问界面的结构，并开始写提问部分的代码。' +
                        'the controller code is structured as the following:' +
                        '    - viewState = ',
                    start: new Date(2014, 0, 26, 15, 30, 0),
                    end: new Date()
                },
                {
                    task: '问题样例数据结构',
                    description: '准备问题样例，在下一个页面也会用到。' +
                        ' ',
                    start: new Date(2014, 0, 26, 15, 30, 0),
                    end: new Date()
                }


            ]
            $scope.view = {};
            $scope.view.imageUrl = '/img/ui_design/搜索问题-01.png';
            $scope.view.description = 'Ta很懒，什么都没有留下...';
            $scope.hover = function (object) {
                console.log('mouse hover triggered')
                $scope.view.imageUrl = object.url;
                $scope.view.description = object.description;
            }


        }
    ]
);
