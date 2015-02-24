/**
 * Definition of the league service.
 */

var LeagueService = function(Restangular) {

    var LeagueService = {};

    var currentLeague = null;

    /**
     * Cache the league that is currently being worked on.
     * @returns {BowlingEntryLeague}
     */
    LeagueService.getCurrentLeague = function() {
        return currentLeague;
    };

    /**
     * Set the current league value.
     * @param {BowlingEntryLeague} league
     */
    LeagueService.setCurrentLeague = function(league) {
        currentLeague = league;
    };

    /**
     * Create a new league based on the definition.
     * @param {{}} leagueConfiguration
     */
    LeagueService.createLeague = function(leagueConfiguration) {

    };

    /**
     * Fetch all of the leagues that the user has access to modify.
     */
    LeagueService.getAll = function() {
        return Restangular.all('league').getList();
    };

    /**
     * Retrieve the league based on the league Id.
     * @param {int} leagueId
     * @param {boolean} setCurrent
     * @returns {*}
     */
    LeagueService.getLeague = function(leagueId, setCurrent) {
        return Restangular.one('league', leagueId).get().then(function(league) {
            if (setCurrent) {
                currentLeague = league;
            }
            return league;
        });
    };

    return LeagueService;

};

angular.module('bowling.entry.core')
    .factory('LeagueService', ['Restangular', LeagueService]);
