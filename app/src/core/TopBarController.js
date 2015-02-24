/**
 * Controller for the top bar of the application.
 */

var TopBarController = function($rootScope, $mdSidenav) {

    var controller = this;

    controller.title = 'Undefined';

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        controller.title = toState.title || 'Undefined';

    });

    controller.openMenu = function() {
        $mdSidenav('sideNav').toggle();
    };

};

angular.module('bowling.core')
    .controller('TopBarController', ['$rootScope', '$mdSidenav', TopBarController]);