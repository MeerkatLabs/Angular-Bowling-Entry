/**
 * Add TeamMixin Mixin to the restangular models.
 */
angular.module('bowling.entry.core')
    .run(['Restangular', function(Restangular) {

        /**
         * Definition of the team mixin object.
         * @type {{}}
         */
        var TeamMixin = {};

        /**
         * Get the bowlers list from the database.
         * @returns {*}
         */
        TeamMixin.getBowlers = function() {
            // TODO: Store the content of this into the bowlers method.
            // TODO: Cache the results if possible.
            return this.all('bowlers').getList();
        };

        /**
         * Retrieve a specific bowler from the rest server.
         * @param bowlerId
         * @returns {*}
         */
        TeamMixin.getBowler = function(bowlerId) {
            // TODO: If can retrieve the value from the bowlers list instead of from the hardware
            // TODO: Allow for the force refresh to be called.
            return this.one('bowlers', bowlerId).get();
        };

        /**
         * Create a new bowler for this team.
         * @param bowlerConfiguration
         * @returns {*}
         */
        TeamMixin.createBowler = function(bowlerConfiguration) {
            var team = this;
            return this.all('bowlers').post(bowlerConfiguration).then(function(bowler) {
                team.bowlers.push(bowler);
                return bowler;
            });
        };

        // Notify Restangular to override all of the models of route teams
        Restangular.extendModel('teams', function(model) {
            angular.extend(model, TeamMixin);
            return model;
        });
    }]);