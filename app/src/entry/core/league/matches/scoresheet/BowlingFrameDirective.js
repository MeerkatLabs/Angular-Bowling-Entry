/**
 * Directive factory that will display a specific frame.
 */
var BowlingFrameDirectiveFactory = function() {

    return {
        templateUrl: 'partials/entry/leagues/matches/games/frame.html',
        scope: {
            bowler: '&',
            frameNumber: '&',
            gameNumber: '&'
        },
        link: function($scope, elem, attr) {
            //console.log('Bowling Frame', $scope.frameNumber());
            //
            //var bowler = $scope.bowler();
            //var game = bowler.game[$scope.gameNumber];
            //
            //$scope.frame = null;
            //
            //game.frames.forEach(function(frame) {
            //    if (frame.frame_number == $scope.frameNumber) {
            //        $scope.frame = frame;
            //    }
            //});

        }

    };

};

angular.module('bowling.entry.core')
    .directive('bowlingFrame', [BowlingFrameDirectiveFactory]);