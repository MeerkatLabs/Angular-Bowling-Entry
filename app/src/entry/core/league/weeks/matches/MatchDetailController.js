/**
 * Controller that shows the details of a match and allows for the user to select which bowlers to override for the
 * game.
 */
var MatchDetailController = function($state, league, week, match) {

    var controller = this;
    controller.scoreSheet = match;
    controller.league = league;
    controller.week = week;

    controller.gameLabels = [];
    for (var i = 0; i < league.numberOfGames; ++i) {
        controller.gameLabels.push(i+1);
    }

    controller.submit = function() {
        match.patch(match);
    };

    controller.viewGame = function(gameId) {
        $state.go('^.game.detail', {gameId: gameId});
    };

};

angular.module('bowling.entry.core')
    .controller('MatchDetailController', ['$state', 'league', 'week', 'match', MatchDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.detail', {
                url: '/scoresheet',
                templateUrl: 'partials/entry/leagues/weeks/matches/detail.html',
                title: 'Score Sheet',
                controller: 'ScoresheetController',
                controllerAs: 'scoreController'
            });

    }]);