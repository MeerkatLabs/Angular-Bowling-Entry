/**
 * Controller that defines all of the weeks in the league.
 */
var EditWeeksController = function($state, league) {

    var controller = this;

    controller.weeks = league.weeks;

    controller.submit = function() {
        league.editWeeks(controller.weeks).then(function() {
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditWeeksController', ['$state', 'league', EditWeeksController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.editWeeks', {
            url: '/editWeeks',
            templateUrl: 'partials/entry/leagues/weeks/edit.html',
            title: 'Edit All Weeks',
            controller: 'EditWeeksController',
            controllerAs: 'edit'
        });

    }]);