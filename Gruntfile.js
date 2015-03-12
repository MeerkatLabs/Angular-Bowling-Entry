
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
                files: ['Gruntfile.js', 'app/src/**/*.js', 'app/test/**/*.js'],
                tasks: ['development_js']
            },
            sass: {
                files: ['Gruntfile.js', 'app/sass/**/*.scss'],
                tasks: ['sass']
            }

        },
        jasmine: {
            bowling_entry: {
                src: [
                    'app/src/**/_*.js',
                    'app/src/**/*.js',
                ],
                options: {
                    vendor: [
                        'app/bower_component/angular/angular.min.js',
                        'app/bower_component/angular-animate/angular-animate.js',
                        'app/bower_component/angular-aria/angular-aria.js',
                        'app/bower_component/angular-jwt/dist/angular-jwt.js',
                        'app/bower_component/angular-material/angular-material.js',
                        'app/bower_component/angular-material-icons/angular-material-icons.js',
                        'app/bower_component/angular-messages/angular-messages.js',
                        'app/bower_component/angular-resource/angular-resource.js',
                        'app/bower_component/angular-ui-router/release/angular-ui-router.js',
                        'app/bower_component/lodash/dist/lodash.js',
                        'app/bower_component/mkl-login-jwt/dist/mkl-login-jwt.js',
                        'app/bower_component/restangular/dist/restangular.js',
                        'app/bower_component/angular-mocks/angular-mocks.js'
                    ],
                    specs: ['app/test/**/*.js'],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: 'coverage'
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('development_js', ['jshint', 'concat', 'jasmine']);
    grunt.registerTask('development', ['development_js', 'sass']);
    grunt.registerTask('default', ['development', 'uglify']);
};