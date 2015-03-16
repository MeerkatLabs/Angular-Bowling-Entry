/**
 * Definition of the league service.
 */
var LeagueService = function($filter, Restangular) {

    var LeagueService = {};

    var currentLeague = null;

    /**
     * Cache the league that is currently being worked on.
     * @returns {{}}
     */
    LeagueService.getCurrentLeague = function() {
        return currentLeague;
    };

    /**
     * Create a new league based on the definition.
     * @param {{}} leagueConfiguration
     */
    LeagueService.createLeague = function(leagueConfiguration) {
        return Restangular.all('league').post(leagueConfiguration).then(function(newLeague) {
            currentLeague = newLeague;
            return currentLeague;
        });
    };

    /**
     * Fetch all of the leagues that the user has access to modify.
     */
    LeagueService.getAll = function() {

        var leagueQuery = Restangular.all('league');
        console.log('Restangular.all', leagueQuery);

        return leagueQuery.getList();
    };

    /**
     * Retrieve the league based on the league Id.
     * @param {int|string} _leagueId
     * @returns {*}
     */
    LeagueService.getLeague = function(_leagueId) {

        var leagueId = parseInt(_leagueId);

        // Don't request the value if it's already been fetched
        if (currentLeague !== null && currentLeague.id === leagueId) {
            return currentLeague;
        }

        // Otherwise fetch the league and carry on.
        return Restangular.one('league', leagueId).get().then(function(league) {
            currentLeague = league;
            return league;
        });
    };

    return LeagueService;

};

angular.module('bowling.entry.core')
    .factory('LeagueService', ['$filter', 'Restangular', LeagueService]);
