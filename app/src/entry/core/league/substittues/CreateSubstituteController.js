/**
 * Created by rerobins on 2/24/15.
 */
var CreateSubstituteController = function($stateParams, $state, SubstituteService, league) {

    var controller = this;

    controller.substitute = {
        name: 'Bowler Name',
        handicap: 50
    };

    controller.submit = function() {
        console.log('Creating new subtitute');

        SubstituteService.createSubstitute({
            name: controller.name,
            handicap: controller.handicap
        }).then(function() {
            $state.go('bowling_entry_league_details', {leagueId: league.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateSubstituteController', ['$stateParams', '$state', 'SubstituteService', 'league', CreateSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_create_sub', {
            url: '/entry/leagues/:leagueId/createSub',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Create Substitute',
            controller: 'CreateSubstituteController',
            controllerAs: 'subController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }]
            }
        });
    }]);