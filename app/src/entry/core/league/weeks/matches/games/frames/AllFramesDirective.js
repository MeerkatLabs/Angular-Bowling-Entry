/**
 * Directive that will render all of the frames for a specific team in a specific game.
 */
var AllFramesDirectiveFactory = function() {

    return {
        templateUrl: 'partials/entry/leagues/weeks/matches/games/frames/allFrames.html',
        scope: {
            team: '&',
            gameNumber: '&'
        }
    };

};

angular.module('bowling.entry.core')
    .directive('allFrames', [AllFramesDirectiveFactory]);