/**
 * Created by rerobins on 2/24/15.
 */
var CreateBowlerController = function($stateParams, $state, BowlerService, league, team) {

    var controller = this;

    controller.substitute = {
        name: '',
        handicap: null
    };

    controller.submit = function() {
        console.log('Creating new bowler');

        BowlerService.createBowler(team, controller.substitute).then(function() {
            $state.go('bowling_entry_team_detail', {leagueId: league.id, teamId: team.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateBowlerController', ['$stateParams', '$state', 'BowlerService', 'league', 'team', CreateBowlerController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_create_bowler', {
            url: '/entry/leagues/:leagueId/:teamId/createBowler',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Create Bowler',
            controller: 'CreateBowlerController',
            controllerAs: 'subController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                team: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getTeam($stateParams.teamId);
                }]
            }
        });
    }]);