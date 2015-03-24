/**
 * Created by rerobins on 3/12/15.
 */
describe('league:matches:games:frames:FrameEditDirective', function() {

    var bowler = null;

    var buildBowler = function() {
        return {
            games: [
                {
                    frames: [
                        {
                            frame_number: 1,
                            throws: []
                        },
                        {
                            frame_number: 2,
                            throws: [
                                {
                                    type: 'T',
                                    value: 5
                                }, {
                                    type: 'T',
                                    value: 4
                                }
                            ]
                        },
                        {
                            frame_number: 10,
                            throws: []
                        }
                    ]
                }
            ]
        };
    };

    var $compile, $rootScope;

    beforeEach(module('karma.templates'));
    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {

        bowler = buildBowler();

        $compile = _$compile_;
        $rootScope = _$rootScope_;

        $rootScope.bowler = bowler;
        $rootScope.gameNumber = 1;
    }));

    it('should select the correct frame and define all of the methods for frame 1', function() {

        $rootScope.frameNumber = 1;

        var element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);

        $rootScope.$digest();

        var scope = element.isolateScope();

        expect(scope.frame).toBeDefined();
        expect(scope.frame.frame_number).toBe($rootScope.frameNumber);

        expect(angular.isArray(scope.frame.throws)).toBeTruthy();
        expect(scope.frame.throws.length).toBe(0);

        // Verify that all of the button handlers are defined in the scope.
        expect(scope.throwBall).toBeDefined();
        expect(scope.clearThrows).toBeDefined();
        expect(scope.deleteThrow).toBeDefined();
        expect(scope.isThrowDisabled).toBeDefined();
        expect(scope.remainderLabel).toBeDefined();
        expect(scope.remainder).toBeDefined();
        expect(scope.isRemainderDisabled).toBeDefined();
        expect(scope.isSplitDisabled).toBeDefined();

        expect(angular.isFunction(scope.throwBall)).toBeTruthy();
        expect(angular.isFunction(scope.clearThrows)).toBeTruthy();
        expect(angular.isFunction(scope.deleteThrow)).toBeTruthy();
        expect(angular.isFunction(scope.isThrowDisabled)).toBeTruthy();
        expect(angular.isFunction(scope.remainderLabel)).toBeTruthy();
        expect(angular.isFunction(scope.remainder)).toBeTruthy();
        expect(angular.isFunction(scope.isRemainderDisabled)).toBeTruthy();
        expect(angular.isFunction(scope.isSplitDisabled)).toBeTruthy();
    });

    it('should load frame 2 (with throws defined) correctly', function() {

        $rootScope.frameNumber = 2;

        var element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);

        $rootScope.$digest();

        var scope = element.isolateScope();

        expect(scope.frame).toBeDefined();
        expect(scope.frame.frame_number).toBe($rootScope.frameNumber);

        expect(angular.isArray(scope.frame.throws)).toBeTruthy();
        expect(scope.frame.throws.length).toBe(2);

    });

    it('should load frame 3 (with no data defined) correctly', function() {

        $rootScope.frameNumber = 3;

        var element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);

        $rootScope.$digest();

        var scope = element.isolateScope();

        expect(scope.frame).toBeDefined();
        expect(scope.frame.frame_number).toBe($rootScope.frameNumber);

        expect(angular.isArray(scope.frame.throws)).toBeTruthy();
        expect(scope.frame.throws.length).toBe(0);

    });

    it('should load frame 10 (with no data defined) correctly', function() {

        $rootScope.frameNumber = 10;

        var element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);

        $rootScope.$digest();

        var scope = element.isolateScope();

        expect(scope.frame).toBeDefined();
        expect(scope.frame.frame_number).toBe($rootScope.frameNumber);

        expect(angular.isArray(scope.frame.throws)).toBeTruthy();
        expect(scope.frame.throws.length).toBe(0);

        // Verify that all of the button handlers are defined in the scope.
        expect(scope.throwBall).toBeDefined();
        expect(scope.clearThrows).toBeDefined();
        expect(scope.deleteThrow).toBeDefined();
        expect(scope.isThrowDisabled).toBeDefined();
        expect(scope.remainderLabel).toBeDefined();
        expect(scope.remainder).toBeDefined();
        expect(scope.isRemainderDisabled).toBeDefined();
        expect(scope.isSplitDisabled).toBeDefined();

        expect(angular.isFunction(scope.throwBall)).toBeTruthy();
        expect(angular.isFunction(scope.clearThrows)).toBeTruthy();
        expect(angular.isFunction(scope.deleteThrow)).toBeTruthy();
        expect(angular.isFunction(scope.isThrowDisabled)).toBeTruthy();
        expect(angular.isFunction(scope.remainderLabel)).toBeTruthy();
        expect(angular.isFunction(scope.remainder)).toBeTruthy();
        expect(angular.isFunction(scope.isRemainderDisabled)).toBeTruthy();
        expect(angular.isFunction(scope.isSplitDisabled)).toBeTruthy();

    });

    describe('empty frame editing', function() {

        var element, scope, frame;

        beforeEach(function() {
            bowler = buildBowler();
            $rootScope.bowler = bowler;
            $rootScope.frameNumber = 1;
            element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);
            $rootScope.$digest();

            scope = element.isolateScope();

            frame = scope.frame;

            expect(frame).toBeDefined();
            expect(frame.throws.length).toBe(0);

        });

        it('should be initialized correctly when empty', function() {

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();

            // Shouldn't be able to mark split yet
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('X');
        });

        it('should handle throws', function() {

            var firstThrow = 5;
            var secondThrow = 4;
            scope.throwBall(firstThrow);

            expect(frame.throws.length).toBe(1);
            expect(frame.throws[0].value).toBe(firstThrow);
            expect(frame.throws[0].type).toBe('T');

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();

            // Should be able to mark split
            expect(scope.isSplitDisabled()).not.toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('/');


            scope.throwBall(secondThrow);
            expect(frame.throws.length).toBe(2);
            expect(frame.throws[0].value).toBe(firstThrow);
            expect(frame.throws[1].value).toBe(secondThrow);

            expect(scope.isThrowDisabled(0)).toBeTruthy();
            expect(scope.isThrowDisabled(1)).toBeTruthy();
            expect(scope.isThrowDisabled(2)).toBeTruthy();
            expect(scope.isThrowDisabled(3)).toBeTruthy();
            expect(scope.isThrowDisabled(4)).toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();

            // Shouldn't be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Shouldn't be able to hit the remainders
            expect(scope.isRemainderDisabled()).toBeTruthy();

        });

        it('should handle strike', function() {

            scope.remainder();

            expect(frame.throws.length).toBe(1);
            expect(frame.throws[0].value).toBe(10);
            expect(frame.throws[0].type).toBe('T');

            expect(scope.isThrowDisabled(0)).toBeTruthy();
            expect(scope.isThrowDisabled(1)).toBeTruthy();
            expect(scope.isThrowDisabled(2)).toBeTruthy();
            expect(scope.isThrowDisabled(3)).toBeTruthy();
            expect(scope.isThrowDisabled(4)).toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();

            // Shouldn't be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Shouldn't be able to hit the remainders
            expect(scope.isRemainderDisabled()).toBeTruthy();

        });

        it('should handle spare', function() {

            scope.throwBall(6);
            scope.remainder();

            expect(frame.throws.length).toBe(2);
            expect(frame.throws[0].value).toBe(6);
            expect(frame.throws[1].value).toBe(4);

            expect(scope.isThrowDisabled(0)).toBeTruthy();
            expect(scope.isThrowDisabled(1)).toBeTruthy();
            expect(scope.isThrowDisabled(2)).toBeTruthy();
            expect(scope.isThrowDisabled(3)).toBeTruthy();
            expect(scope.isThrowDisabled(4)).toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();

            // Shouldn't be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Shouldn't be able to hit the remainders
            expect(scope.isRemainderDisabled()).toBeTruthy();

        });

        it('should handle delete', function() {

            scope.throwBall(6);
            scope.remainder();

            scope.deleteThrow();

            expect(frame.throws.length).toBe(1);
            expect(frame.throws[0].value).toBe(6);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();

            // Should be able to mark split
            expect(scope.isSplitDisabled()).not.toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('/');

            scope.deleteThrow();

            expect(frame.throws.length).toBe(0);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();

            // Should be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('X');

        });

        it('should handle clear', function() {

            scope.throwBall(6);
            scope.clearThrows();

            expect(frame.throws.length).toBe(0);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();

            // Should be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('X');

            scope.throwBall(6);
            scope.remainder();

            scope.clearThrows();

            expect(frame.throws.length).toBe(0);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();

            // Should be able to mark split
            expect(scope.isSplitDisabled()).toBeTruthy();

            // Should be able to hit the remainders
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            // Remainder label should be Strike
            expect(scope.remainderLabel()).toBe('X');

        });

    });

    describe('empty frame editing 10th Frame', function() {

        var element, scope, frame;

        beforeEach(function () {
            bowler = buildBowler();
            $rootScope.bowler = bowler;
            $rootScope.frameNumber = 10;
            element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);
            $rootScope.$digest();

            scope = element.isolateScope();

            frame = scope.frame;

            expect(frame).toBeDefined();
            expect(frame.throws.length).toBe(0);

        });

        it('should not allow the bonus ball if at least a strike is not received', function() {

            scope.throwBall(1);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            scope.throwBall(1);

            expect(scope.isThrowDisabled(0)).toBeTruthy();
            expect(scope.isThrowDisabled(1)).toBeTruthy();
            expect(scope.isThrowDisabled(2)).toBeTruthy();
            expect(scope.isThrowDisabled(3)).toBeTruthy();
            expect(scope.isThrowDisabled(4)).toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();
            expect(scope.isRemainderDisabled()).toBeTruthy();

        });

        it('should allow the bonus ball to be thrown for a spare', function() {

            scope.throwBall(1);
            expect(scope.remainderLabel()).toBe('/');

            scope.throwBall(9);

            expect(scope.frame.throws.length).toBe(2);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();
            expect(scope.isRemainderDisabled()).not.toBeTruthy();

            scope.remainder();

            expect(scope.frame.throws[0].value).toBe(1);
            expect(scope.frame.throws[1].value).toBe(9);
            expect(scope.frame.throws[2].value).toBe(10);

        });

        it('should allow two bonus balls to be thrown for a strike in the first', function() {

            scope.remainder();
            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).not.toBeTruthy();
            expect(scope.isThrowDisabled(3)).not.toBeTruthy();
            expect(scope.isThrowDisabled(4)).not.toBeTruthy();
            expect(scope.isThrowDisabled(5)).not.toBeTruthy();
            expect(scope.isThrowDisabled(6)).not.toBeTruthy();
            expect(scope.isThrowDisabled(7)).not.toBeTruthy();
            expect(scope.isThrowDisabled(8)).not.toBeTruthy();
            expect(scope.isThrowDisabled(9)).not.toBeTruthy();
            expect(scope.isRemainderDisabled()).not.toBeTruthy();
            expect(scope.remainderLabel()).toBe('X');

            scope.throwBall(9);
            expect(scope.frame.throws.length).toBe(2);

            expect(scope.isThrowDisabled(0)).not.toBeTruthy();
            expect(scope.isThrowDisabled(1)).not.toBeTruthy();
            expect(scope.isThrowDisabled(2)).toBeTruthy();
            expect(scope.isThrowDisabled(3)).toBeTruthy();
            expect(scope.isThrowDisabled(4)).toBeTruthy();
            expect(scope.isThrowDisabled(5)).toBeTruthy();
            expect(scope.isThrowDisabled(6)).toBeTruthy();
            expect(scope.isThrowDisabled(7)).toBeTruthy();
            expect(scope.isThrowDisabled(8)).toBeTruthy();
            expect(scope.isThrowDisabled(9)).toBeTruthy();
            expect(scope.isRemainderDisabled()).not.toBeTruthy();
            expect(scope.remainderLabel()).toBe('/');

            scope.remainder();

            expect(scope.frame.throws.length).toBe(3);
            expect(scope.frame.throws[0].value).toBe(10);
            expect(scope.frame.throws[1].value).toBe(9);
            expect(scope.frame.throws[2].value).toBe(1);

        });

    });

});