/**
 * Module definition file.
 */

angular.module('bowling', ['bowling.core', 'bowling.entry', 'login'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('bowling.base', {
                url: '/',
                templateUrl: 'partials/base.html',
                title: 'Welcome'
            });
    }]).config(['LoginServiceProvider', function(LoginServiceProvider) {
        LoginServiceProvider.ignoreUrls = function(config) {
            return config.url.indexOf('http://') !== 0 && config.url.indexOf('https://') !== 0;
        };

        LoginServiceProvider.loginUrl = 'http://127.0.0.1:8000/api-token-auth/';
        LoginServiceProvider.refreshUrl = 'http://127.0.0.1:8000/api-token-refresh/';
    }]);