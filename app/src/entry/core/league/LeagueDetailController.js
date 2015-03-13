/**
 * Controller that will provide the entry point to the league details.
 * @param league
 * @constructor
 */
var LeagueDetailController = function(league) {
    var controller = this;

    controller.league = league;

    league.getSubstitutes().then(function(subs) {
        controller.substitutes = subs;
    });

};

angular.module('bowling.entry.core')
    .controller('LeagueDetailController', ['league', LeagueDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league', {
            url: 'league/:leagueId',
            abstract: true,
            template: '<ui-view/>',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                // Knowingly requesting the user be required for this resolve even though it is not used.  Forces
                // serialization of the two method calls so that the token is not requested twice.
                league: ['$stateParams', 'LeagueService', 'user', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }]
            }
        }).state('bowling.league.detail', {
            url: '/',
            templateUrl: 'partials/entry/leagues/detail.html',
            title: 'League Detail',
            controller: 'LeagueDetailController',
            controllerAs: 'leagueController'
        });

    }]);
