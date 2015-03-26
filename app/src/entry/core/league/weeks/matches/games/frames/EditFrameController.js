/**
 * Controller responsible for editing a specific frame in a specific game.
 */
var EditFrameController = function($state, $stateParams, league, week, match) {

    var controller = this;

    controller.scoreSheet = match;
    controller.frameNumber = $stateParams.frameId;
    controller.gameNumber = $stateParams.gameId;

    controller.submit = function() {

        match.patch(match).then(function() {
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditFrameController', ['$state', '$stateParams', 'league', 'week', 'match', EditFrameController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match.game.frame', {
            url: '/:frameId/',
            templateUrl: 'partials/entry/leagues/weeks/matches/games/frames/frame.html',
            title: 'Frame Details',
            controller: 'EditFrameController',
            controllerAs: 'frameController'
        });

    }]);