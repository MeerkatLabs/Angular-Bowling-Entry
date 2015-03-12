/**
 * Controller responsible for the creation of a new bowler on a team.
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
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateBowlerController', ['$stateParams', '$state', 'BowlerService', 'league', 'team', CreateBowlerController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.team.createBowler', {
            url: '/createBowler',
            templateUrl: 'partials/entry/leagues/substitutes/create.html',
            title: 'Create Bowler',
            controller: 'CreateBowlerController',
            controllerAs: 'subController'
        });
    }]);