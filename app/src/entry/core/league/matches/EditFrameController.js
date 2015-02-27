/**
 * Created by rerobins on 2/26/15.
 */
var EditFrameController = function($state, $stateParams, MatchService, league, week, match, scoreSheet) {

    var controller = this;

    controller.scoreSheet = scoreSheet;
    controller.frameNumber = $stateParams.frameId;
    controller.gameNumber = $stateParams.gameId;

    controller.submit = function() {

        MatchService.cleanUpScoresheet(scoreSheet);

        match.one('scoresheet').customPUT(scoreSheet).then(function() {
            $state.go('bowling_entry_league_week_match_game', {
                leagueId: league.id,
                weekId: week.id,
                matchId: match.id,
                gameId: $stateParams.gameId
            });
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditFrameController', ['$state', '$stateParams', 'MatchService', 'league', 'week', 'match', 'scoreSheet', EditFrameController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_week_match_game_frame', {
            url: '/entry/league/:leagueId/week/:weekId/match/:matchId/game/:gameId/:frameId/',
            templateUrl: 'partials/entry/leagues/matches/games/frames/frame.html',
            title: 'Frame Details',
            controller: 'EditFrameController',
            controllerAs: 'frameController',
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