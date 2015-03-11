/**
 * Controller responsible for listing all of the leagues that are in the database that can be written to by the
 * currently logged in user.
 */

var LeaguesController = function(LeagueService) {
    var controller = this;

    LeagueService.getAll().then(function(leagues) {
        console.log('Received leagues', leagues);
        controller.leagues = leagues;
    });
};

angular.module('bowling.entry.core')
    .controller('LeaguesController', ['LeagueService', LeaguesController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_leagues', {
            url: '/entry/leagues',
            templateUrl: 'partials/entry/leagues/list.html',
            title: 'League List',
            controller: 'LeaguesController',
            controllerAs: 'leagueController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }]
            }
        });

    }]);
