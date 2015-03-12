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

        var encodedConfiguration = {
            name: leagueConfiguration.name,
            start_date: $filter('date')(leagueConfiguration.startDate, 'yyyy-MM-dd'),
            number_of_weeks: leagueConfiguration.numberOfWeeks,
            number_of_games: leagueConfiguration.numberOfGames,
            players_per_team: leagueConfiguration.playersPerTeam,
            points_per_game: leagueConfiguration.pointsPerGame,
            points_for_totals: leagueConfiguration.pointsForTotals,
            handicap_max: leagueConfiguration.handicapMax,
            handicap_percentage: leagueConfiguration.handicapPercentage
        };

        return Restangular.all('league').post(encodedConfiguration);
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
    .factory('LeagueService', ['$filter', 'Restangular', LeagueService])
    .config(['RestangularProvider', function(RestangularProvider) {
        RestangularProvider.extendModel('league', function(model) {

            /**
             * Return the team associated with the team id provided (from the league).
             * @param {int} teamId
             * @returns {*}
             */
            model.getTeam = function(teamId) {
                return this.one('teams', teamId).get();
            };

            /**
             * Return all of the substitutes that are associated with the league.
             * @returns {*}
             */
            model.getSubstitutes = function() {
                return this.all('substitute').getList();
            };

            /**
             * Return a specific substitute associated with the league.
             * @param {int} subId
             * @returns {*}
             */
            model.getSubstitute = function(subId) {
                return this.one('substitute', subId).get();
            };

            /**
             * Return a specific week associated with the league.
             * @param {int} weekId
             * @returns {*}
             */
            model.getWeek = function(weekId) {
                return this.one('weeks', weekId).get();
            };

            return model;
        });
    }]);
