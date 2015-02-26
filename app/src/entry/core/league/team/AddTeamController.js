/**
 * Created by rerobins on 2/25/15.
 */
var AddTeamController = function($state, TeamService, league) {

    var controller = this;

    controller.team = {
        name: ''
    };

    controller.submit = function() {
        TeamService.createTeam(controller.team, league).then(function(savedObject) {
            $state.go('bowling_entry_team_detail', {leagueId: league.id, teamId: savedObject.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('AddTeamController', ['$state', 'TeamService', 'league', AddTeamController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_add_team', {
            url: '/entry/leagues/:leagueId/addTeam',
            templateUrl: 'partials/entry/leagues/teams/add.html',
            title: 'Add Team',
            controller: 'AddTeamController',
            controllerAs: 'addController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {

                    // TODO: Create injectors that will check the current league, and update the league value if
                    // necessary.
                    return LeagueService.getLeague($stateParams.leagueId);
                }]
            }
        });
    }]);