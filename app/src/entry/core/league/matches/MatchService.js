/**
 * Match definition.
 */
var MatchServiceFactory = function() {

    var MatchService = {};

    MatchService.createMatch = function(configuration, week) {

        var encodedConfiguration = {

            lanes: configuration.team1.lane + ',' + configuration.team2.lane,
            team1_definition: configuration.team1.team.id,
            team2_definition: configuration.team2.team.id

        };

        return week.all('matches').post(encodedConfiguration);

    };

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