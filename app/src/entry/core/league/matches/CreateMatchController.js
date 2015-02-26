/**
 * Created by rerobins on 2/25/15.
 */
var CreateMatchController = function($state, MatchService, league, week) {

    var controller = this;

    controller.teams = league.teams;

    controller.match = {
        team1: {

        }, team2: {

        }
    };

    /**
     * Submit the form.
     */
    controller.submit = function() {
        console.log('controller.match', controller.match);
        MatchService.createMatch(controller.match, week).then(function() {
            //TODO: Goto the match details.
        });
    };
};

angular.module('bowling.entry.core')
    .controller('CreateMatchController', ['$state', 'MatchService', 'league', 'week', CreateMatchController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_week_create_match', {
            url: '/entry/league/:leagueId/week/:weekId/createMatch',
            templateUrl: 'partials/entry/leagues/matches/create.html',
            title: 'Create Match',
            controller: 'CreateMatchController',
            controllerAs: 'createController',
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