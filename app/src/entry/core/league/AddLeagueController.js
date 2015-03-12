/**
 * Provide a form that will add a new league to the database.  Upon successful saving of the new league, the page will
 * redirect to the details of the league that was just generated.
 */
var AddLeagueController = function($state, LeagueService) {

    var controller = this;

    controller.league = {
        name: 'League Name',
        startDate: new Date(),
        numberOfWeeks: 10,
        numberOfGames: 3,
        playersPerTeam: 4,
        pointsPerGame: 2,
        pointsForTotals: 2,
        handicapMax: 210,
        handicapPercentage: 90
    };

    controller.submit = function() {
        LeagueService.createLeague(controller.league).then(function(savedObject) {
            $state.go('^.league.details', {leagueId: savedObject.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('AddLeagueController', ['$state', 'LeagueService', AddLeagueController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.createLeague', {
            url: 'addLeague',
            templateUrl: 'partials/entry/leagues/add.html',
            title: 'Add League',
            controller: 'AddLeagueController',
            controllerAs: 'addController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }]
            }
        });

    }]);