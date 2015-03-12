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
            $state.go('^.^.details');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditSubstituteController', ['$state', 'SubstituteService', 'league', 'substitute', EditSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.sub', {
                url: '/sub/:subId',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    substitute: ['$stateParams', 'league', function($stateParams, league) {
                        return league.getSubstitute($stateParams.subId);
                    }]
                }
            }).state('bowling.league.sub.edit', {
                url: '/edit',
                templateUrl: 'partials/entry/leagues/substitutes/create.html',
                title: 'Edit Substitute',
                controller: 'EditSubstituteController',
                controllerAs: 'subController'
            });
    }]);