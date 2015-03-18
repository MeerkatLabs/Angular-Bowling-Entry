/**
 * Game Base controller
 */
var GameBaseController = function(match) {
    var controller = this;
    controller.match = match;
};

angular.module('bowling.entry.core')
    .controller('GameBaseController', ['match', GameBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.game', {
            url: '/:gameId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/weeks/matches/games/base.html',
            controller: 'GameBaseController',
            controllerAs: 'gameBase'
        });

    }]);
