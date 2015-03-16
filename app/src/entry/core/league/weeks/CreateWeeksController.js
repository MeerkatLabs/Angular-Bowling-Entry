/**
 * Controller that defines all of the weeks in the league.
 */
var CreateWeeksController = function($state, league) {

    var controller = this;

    controller.weeks = [];

    console.log(league.startDate);

    var date = new Date(league.startDate);

    for (var weekNumber = 1; weekNumber <= league.numberOfWeeks; ++weekNumber) {
        controller.weeks.push({
            weekNumber: weekNumber,
            date: new Date(date.getTime())
        });

        date.setDate(date.getDate() + 7);
    }

    controller.submit = function() {
        league.createWeeks(controller.weeks).then(function() {
            $state.go('^.details');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateWeeksController', ['$state', 'league', CreateWeeksController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.createWeeks', {
            url: '/createWeeks',
            templateUrl: 'partials/entry/leagues/weeks/create.html',
            title: 'Create All Weeks',
            controller: 'CreateWeeksController',
            controllerAs: 'create'
        });

    }]);