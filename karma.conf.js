// Karma configuration
// Generated on Thu Mar 12 2015 21:55:39 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
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
        'app/bower_component/angular-mocks/angular-mocks.js',
        'app/src/**/_*.js',
        'app/src/**/*.js',
        'app/test/**/*.js',
        'app/partials/**/*.html'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "app/partials/**/*.html": ["ng-html2js"],
        "app/src/**/*.js": ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'karma.templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    }

  });
};
