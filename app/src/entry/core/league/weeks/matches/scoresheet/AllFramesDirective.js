/**
 * Directive that will render all of the frames for a specific team in a specific game.
 */
var AllFramesDirectiveFactory = function() {

    return {
        templateUrl: 'partials/entry/leagues/weeks/matches/games/allFrames.html',
        scope: {
            team: '&',
            gameNumber: '&'
        },
        link: function($scope, elem, attr) {

        }
    };

};

angular.module('bowling.entry.core')
    .directive('allFrames', [AllFramesDirectiveFactory]);