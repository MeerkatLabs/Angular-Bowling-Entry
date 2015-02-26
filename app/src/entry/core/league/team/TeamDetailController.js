/**
 * Team Detail Controller.
 */

var TeamDetailController = function($stateParams, TeamService, league, team) {

    var controller = this;

    controller.league = league;

    controller.team = team;

    team.getBowlers().then(function(bowlers) {
        controller.bowlers = bowlers;
    });

};

angular.module('bowling.entry.core')
    .controller('TeamDetailController', ['$stateParams', 'TeamService', 'league', 'team', TeamDetailController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_team_detail', {
            url: '/entry/leagues/:leagueId/:teamId',
            templateUrl: 'partials/entry/leagues/teams/detail.html',
            title: 'Team Detail',
            controller: 'TeamDetailController',
            controllerAs: 'teamController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {

                    // TODO: Create injectors that will check the current league, and update the league value if
                    // necessary.
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                team: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getTeam($stateParams.teamId);
                }]
            }
        });
    }]);
