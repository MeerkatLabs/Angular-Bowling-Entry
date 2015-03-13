/**
 * Controller responsible for the creation of a new league substitute.
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
            $state.go('^.details');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateSubstituteController', ['$stateParams', '$state', 'SubstituteService', 'league', CreateSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.createSub', {
            url: '/createSub',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Create Substitute',
            controller: 'CreateSubstituteController',
            controllerAs: 'subController'
        });
    }]);