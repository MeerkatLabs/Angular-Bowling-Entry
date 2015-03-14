/**
 * Module definition file.
 */

angular.module('bowling', ['bowling.core', 'bowling.entry', 'mkl-login-jwt', 'restangular'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');

        $stateProvider.state('bowling', {
                url: '/',
                templateUrl: 'partials/base.html',
                title: 'Welcome'
            }).state('bowling.main', {
                url: 'main',
                templateUrl: 'partials/main.html',
                title: 'Welcome'
            });
    }]).config(['JWTLoginServiceProvider', function(JWTLoginServiceProvider) {
        JWTLoginServiceProvider.ignoreUrls = function(config) {
            return config.url.indexOf('http://') !== 0 && config.url.indexOf('https://') !== 0;
        };

        JWTLoginServiceProvider.loginUrl = 'http://127.0.0.1:8000/api-token-auth/';
        JWTLoginServiceProvider.refreshUrl = 'http://127.0.0.1:8000/api-token-refresh/';
    }]).config(['RestangularProvider', function(RestangularProvider) {

        RestangularProvider.setBaseUrl('http://127.0.0.1:8000/bowling/api');
        RestangularProvider.setRequestSuffix('/');

    }]).config(['jwtInterceptorProvider', function Config(jwtInterceptorProvider) {

        jwtInterceptorProvider.authPrefix = 'JWT ';

    }]);