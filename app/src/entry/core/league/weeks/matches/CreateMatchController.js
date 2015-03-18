/**
 * Controller responsible for the creation of the match between two teams in a specific week.
 */
var CreateMatchController = function($state, league, week) {

    var controller = this;

    controller.teams = league.teams;

    controller.match = {
        team1: {

        }, team2: {

        }
    };

    /**
     * Submit the form.
     */
    controller.submit = function() {
        console.log('controller.match', controller.match);
        week.createMatch(controller.match).then(function(match) {
            $state.go('^.match.detail', {matchId: match.id});
        });
    };
};

angular.module('bowling.entry.core')
    .controller('CreateMatchController', ['$state', 'league', 'week', CreateMatchController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.createMatch', {
            url: '/createMatch',
            templateUrl: 'partials/entry/leagues/weeks/matches/create.html',
            title: 'Create Match',
            controller: 'CreateMatchController',
            controllerAs: 'createController'
        });

    }]);