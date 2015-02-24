/**
 * Controller responsible for listing all of the leagues that are in the database that can be written to by the
 * currently logged in user.
 */

var LeaguesController = function(BowlingEntryLeague) {
    var controller = this;

    controller.leagues = BowlingEntryLeague.query();
};

angular.module('bowling.entry.league')
    .controller('LeaguesController', ['BowlingEntryLeague', LeaguesController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_leagues', {
            url: '/entry/leagues',
            templateUrl: 'partials/entry/leagues/list.html',
            title: 'League List',
            controller: 'LeaguesController',
            controllerAs: 'leagues',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }]
            }
        });

    }]);
