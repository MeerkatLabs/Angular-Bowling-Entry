/**
 * Controller that shows the details of a match and allows for the user to select which bowlers to override for the
 * game.
 */
var ScoresheetController = function(league, week, scoreSheet) {

    console.log('Scoresheet', scoreSheet);

    var controller = this;
    controller.scoreSheet = scoreSheet;
    controller.league = league;
    controller.week = week;
    controller.match = scoreSheet;

};

angular.module('bowling.entry.core')
    .controller('ScoresheetController', ['league', 'week', 'scoreSheet', ScoresheetController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_week_match_scoresheet', {
            url: '/entry/league/:leagueId/week/:weekId/match/:matchId/scoresheet',
            templateUrl: 'partials/entry/leagues/matches/scoresheet.html',
            title: 'Score Sheet',
            controller: 'ScoresheetController',
            controllerAs: 'scoreController',
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
                scoreSheet: ['$stateParams', 'week', function($stateParams, week) {
                    return week.getMatch($stateParams.matchId).then(function(match) {
                        return match.getScoreSheet();
                    });
                }]
            }
        });

    }]);