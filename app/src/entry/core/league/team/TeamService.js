/**
 * Service factory that will work with the team objects.
 */
var TeamService = function($q, LeagueService) {

    var TeamService = {};

    var currentTeam = null;

    TeamService.getCurrentTeam = function() {
        return currentTeam;
    };

    /**
     * Fetch the team with the provided team Id.
     * @param leagueId league identifier.
     * @param teamId team identifier.
     * @returns {*}
     */
    TeamService.getTeam = function(teamId) {

        var currentLeague = LeagueService.getCurrentLeague();

        if (currentLeague === null) {
            return $q.reject('Current League is not defined');
        }

        return currentLeague.getTeam(teamId).then(function(team) {
            currentTeam = team;
            return currentTeam;
        });

    };

    /**
     * Create a new team object.
     */
    TeamService.createTeam = function(teamConfiguration, league) {

        var encodedConfiguration = {
            name: teamConfiguration.name
        };

        return league.all('teams').post(encodedConfiguration);
    };

    return TeamService;

};

angular.module('bowling.entry.core')
    .factory('TeamService', ['$q', 'LeagueService', TeamService])
    .config(['RestangularProvider', function(RestangularProvider) {
        RestangularProvider.extendModel('teams', function(model) {
            model.getBowlers = function() {
                return this.all('bowlers').getList();
            };

            model.getBowler = function(bowlerId) {
                return this.one('bowlers', bowlerId).get();
            };

            return model;
        });
    }]);