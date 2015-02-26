/**
 * Created by rerobins on 2/24/15.
 */
var EditSubstituteController = function($state, SubstituteService, league, substitute) {

    console.log('substitute', substitute);

    var controller = this;

    controller.substitute = substitute;

    controller.submit = function() {
        console.log('Editing new substitute');

        SubstituteService.editSubstitute(substitute).then(function() {
            $state.go('bowling_entry_league_details', {leagueId: league.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditSubstituteController', ['$state', 'SubstituteService', 'league', 'substitute', EditSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling_entry_edit_sub', {
            url: '/entry/leagues/:leagueId/editSub/:subId',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Edit Substitute',
            controller: 'EditSubstituteController',
            controllerAs: 'subController',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }],
                substitute: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getSubstitute($stateParams.subId);
                }]
            }
        });
    }]);