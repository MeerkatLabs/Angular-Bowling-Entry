/**
 * Controller for base league views.
 */

var LeagueBaseController = function(league) {

    var controller = this;

    controller.league = league;

};

angular.module('bowling.entry.core')
    .controller('LeagueBaseController', ['league', LeagueBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league', {
            url: 'league/:leagueId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/base.html',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                // Knowingly requesting the user be required for this resolve even though it is not used.  Forces
                // serialization of the two method calls so that the token is not requested twice.
                league: ['$stateParams', 'LeagueService', 'user', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }]
            },
            controller: 'LeagueBaseController',
            controllerAs: 'leagueBase'
        });

    }]);
