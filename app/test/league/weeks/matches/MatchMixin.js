/**
 * Created by rerobins on 3/16/15.
 */
describe('leauge:weeks:matches:MatchMixin', function() {

    beforeEach(module('bowling.entry.core'));

    it('should clean up the spread sheet', inject(function(Restangular, BOWLING_ROUTES) {

        var match = {
            team1: {
                bowlers: [
                    {
                        games: [
                            {
                                frames: [
                                    {
                                        frame_number: 1,
                                        throws: []
                                    },
                                    {
                                        frame_number: 2,
                                        throws: [2,4]
                                    },
                                    {
                                        frame_number: 3,
                                        throws: []
                                    },
                                    {
                                        frame_number: 4,
                                        throws: [5,5]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            team2: {
                bowlers: []
            }
        };

        Restangular.restangularizeElement(null, match, BOWLING_ROUTES.MATCH);

        match.clean();

        // The frames without throws should be removed.
        expect(match.team1.bowlers[0].games[0].frames.length).toBe(2);

        expect(match.team1.bowlers[0].games[0].frames[0].frame_number).toBe(2);
        expect(match.team1.bowlers[0].games[0].frames[0].throws).toBe('2,4');

        expect(match.team1.bowlers[0].games[0].frames[1].frame_number).toBe(4);
        expect(match.team1.bowlers[0].games[0].frames[1].throws).toBe('5,5');

    }));



});