/**
 * Created by rerobins on 2/21/15.
 */

angular.module('login', ['ngMaterial', 'angular-jwt', 'ngMessages'])
    .constant('LOGIN_EVENTS', {
        USER_LOGGED_IN: 'login::userLoggedIn',
        USER_LOGGED_OUT: 'login::userLoggedOut'
    }).config(['$httpProvider', 'jwtInterceptorProvider', function Config($httpProvider, jwtInterceptorProvider) {

        jwtInterceptorProvider.tokenGetter = ['LoginService', 'config', function(LoginService, config) {

            return LoginService.getJWT(config);

        }];

        jwtInterceptorProvider.authPrefix = 'JWT ';


        $httpProvider.interceptors.push('jwtInterceptor');
    }]);
