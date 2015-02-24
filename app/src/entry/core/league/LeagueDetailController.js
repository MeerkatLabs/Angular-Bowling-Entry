/**
 * Controller that will provide the entry point to the league details.
 * @param $stateParams
 * @param LeagueService
 * @constructor
 */
var LeagueDetailController = function($stateParams, LeagueService) {
    var leagueId = $stateParams.leagueId;

    var controller = this;

    LeagueService.getLeague(leagueId).then(function(league) {
        controller.league = league;
    });
};

angular.module('bowling.entry.core')
    .controller('LeagueDetailController', ['$stateParams', 'LeagueService', LeagueDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_details', {
            url: '/entry/league/:leagueId/',
            templateUrl: 'partials/entry/leagues/detail.html',
            title: 'League Detail',
            controller: 'LeagueDetailController',
            controllerAs: 'leagueController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }]
            }
        });

    }]);
