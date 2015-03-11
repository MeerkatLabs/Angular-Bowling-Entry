/**
 * Created by rerobins on 2/19/15.
 */

/**
 * Login controller.
 * @param JWTLoginService
 * @constructor
 */
var LoginController = function(JWTLoginService) {
    var controller = this;

    controller.userName = '';
    controller.password = '';

    controller.submit = function() {
        console.log('Submit button pressed', controller);

        JWTLoginService.login(controller.userName, controller.password).catch(function() {

            console.log('Notify user that password or username is incorrect');
            controller.error = {
                login: true
            };

        });

    };
};

angular.module('bowling')
    .controller('LoginController', ['JWTLoginService', LoginController])
    .config(['JWTLoginServiceProvider', function(JWTLoginServiceProvider) {
        JWTLoginServiceProvider.displayLogin = ['$mdBottomSheet', function($mdBottomSheet) {
            // request the token, otherwise carry on.
            return $mdBottomSheet.show({
                templateUrl: 'partials/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginController'
            });
        }];

        JWTLoginServiceProvider.hideLogin = ['$mdBottomSheet', function($mdBottomSheet) {
            // request the token, otherwise carry on.
            $mdBottomSheet.hide();
        }];

    }]);
