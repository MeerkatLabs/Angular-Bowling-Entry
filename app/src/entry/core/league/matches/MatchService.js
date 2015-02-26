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

    return MatchService;

};

angular.module('bowling.entry.core')
    .factory('MatchService', [MatchServiceFactory])
    .config(['RestangularProvider', function(RestangularProvider) {

    }]);