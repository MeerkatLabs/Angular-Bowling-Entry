/**
 * Controller responsible for the creation of a new bowler on a team.
 */
var CreateBowlerController = function($state, BowlerService, team) {

    var controller = this;

    controller.bowler = {
        name: '',
        handicap: null
    };

    controller.submit = function() {
        BowlerService.createBowler(team, controller.bowler).then(function() {
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateBowlerController', ['$state', 'BowlerService', 'team', CreateBowlerController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.team.createBowler', {
            url: '/createBowler',
            templateUrl: 'partials/entry/leagues/teams/bowler/create.html',
            title: 'Create Bowler',
            controller: 'CreateBowlerController',
            controllerAs: 'bowlerController'
        });
    }]);