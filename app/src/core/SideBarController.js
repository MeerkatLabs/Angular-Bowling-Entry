/**
 * Controller for the side bar.
 * @param $scope
 * @param $mdSidenav
 * @constructor
 */
var SideBarController = function($scope, $mdSidenav) {

    console.log('Executing SideBarController');

    var controller = this;

    var sideNavName = 'sideNav';

    // Hide the side bar when the state change occurs (and the sideBar is open).
    var unSubStateChangeSuccess = $scope.$on('$stateChangeSuccess', function() {
        var sideNav = $mdSidenav(sideNavName);

        if (!sideNav.isLockedOpen() && sideNav.isOpen()) {
            sideNav.close();
        }

    });

    // Clean up subscriptions.
    $scope.$on('$destroy', function() {
        unSubStateChangeSuccess();
    });

};

angular.module('bowling.core')
    .controller('SideBarController', ['$scope', '$mdSidenav', SideBarController]);