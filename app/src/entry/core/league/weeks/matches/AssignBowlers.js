/**
 * Controller that will assign bowlers to a specific match.
 */
var AssignBowlersController = function($state, $stateParams, league, week, match, team, teamDefinition, leagueSubstitutes) {
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

        match.assignBowlers(configuration).then(function() {
            // update the scoresheet object with the new bowlers
            var teamBowlerIndex = 0;
            controller.currentBowlers.forEach(function(bowlerData) {

                team.bowlers[teamBowlerIndex].definition = bowlerData.val.id;
                team.bowlers[teamBowlerIndex].name = bowlerData.val.name;
                team.bowlers[teamBowlerIndex].type = bowlerData.type;
                team.bowlers[teamBowlerIndex].handicap = bowlerData.handicap;
                team.bowlers[teamBowlerIndex].average = bowlerData.average;

                teamBowlerIndex++;
            });


            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('AssignBowlersController', ['$state', '$stateParams', 'league', 'week', 'match', 'team', 'teamDefinition', 'leagueSubstitutes',
                AssignBowlersController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.assignBowlers', {
            url: '/assign/:teamId',
            templateUrl: 'partials/entry/leagues/weeks/matches/assignBowlers.html',
            title: 'Assign Bowlers',
            controller: 'AssignBowlersController',
            controllerAs: 'assignBowlers',
            resolve: {
                team: ['$stateParams', 'match', function($stateParams, match) {
                    if ($stateParams.teamId == 1) {
                        return match.team1;
                    } else {
                        return match.team2;
                    }
                }],
                teamDefinition: ['team', 'league', function(team, league) {
                    return league.getTeam(team.id);
                }],
                leagueSubstitutes: ['league', function(league) {
                    return league.getSubstitutes();
                }]
            }
        });

    }]);