/**
 * Service factory that will work with the team objects.
 */
var TeamService = function() {

    var TeamService = {};

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
    .factory('TeamService', [TeamService])
    .config(['RestangularProvider', function(RestangularProvider) {
        RestangularProvider.extendModel('teams', function(model) {
            model.getBowlers = function() {
                return this.all('bowlers').getList();
            };

            model.getBowler = function(bowlerId) {
                return this.one('bowlers', bowlerId).get();
            };

            model.createBowler = function(bowlerConfiguration) {
                return this.all('bowlers').post(bowlerConfiguration);
            };

            return model;
        });
    }]);