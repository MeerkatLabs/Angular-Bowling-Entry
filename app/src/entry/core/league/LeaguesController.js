/**
 * Controller responsible for listing all of the leagues that are in the database that can be written to by the
 * currently logged in user.
 */
var LeaguesController = function(leagues) {
    var controller = this;

    controller.leagues = leagues;

};

angular.module('bowling.entry.core')
    .controller('LeaguesController', ['leagues', 'user', LeaguesController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.leagues', {
            url: 'leagues',
            templateUrl: 'partials/entry/leagues/list.html',
            title: 'League List',
            controller: 'LeaguesController',
            controllerAs: 'leagueController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                // Knowingly requesting the user be required for this resolve even though it is not used.  Forces
                // serialization of the two method calls so that the token is not requested twice.
                leagues: ['LeagueService', 'user', function(LeagueService) {
                    return LeagueService.getAll();
                }]
            }
        });

    }]);
