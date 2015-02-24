/**
 * League Resource.
 */

var BowlingEntryLeague = function($resource, APILocationService) {

    var League = $resource(APILocationService.getPrefix() + '/league/:leagueId/',
        {leagueId: '@pk'}, {},
        {stripTrailingSlashes: false}
    );

    /**
     * Create a Team resource accessor that is specific to this league.
     * @returns {*}
     * @constructor
     */
    League.prototype.Team = function() {

        if (typeof this.$teamResource === 'undefined') {
            this.$teamResource = $resource(APILocationService.getPrefix() + '/league/:leagueId/teams/:teamId/',
                {leagueId: this.id,
                 teamId: '@id'}, {},
                {stripTrailingSlashes: false});
        }

        return this.$teamResource;

    };

    return League;
};

angular.module('bowling.entry.common')
    .service('BowlingEntryLeague', ['$resource', 'APILocationService', BowlingEntryLeague]);