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
        link: function($scope, elem, attr) {

        }

    };

};

angular.module('bowling.entry.core')
    .directive('bowlingFrame', [BowlingFrameDirectiveFactory]);