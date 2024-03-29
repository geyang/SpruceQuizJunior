module.exports = function (grunt) {

    // Load tasks
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-apidoc');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
//                    reporter: 'spec'
                    reporter: 'spec',
                    // Require blanket wrapper here to instrument other required
                    // files on the fly.
                    //
                    // NB. We cannot require blanket directly as it
                    // detects that we are not running mocha cli and loads differently.
                    //
                    // NNB. As mocha is 'clever' enough to only run the tests once for
                    // each file the following coverage task does not actually run any
                    // tests which is why the coverage instrumentation has to be done here
//                    require: 'coverage/blanket' //Need to fix later
                },
                src: ['server/tests/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: false,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'coverage.html'
                },
                src: ['server/tests/**/*.js']
            }
        },
        watch: {
            mochaTest: {
                files: [ 'server/tests/**/**/*.js',
                    'server/**/*.js',
                    'server/*.js',
                    '!node_module'    ],
                tasks: ['mochaTest'],
                options: {
                    spawn: true,
                    debounceDelay: 250
                }
            },
            jsdoc: {
                files: [ 'server/tests/**/**/*.js',
                    'server/**/*.js',
                    'server/*.js',
                    '!node_module',
                    'server/RAEDME.md'
                ],
                tasks: ['jsdoc'],
                options: {
                    spawn: true,
                    debounceDelay: 100
                }

            }
        },
        jsdoc: {
            dist: {
                src: [
                    'server/*.js',
                    'server/models/*js',
                    'server/controllers/*js',
                    'server/tests/integration/*.js',
                    'server/tests/unit/*.js',
                    'server/README.md'
                ],
                options: {
                    destination: 'docs/server/',
                    template: '../docstrap/template/',
                    config: 'jsDoc.conf.json'
                }
            }
        },
        apidoc: {
            server: {
                src: "server/",
                dest: "docs/api/",
                options: {
                    debug: true,
                    includeFilters: [ ".*\\.js$" ],
                    excludeFilters: [ "node_modules/" ],
                    marked: {
                        gfm: true
                    }
                }
            }
        }
    });

    grunt.registerTask('default', [
//        'lint',
        'test',
        'jsdoc']);
    grunt.registerTask('test', 'mochaTest:test');
    grunt.registerTask('coverage', 'mochaTest:coverage');
    grunt.registerTask('watch-test', 'watch:mochaTest');
    grunt.registerTask('watch-doc', 'watch:jsdoc');

};
