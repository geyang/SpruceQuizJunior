// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            '../client/lib/angular/angular.js',
            '../client/lib/angular-resource/*.js',
            '../client/lib/angular-Route/*.js',
            '../client/lib/angular-mocks/angular-mocks.js',
            '../client/js/*.js',
            '../client/js/**/*.js'
//        ,
//      '../client/mock/**/*.js',
//      '../client/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            '../client/js/directives.js',
            '../client/js/lib/**'

        ],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
