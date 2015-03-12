/**
 * Controller for the top bar of the application.
 *
 * Responsible for updating the title on the state change success values and the hamburger menu for the side bar open
 * and close.
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