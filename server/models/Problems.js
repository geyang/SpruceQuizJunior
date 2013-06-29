var Problems:
    , _ =               require('underscore')
    , passport =        require('passport')
    , check =           require('validator').check
    , userRoles =       require('../../client/js/routingConfig').userRoles;


var problem: {
        problemUUID,
        topLevel: true,
        problemType: ['multipleChoice','fillIn(multiple blanks)','OpenEnded'],
        question: ["the first president of the US is:","and the second first lady is:","."]
        choices: [],
        multimedia,
        subproblems: []
        solution: ['Washinton','Mrs. Adams'], //security!
        explanation:['']
        hints: [],
        hintRules: ['0','1',''],
   }

var problemMetaData:{
        problemUUID:
        difficulty: <float>, 
        topics:[(topicName, topicWeight),] 
        }

var student:{
        userUUID,
        studentName,
        studentGroup: ["id1", "id2", "id3"]
        exams: ["id1", "id2", "id3"]
}

var teacher:{
        userUUID,
        studentGroup,
}

var parents:{
        userUUID
}

var admin:{
        userUUID
}

var exam:{
        examUUID,
        studentGroup,
        examTitle: "期中考试"
        attendence: true
        totalScore: 100,
        problems:[
            {
                problemUUID: ,
                problemType: ,
                weight: ,
                receivedScore,
                answer
            },
            {
                problemUUID: ,
                problemType: ,
                weight: ,
                receivedScore,
                answer
            }]
}

var studentGroup:{
        groupUUID,
        groupName,
}

var _ =           require('underscore')
    , User =      require('../models/User.js')
    , userRoles = require('../../client/js/routingConfig').userRoles;

module.exports = {
    index: function(req, res) {
        var users = User.findAll();
        _.each(users, function(user) {
            delete user.password;
            delete user.twitter;
            delete user.facebook;
            delete user.google;
            delete user.linkedin;
        });
        res.json(users);
    }
};
