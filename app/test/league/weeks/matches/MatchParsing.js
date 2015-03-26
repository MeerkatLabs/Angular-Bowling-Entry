/**
 * Created by rerobins on 3/20/15.
 */
describe('league:weeks:matches:MatchParsing', function() {


    var data = null;

    beforeEach(function() {
        data = {
            "id": 3, "lanes": "3,4",
            "team1": {
                "id": 4, "name": "Pinty Droppers",
                "bowlers": [
                    {
                        "id": 11,
                        "definition": 12,
                        "name": "Jay",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
                        "games": [
                            {
                                "game_number": 1,
                                "total": 116,
                                "frames": [{"frame_number": 1, "throws": [4, 4]}],
                                "splits": []
                            },
                            {"game_number": 2, "total": 137, "frames": [], "splits": []},
                            {"game_number": 3, "total": 121, "frames": [], "splits": []}
                        ],
                        "total": 374
                    }]
            },
            "team2": {
                "bowlers": []
            }
        }

    });

    it('should massage the incoming data for matches', function() {

        MatchTransformer(data);

        expect(data.team1.bowlers[0].games[0].game_number).not.toBeDefined();
        expect(data.team1.bowlers[0].games[1].game_number).not.toBeDefined();
        expect(data.team1.bowlers[0].games[2].game_number).not.toBeDefined();

        expect(data.team1.bowlers[0].games[0].gameNumber).toBe(1);
        expect(data.team1.bowlers[0].games[1].gameNumber).toBe(2);
        expect(data.team1.bowlers[0].games[2].gameNumber).toBe(3);

        expect(data.team1.bowlers[0].games[0].frames).toBeDefined();
        expect(data.team1.bowlers[0].games[0].frames.length).toBe(10);

        for (var frameIndex = 0; frameIndex < data.team1.bowlers[0].games[0].frames.length; ++frameIndex) {
            var frame = data.team1.bowlers[0].games[0].frames[frameIndex];
            expect(frame.frameNumber).toBe(frameIndex+1);
            expect(frame.frame_number).not.toBeDefined();
        }

    });

    it('should parse the data back to an API format', function() {
        MatchTransformer(data);

        MatchInterceptor(data);

        expect(data.team1.bowlers[0].games[0].gameNumber).not.toBeDefined();
        expect(data.team1.bowlers[0].games[1].gameNumber).not.toBeDefined();
        expect(data.team1.bowlers[0].games[2].gameNumber).not.toBeDefined();

        expect(data.team1.bowlers[0].games[0].game_number).toBe(1);
        expect(data.team1.bowlers[0].games[1].game_number).toBe(2);
        expect(data.team1.bowlers[0].games[2].game_number).toBe(3);

        expect(data.team1.bowlers[0].games[0].frames).toBeDefined();
        expect(data.team1.bowlers[0].games[0].frames.length).toBe(10);

        for (var frameIndex = 0; frameIndex < data.team1.bowlers[0].games[0].frames.length; ++frameIndex) {
            var frame = data.team1.bowlers[0].games[0].frames[frameIndex];
            expect(frame.frame_number).toBe(frameIndex+1);
            expect(frame.frameNumber).not.toBeDefined();
        }
    });

});