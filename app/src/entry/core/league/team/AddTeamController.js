/**
 * Created by rerobins on 2/25/15.
 */
var AddTeamController = function($state, TeamService, league) {

    var controller = this;

    controller.team = {
        name: ''
    };

    controller.submit = function() {
        TeamService.createTeam(controller.team, league).then(function(savedObject) {
            $state.go('^.team.detail', {teamId: savedObject.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('AddTeamController', ['$state', 'TeamService', 'league', AddTeamController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.addTeam', {
            url: '/addTeam',
            templateUrl: 'partials/entry/leagues/teams/add.html',
            title: 'Add Team',
            controller: 'AddTeamController',
            controllerAs: 'addController'
        });
    }]);