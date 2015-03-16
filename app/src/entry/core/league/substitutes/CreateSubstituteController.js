/**
 * Controller responsible for the creation of a new league substitute.
 */
var CreateSubstituteController = function($state, league) {

    var controller = this;

    controller.substitute = {
        name: 'Bowler Name',
        handicap: 50
    };

    controller.submit = function() {
        league.createSubstitute(controller.substitute).then(function() {
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateSubstituteController', ['$state', 'league', CreateSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.createSub', {
            url: '/createSub',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Create Substitute',
            controller: 'CreateSubstituteController',
            controllerAs: 'subController'
        });
    }]);