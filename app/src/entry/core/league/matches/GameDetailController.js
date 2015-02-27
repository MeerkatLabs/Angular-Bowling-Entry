/**
 * Created by rerobins on 2/26/15.
 */
var GameDetailController = function($stateParams, league, week, match, scoreSheet) {

    console.log('Game Details', scoreSheet);

    var controller = this;
    controller.scoreSheet = scoreSheet;
    controller.league = league;
    controller.week = week;
    controller.match = scoreSheet;

    controller.gameNumber = $stateParams.gameId;

};

angular.module('bowling.entry.core')
    .controller('GameDetailController', ['$stateParams', 'league', 'week', 'match', 'scoreSheet', GameDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_week_match_game', {
            url: '/entry/league/:leagueId/week/:weekId/match/:matchId/game/:gameId/',
            templateUrl: 'partials/entry/leagues/matches/games/detail.html',
            title: 'Game Details',
            controller: 'GameDetailController',
            controllerAs: 'gameController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                week: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getWeek($stateParams.weekId);
                }],
                match: ['$stateParams', 'week', function($stateParams, week) {
                    return week.getMatch($stateParams.matchId);
                }],
                scoreSheet: ['match', function(match) {
                    return match.getScoreSheet();
                }]
            }
        });

    }]);