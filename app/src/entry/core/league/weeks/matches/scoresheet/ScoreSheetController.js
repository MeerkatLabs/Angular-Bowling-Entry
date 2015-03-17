/**
 * Controller that shows the details of a match and allows for the user to select which bowlers to override for the
 * game.
 */
var ScoresheetController = function($state, league, week, match, scoreSheet) {

    console.log('Scoresheet', scoreSheet);

    var controller = this;
    controller.scoreSheet = scoreSheet;
    controller.league = league;
    controller.week = week;
    controller.match = scoreSheet;

    controller.gameLabels = [];
    for (var i = 0; i < league.numberOfGames; ++i) {
        controller.gameLabels.push(i+1);
    }

    controller.submit = function() {
        match.one('scoresheet').customPUT(scoreSheet);
    };

    controller.viewGame = function(gameId) {
        $state.go('.game.detail', {gameId: gameId});
    };

};

angular.module('bowling.entry.core')
    .controller('ScoresheetController', ['$state', 'league', 'week', 'match', 'scoreSheet', ScoresheetController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match', {
                url: '/:matchId',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    match: ['$stateParams', 'week', function($stateParams, week) {
                        return week.getMatch($stateParams.matchId);
                    }],
                    scoreSheet: ['match', function(match) {
                        return match.getScoreSheet();
                    }]
                }
            }).state('bowling.league.week.match.scoresheet', {
                url: '/scoresheet',
                templateUrl: 'partials/entry/leagues/weeks/matches/scoresheet/scoresheet.html',
                title: 'Score Sheet',
                controller: 'ScoresheetController',
                controllerAs: 'scoreController'
            });

    }]);