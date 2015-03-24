/**
 * Parsing content for parsing the match data for display and transmitting.
 */

/**
 * Method that will translate an element into JavaScript code style.
 * @param element
 * @private
 */
var MatchTransformer = function(element) {
    /**
     * Method that will translate the team object.
     * @param team
     * @private
     */
    var _MatchTransformer_Team = function(team) {
        team.bowlers.forEach(function(bowler) {
            _MatchTransformer_Team_Bowler(bowler);
        });
    };

    /**
     * Translates the bowler object.
     * @param bowler
     * @private
     */
    var _MatchTransformer_Team_Bowler = function(bowler) {
        bowler.games.forEach(function(game) {
            _MatchTransformer_Team_Bowler_Game(game);
        });
    };

    /**
     * Translates the game object.
     * @param game
     * @private
     */
    var _MatchTransformer_Team_Bowler_Game = function(game) {
        game.gameNumber = game.game_number;
        delete game.game_number;

        var frames = new Array(10);
        game.frames.forEach(function(frame) {
            _MatchTransformer_Team_Bowler_Game_Frame(frame);
            frames[frame.frameNumber-1] = frame;
        });

        for (var frameIndex = 0; frameIndex < 10; ++frameIndex) {
            var frame = frames[frameIndex];
            if (!frame) {
                frames[frameIndex] = {
                    frameNumber: frameIndex + 1,
                    throws: [],
                    splits: []
                };
            }
        }

        game.frames = frames;

    };

    /**
     * Translates the frame object.
     * @param frame
     * @private
     */
    var _MatchTransformer_Team_Bowler_Game_Frame = function(frame) {
        frame.frameNumber = frame.frame_number;

        frame.throws = [];
        frame.throws.push({
            type: frame.throw1_type,
            value: frame.throw1_value
        });

        if (frame.throw2_type) {
            frame.throws.push({
                type: frame.throw2_type,
                value: frame.throw2_value
            });
            if (frame.throw3_type) {
                frame.throws.push({
                    type: frame.throw3_type,
                    value: frame.throw3_value
                });
            }
        }

        delete frame.frame_number;
        delete frame.throw1_type;
        delete frame.throw1_value;
        delete frame.throw2_type;
        delete frame.throw2_value;
        delete frame.throw3_type;
        delete frame.throw3_value;
    };

    if (element.team1) {
        _MatchTransformer_Team(element.team1);
    } else if (element.team2) {
        _MatchTransformer_Team(element.team2);
    }
};




var MatchInterceptor = function(match) {
    var _MatchInterceptor_Team = function(team) {
        team.bowlers.forEach(function(bowler) {
            _MatchInterceptor_Team_Bowler(bowler);
        });
    };

    var _MatchInterceptor_Team_Bowler = function(bowler) {
        bowler.games.forEach(function(game) {
            _MatchInterceptor_Team_Bowler_Game(game);
        });
    };

    var _MatchInterceptor_Team_Bowler_Game = function(game) {
        game.game_number = game.gameNumber;
        delete game.gameNumber;

        game.frames.forEach(function(frame) {
            _MatchInterceptor_Team_Bowler_Game_Frame(frame);
        });
    };

    var _MatchInterceptor_Team_Bowler_Game_Frame = function(frame) {
        frame.frame_number = frame.frameNumber;

        if (frame.throws.length) {
            frame.throw1_type = frame.throws[0].type;
            frame.throw1_value = frame.throws[0].value;

            if (frame.throws.length > 1) {
                frame.throw2_type = frame.throws[1].type;
                frame.throw2_value = frame.throws[1].value;

                if (frame.throws.length > 2) {
                    frame.throw3_type = frame.throws[2].type;
                    frame.throw3_value = frame.throws[3].value;
                }
            }

        }

        delete frame.frameNumber;
        delete frame.throws;
    };

    if (match.team1) {
        _MatchInterceptor_Team(match.team1);
    } else if (match.team2) {
        _MatchInterceptor_Team(match.team2);
    }
};

