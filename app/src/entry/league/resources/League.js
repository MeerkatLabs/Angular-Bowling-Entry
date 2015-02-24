/**
 * League Resource.
 */

var BowlingEntryLeague = function($resource, APILocationService) {

    var League = $resource(APILocationService.getPrefix() + '/league/:leagueId/',
        {leagueId: '@pk'}, {},
        {stripTrailingSlashes: false}
    );

    return League;
};

angular.module('bowling.entry.league')
    .service('BowlingEntryLeague', ['$resource', 'APILocationService', BowlingEntryLeague]);