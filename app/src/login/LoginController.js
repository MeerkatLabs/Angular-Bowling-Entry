/**
 * Created by rerobins on 2/19/15.
 */

/**
 * Login controller.
 * @param LoginService
 * @constructor
 */
var LoginController = function(LoginService) {
    var controller = this;

    controller.userName = '';
    controller.password = '';

    controller.submit = function() {
        console.log('Submit button pressed', controller);

        LoginService.login(controller.userName, controller.password).catch(function() {

            console.log('Notify user that password or username is incorrect');
            controller.error = {
                login: true
            };

        });

    };
};

angular.module('login')
    .controller('LoginController', ['LoginService', LoginController])
    .config(['LoginServiceProvider', function(LoginServiceProvider) {
        LoginServiceProvider.displayLogin = ['$mdBottomSheet', function($mdBottomSheet) {
            // request the token, otherwise carry on.
            return $mdBottomSheet.show({
                templateUrl: 'partials/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginController'
            });
        }];
        LoginServiceProvider.hideLogin = ['$mdBottomSheet', function($mdBottomSheet) {
            // request the token, otherwise carry on.
            $mdBottomSheet.hide();
        }];

    }]);
