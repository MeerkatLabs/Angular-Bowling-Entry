/**
 * Created by rerobins on 2/24/15.
 */
var EditBowlerController = function($stateParams, $state, BowlerService, league, team, bowler) {

    console.log('bowler', bowler);

    var controller = this;

    controller.substitute = bowler;

    controller.submit = function() {
        console.log('Editing new substitute');

        BowlerService.save(bowler).then(function() {
            $state.go('bowling_entry_team_detail', {leagueId: league.id, teamId: team.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditBowlerController', ['$stateParams', '$state', 'BowlerService', 'league', 'team', 'bowler', EditBowlerController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_edit_bowler', {
            url: '/entry/leagues/:leagueId/:teamId/:bowlerId',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Edit Bowler',
            controller: 'EditBowlerController',
            controllerAs: 'subController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    console.log('Resolving league');
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                team: ['$stateParams', 'TeamService', 'league', function($stateParams, league) {
                    return TeamService.getTeam($stateParams.teamId);
                }],
                bowler: ['$stateParams', 'team', function($stateParams, team) {
                    console.log('Resolving bowler');
                    console.log('Getting Sub: ', $stateParams.bowlerId);
                    console.log('From Team: ', team);

                    return team.getBowler($stateParams.bowlerId).then(function(sub) {
                        console.log('Retrieved sub: ', sub);
                        return sub;
                    }).catch(function() {
                        console.log('Failed');
                    });
                }]
            }
        });
    }]);