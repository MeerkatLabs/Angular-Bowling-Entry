/**
 * Controller responsible for displaying the scoresheet data of a specific game.
 */
var GameDetailController = function($stateParams, league, week, match, scoreSheet) {

    console.log('Game Details', scoreSheet);

    var controller = this;
    controller.scoreSheet = scoreSheet;
    controller.league = league;
    controller.week = week;
    controller.match = scoreSheet;

    controller.gameNumber = $stateParams.gameId;

};

angular.module('bowling.entry.core')
    .controller('GameDetailController', ['$stateParams', 'league', 'week', 'match', 'scoreSheet', GameDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.game', {
                url: '/:gameId',
                abstract: true,
                template: '<ui-view/>'
            }).state('bowling.league.week.match.game.detail', {
                url: '/',
                templateUrl: 'partials/entry/leagues/weeks/matches/games/detail.html',
                title: 'Game Details',
                controller: 'GameDetailController',
                controllerAs: 'gameController'
            });

    }]);