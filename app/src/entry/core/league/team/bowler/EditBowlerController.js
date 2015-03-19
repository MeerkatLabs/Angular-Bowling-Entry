/**
 * Controller responsible for editing a bowlers details.
 */
var EditBowlerController = function($state, team, bowler) {

    var controller = this;

    controller.bowler = bowler;

    controller.submit = function() {
        console.log('Editing bowler');

        bowler.put().then(function() {
            $state.go('^.^.detail');
        });
    };

    controller.makeBowlerSub = function() {
        team.moveBowlerToSubstitute(bowler).then(function() {
            $state.go('^.^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditBowlerController', ['$state', 'team', 'bowler', EditBowlerController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.team.bowler.edit', {
                url: '/edit',
                templateUrl: 'partials/entry/leagues/teams/bowler/edit.html',
                title: 'Edit Bowler',
                controller: 'EditBowlerController',
                controllerAs: 'editController'
            });
    }]);