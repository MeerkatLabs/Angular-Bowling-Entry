/**
 * Created by rerobins on 2/24/15.
 */
var WeekDetailController = function(league, week) {

    var controller = this;
    controller.week = week;
    controller.league = league;

    week.getMatches().then(function(matches) {
        controller.matches = matches;
    });

};

angular.module('bowling.entry.core')
    .controller('WeekDetailController', ['league', 'week', WeekDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_week_details', {
            url: '/entry/league/:leagueId/week/:weekId',
            templateUrl: 'partials/entry/leagues/weeks/detail.html',
            title: 'Week Detail',
            controller: 'WeekDetailController',
            controllerAs: 'weekController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                week: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getWeek($stateParams.weekId);
                }]
            }
        });

    }]);