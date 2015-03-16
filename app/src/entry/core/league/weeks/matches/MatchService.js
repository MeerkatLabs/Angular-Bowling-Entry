/**
 * Service factory definition of the match service.
 */
var MatchServiceFactory = function() {

    var MatchService = {};

    /**
     * Creates a new match and stores it in the REST service.
     * @param configuration
     * @param week
     * @returns {*}
     */
    MatchService.createMatch = function(configuration, week) {

        var encodedConfiguration = {

            lanes: configuration.team1.lane + ',' + configuration.team2.lane,
            team1_definition: configuration.team1.team.id,
            team2_definition: configuration.team2.team.id

        };

        return week.all('matches').post(encodedConfiguration);

    };

    /**
     * Assign bowlers to the match for a specified team.
     * @param configuration
     * @param match
     * @returns {*}
     */
    MatchService.assignBowlers = function(configuration, match) {

        var teamNumber = configuration.teamNumber;

        var encodedConfiguration = {
            bowlers: []
        };

        configuration.bowlers.forEach(function(bowlerConfig) {
           encodedConfiguration.bowlers.push({
                id: bowlerConfig.id,
                definition: bowlerConfig.val.id,
                type: bowlerConfig.type
           });
        });

        return match.one('matchTeam', teamNumber).customPUT(encodedConfiguration);

    };

    /**
     * Cleans up the frame details in a game in order to post the data to the REST service.
     * @param game
     */
    var cleanUpGame = function(game) {

        var framesToRemove = [];

        game.frames.forEach(function(frame) {
            if (angular.isArray(frame.throws)) {
                if (frame.throws.length > 0) {
                    frame.throws = frame.throws.join(',');
                } else {
                    framesToRemove.push(frame);
                }
            }
        });

        framesToRemove.forEach(function(frame) {
            var index = game.frames.indexOf(frame);
            if (index > -1) {
                game.frames.splice(index, 1);
            }
        });
    };

    /**
     * Cleans up the bowler data for posting to the REST service.
     * @param bowler
     */
    var cleanUpBowler = function(bowler) {
        bowler.games.forEach(cleanUpGame);
    };

    /**
     * Cleans up the team data for posting to the REST service.
     * @param team
     */
    var cleanUpTeams = function(team) {
        team.bowlers.forEach(cleanUpBowler);
    };

    /**
     * Cleans up the score sheet data for posting to the REST service.
     * @param scoreSheet
     */
    MatchService.cleanUpScoresheet = function(scoreSheet) {

        // TODO this should return a promise.

        cleanUpTeams(scoreSheet.team1);
        cleanUpTeams(scoreSheet.team2);
    };

    return MatchService;

};

angular.module('bowling.entry.core')
    .factory('MatchService', [MatchServiceFactory])
    .config(['RestangularProvider', function(RestangularProvider) {
        RestangularProvider.extendModel('matches', function(model) {

            model.getScoreSheet = function() {
                return this.one('scoresheet').get();
            };

            return model;
        });
    }]);