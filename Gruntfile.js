
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            application: {
                files: {
                    "app/build/<%= pkg.name %>.js": [
                        'app/src/js.prefix',
                        'app/src/**/_*.js',
                        'app/src/**/*.js',
                        'app/src/js.suffix'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '/* \n' +
                '   <%= pkg.name %> <%= pkg.version %> \n' +
                '*/\n',
                compress: {
                    drop_console: true
                },
                sourceMap: true
            },
            build: {
                src: 'app/build/<%= pkg.name %>.js',
                dest: 'app/build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'app/src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/<%= pkg.name %>.css': 'sass/<%= pkg.name %>.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'app/src/**/*.js', 'app/tests/**/*.js'],
                tasks: ['development_js']
            },
            sass: {
                files: ['Gruntfile.js', 'app/sass/**/*.scss'],
                tasks: ['sass']
            }

        }
        //jasmine: {
        //    trafalgar: {
        //        src: [
        //            'javascript/**/_*.js', 'javascript/**/*.js'
        //        ],
        //        options: {
        //            vendor: [
        //                'static/jasmine/jasmine.js',
        //                'static/jasmine/jasmine-html.js',
        //                'static/jasmine/boot.js',
        //                'static/jquery/jquery-2.1.1.min.js',
        //                'static/jquery/jquery.cookie.js',
        //                'static/jsrender/jsrender.min.js',
        //                'static/jasmine-jquery/jasmine-jquery.js',
        //                'static/jquery/jquery-ui.min.js'
        //            ],
        //            specs: ['tests/**/_*.js', 'tests/**/*.js'],
        //            template: require('grunt-template-jasmine-istanbul'),
        //            templateOptions: {
        //                coverage: 'output/coverage/coverage.json',
        //                report: 'output/coverage'
        //                //thresholds: {
        //                //    lines: 75,
        //                //    statements: 75,
        //                //    branches: 75,
        //                //    functions: 90
        //                //}
        //            }
        //        }
        //    },
        //    minimized: {
        //        src: 'static/trafalgar.min.js',
        //        options: {
        //            vendor: [
        //                'static/jasmine/jasmine.js',
        //                'static/jasmine/jasmine-html.js',
        //                'static/jasmine/boot.js',
        //                'static/jquery/jquery-2.1.1.min.js',
        //                'static/jquery/jquery.cookie.js',
        //                'static/jsrender/jsrender.min.js',
        //                'static/jasmine-jquery/jasmine-jquery.js',
        //                'static/jquery/jquery-ui.min.js'
        //            ],
        //            specs: 'static/trafalgar.test.js'
        //        }
        //    }
        //}
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('development_js', ['jshint', 'concat']);
    grunt.registerTask('development', ['development_js', 'sass']);
    grunt.registerTask('default', ['development', 'uglify']);
};