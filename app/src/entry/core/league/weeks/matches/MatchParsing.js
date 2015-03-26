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

        if (!angular.isDefined(game.frames)) {
            game.frames = [];
        }

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
                    throws: []
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
    }

    if (element.team2) {
        _MatchTransformer_Team(element.team2);
    }

    return element;
};

var MatchInterceptor = function(match) {
    var _MatchInterceptor_Team = function(team) {

        var modified = angular.copy(team);
        modified.bowlers = [];

        team.bowlers.forEach(function(bowler) {
            modified.bowlers.push(_MatchInterceptor_Team_Bowler(bowler));
        });

        return modified;
    };

    var _MatchInterceptor_Team_Bowler = function(bowler) {
        var modified = angular.copy(bowler);
        modified.games = [];

        bowler.games.forEach(function(game) {
            modified.games.push(_MatchInterceptor_Team_Bowler_Game(game));
        });

        return modified;
    };

    var _MatchInterceptor_Team_Bowler_Game = function(game) {

        var modified = angular.copy(game);

        modified.frames = [];

        modified.game_number = modified.gameNumber;
        delete modified.gameNumber;

        game.frames.forEach(function(frame) {
            modified.frames.push(_MatchInterceptor_Team_Bowler_Game_Frame(frame));
        });

        return modified;
    };

    var _MatchInterceptor_Team_Bowler_Game_Frame = function(frame) {

        var modified = angular.copy(frame);

        modified.frame_number = frame.frameNumber;

        if (frame.throws.length) {
            modified.throw1_type = frame.throws[0].type;
            modified.throw1_value = frame.throws[0].value;

            if (frame.throws.length > 1) {
                modified.throw2_type = frame.throws[1].type;
                modified.throw2_value = frame.throws[1].value;

                if (frame.throws.length > 2) {
                    modified.throw3_type = frame.throws[2].type;
                    modified.throw3_value = frame.throws[2].value;
                }
            }

        }

        delete modified.frameNumber;
        delete modified.throws;

        return modified;
    };

    console.log('Manipulating: ', match);

    if (match.team1) {
        match.team1 = _MatchInterceptor_Team(match.team1);
    }

    if (match.team2) {
        match.team2 = _MatchInterceptor_Team(match.team2);
    }

    console.log('Returning: ', match);
    return match;
};

angular.module('bowling.entry.core')
    .run(['$filter', 'Restangular', 'BOWLING_ROUTES', function($filter, Restangular, BOWLING_ROUTES) {
        Restangular.addElementTransformer(BOWLING_ROUTES.MATCH, false, MatchTransformer);
        Restangular.addRequestInterceptor(function(element, operation, what, url) {
            if (what === BOWLING_ROUTES.MATCH && (operation === 'put' || operation === 'post' || operation === 'patch')) {
                return MatchInterceptor(element, $filter);
            }

            return element;
        });
    }]);