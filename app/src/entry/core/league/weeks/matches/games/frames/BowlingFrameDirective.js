/**
 * Directive factory that will display a specific frame.
 */
var BowlingFrameDirectiveFactory = function() {

    return {
        templateUrl: 'partials/entry/leagues/weeks/matches/games/frame.html',
        scope: {
            bowler: '&',
            frameNumber: '&',
            gameNumber: '&'
        },
        link: function($scope) {

            var game = $scope.bowler().games[$scope.gameNumber() - 1];

            var foundFrame = null;
            for (var frameIndex = 0; frameIndex < game.frames.length; ++frameIndex) {
                var myFrame = game.frames[frameIndex];
                if (myFrame.frameNumber == $scope.frameNumber()) {
                    foundFrame = myFrame;
                    break;
                }
            }

            if (foundFrame !== null) {
                $scope.frame = foundFrame;
            }

        }
    };

};

angular.module('bowling.entry.core')
    .directive('bowlingFrame', [BowlingFrameDirectiveFactory]);