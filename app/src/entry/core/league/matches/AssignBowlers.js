/**
 * Created by rerobins on 2/26/15.
 */
var AssignBowlersController = function($state, $stateParams, MatchService, league, week, match, team, teamDefinition, leagueSubstitutes) {
    var controller = this;

    var availableBowlersArray = teamDefinition.bowlers.concat(leagueSubstitutes);
    var availableBowlers = {};

    availableBowlersArray.forEach(function(bowler) {
        availableBowlers[bowler.id] = bowler;
    });

    controller.availableBowlers = availableBowlers;
    controller.availableBowlersArray = availableBowlersArray;

    controller.currentBowlers = [];
    team.bowlers.forEach(function(bowler) {

        var bowlerModel = controller.availableBowlers[bowler.definition];

        controller.currentBowlers.push({id: bowler.id, val: bowlerModel, type: bowler.type});

    });

    controller.team = team;

    controller.submit = function() {
        var configuration = {
            teamNumber: $stateParams.teamId,
            bowlers: controller.currentBowlers
        };

        MatchService.assignBowlers(configuration, match).then(function() {
            $state.go('bowling_entry_league_week_match_scoresheet', {
                leagueId: league.id,
                matchId: match.id,
                weekId: week.id
            });
        });
    };

};

angular.module('bowling.entry.core')
    .controller('AssignBowlersController', ['$state', '$stateParams', 'MatchService', 'league', 'week', 'match', 'team', 'teamDefinition', 'leagueSubstitutes',
                AssignBowlersController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_league_week_match_assign_bowlers', {
            url: '/entry/league/:leagueId/week/:weekId/match/:matchId/assign/:teamId',
            templateUrl: 'partials/entry/leagues/matches/assignBowlers.html',
            title: 'Assign Bowlers',
            controller: 'AssignBowlersController',
            controllerAs: 'assignBowlers',
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
                team: ['$stateParams', 'match', function($stateParams, match) {
                    if ($stateParams.teamId == 1) {
                        return match.team1;
                    } else {
                        return match.team2;
                    }
                }],
                teamDefinition: ['team', 'league', function(team, league) {
                    return league.getTeam(team.definition_id);
                }],
                leagueSubstitutes: ['league', function(league) {
                    return league.getSubstitutes();
                }]
            }
        });
    }]);