/**
 * Controller responsible for the creation of the match between two teams in a specific week.
 */
var CreateMatchController = function($state, MatchService, league, week) {

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
        MatchService.createMatch(controller.match, week).then(function() {
            //TODO: Goto the match details.
        });
    };
};

angular.module('bowling.entry.core')
    .controller('CreateMatchController', ['$state', 'MatchService', 'league', 'week', CreateMatchController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.createMatch', {
            url: '/createMatch',
            templateUrl: 'partials/entry/leagues/matches/create.html',
            title: 'Create Match',
            controller: 'CreateMatchController',
            controllerAs: 'createController'
        });

    }]);