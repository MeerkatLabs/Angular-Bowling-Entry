/**
 * Created by rerobins on 2/26/15.
 */
var EditFrameController = function($state, $stateParams, MatchService, league, week, match, scoreSheet) {

    var controller = this;

    controller.scoreSheet = scoreSheet;
    controller.frameNumber = $stateParams.frameId;
    controller.gameNumber = $stateParams.gameId;

    controller.submit = function() {

        MatchService.cleanUpScoresheet(scoreSheet);

        match.one('scoresheet').customPUT(scoreSheet).then(function() {
            $state.go('^');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditFrameController', ['$state', '$stateParams', 'MatchService', 'league', 'week', 'match', 'scoreSheet', EditFrameController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.game.frame', {
            url: '/:frameId/',
            templateUrl: 'partials/entry/leagues/matches/games/frames/frame.html',
            title: 'Frame Details',
            controller: 'EditFrameController',
            controllerAs: 'frameController'
        });

    }]);