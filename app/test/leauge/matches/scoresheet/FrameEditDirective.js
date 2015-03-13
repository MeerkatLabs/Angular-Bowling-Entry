/**
 * Created by rerobins on 3/12/15.
 */
describe('league:matches:scoresheet:FrameEditDirective', function() {

    var bowler = {
        games: [
            {
                frames: [
                    {
                        frame_number: 1,
                        throws: ''
                    },
                    {
                        frame_number: 10,
                        throws: ''
                    }
                ]
            }
        ]
    };

    var $compile, $rootScope;

    beforeEach(module('karma.templates'));
    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        $rootScope.bowler = bowler;
        $rootScope.gameNumber = 1;
    }));

    it('should select the correct frame and define all of the methods for frame 1', function() {

        $rootScope.frameNumber = 1;

        var element = $compile('<frame-edit bowler="bowler" game-number="gameNumber" frame-number="frameNumber" />')($rootScope);

        $rootScope.$digest();

        expect(true).toBeTruthy();

        console.log(angular.toJson($rootScope.bowler));

    });

});