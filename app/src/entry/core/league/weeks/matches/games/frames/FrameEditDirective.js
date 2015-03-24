/**
 * Directive factory that creates a rendering implementation for the editing of frames.
 */
var FrameEditDirectiveFactory = function() {

    var handlersFor1Through9 = function($scope) {

        console.log('Applying handlers');

        var frame = $scope.frame;

        $scope.throwBall = function(count) {
            if (!$scope.isThrowDisabled(count)) {
                frame.throws.push({ type: 'T', value: count});
            }
        };

        $scope.clearThrows = function() {
            frame.throws.splice(0, frame.throws.length);
        };

        $scope.deleteThrow = function() {
            if (frame.throws.length) {
                frame.throws.pop();
            }
        };

        $scope.isThrowDisabled = function(count) {
            if (frame.throws.length == 2) {
                return true;
            } else if (frame.throws.length === 1 && frame.throws[0].value === 10) {
                return true;
            } else if (frame.throws.length === 0) {
                return false;
            } else {
                return count > 10 - frame.throws[0].value;
            }
        };

        $scope.remainderLabel = function() {
            if (frame.throws.length) {
                return '/';
            }

            return 'X';
        };

        $scope.remainder = function() {
            if (frame.throws.length === 0) {
                frame.throws.push({ type: 'T', value: 10});
            } else {
                frame.throws.push({ type: 'T', value: 10 - frame.throws[0].value});
            }
        };

        $scope.isRemainderDisabled = function() {
            if (frame.throws.length === 2) {
                return true;
            } else if (frame.throws.length && frame.throws[0].value === 10) {
                return true;
            }

            return false;
        };

        $scope.isSplitDisabled = function() {
            if (frame.throws.length === 1) {
                return frame.throws[0].value === 10;
            }

            return true;
        };
    };

    var handlersFor10 = function($scope) {

        console.log('Applying handlers');

        var frame = $scope.frame;

        var isFirstBall = null;
        var canThrow = null;

        var calculateHelpers = function() {
            var result = frame.throws.length === 0;

            if (frame.throws.length == 1 && frame.throws[0].value == 10) {
                result = true;
            } else if (frame.throws.length == 2 && (
                (frame.throws[0].value == 10 && frame.throws[1].value == 10) ||
                (frame.throws[0].value < 10 && frame.throws[0].value + frame.throws[1].value == 10))) {
                result = true;
            }
            isFirstBall = result;


            result = frame.throws.length < 2;

            if (frame.throws.length == 1) {
                result = true;
            } else if (frame.throws.length == 2) {
                result = frame.throws[0].value == 10 || (frame.throws[0].value + frame.throws[1].value == 10);
            }

            canThrow = result;
        };

        $scope.isThrowDisabled = function(count) {

            calculateHelpers();

            if (isFirstBall) {
                return false;
            } else if (canThrow) {
                return count > 10 - frame.throws[frame.throws.length - 1].value;
            }

            return true;
        };

        $scope.remainderLabel = function() {

            calculateHelpers();

            if (isFirstBall) {
                return 'X';
            }

            return '/';
        };

        $scope.remainder = function() {

            calculateHelpers();

            if (canThrow) {
                if (isFirstBall) {
                    frame.throws.push({ type: 'T', value: 10});
                } else {
                    frame.throws.push({ type: 'T', value: 10 - frame.throws[frame.throws.length-1].value});
                }
            }

        };

        $scope.isRemainderDisabled = function() {
            calculateHelpers();
            return !canThrow;
        };

        $scope.isSplitDisabled = function() {
            return (canThrow && isFirstBall) || !canThrow;
        };
    };

    return {
        scope: {
            bowler: '=',
            frameNumber: '&',
            gameNumber: '&'
        },
        templateUrl: 'partials/entry/leagues/weeks/matches/games/frames/frameEdit.html',
        link: function($scope, elem, attr) {

            console.log('Calling Frame Editor Parent');

            // See if the bowler has a frame that can be modified.
            var game = $scope.bowler.games[$scope.gameNumber()-1];

            var editFrame = null;

            var frameNumber = parseInt($scope.frameNumber());

            game.frames.forEach(function(frame) {
                if (frame.frame_number == frameNumber) {
                    editFrame = frame;
                }
            });

            if (editFrame === null) {
                editFrame = {
                    frame_number: frameNumber,
                    throws: []
                };
                game.frames.push(editFrame);
            }

            $scope.frame = editFrame;

            console.log('Calling Frame Editor Input');
            handlersFor1Through9($scope);
            if (frameNumber === 10) {
                handlersFor10($scope);
            }
        }
    };
};

angular.module('bowling.entry.core')
    .directive('frameEdit', [FrameEditDirectiveFactory]);