/**
 * Add TeamMixin Mixin to the restangular models.
 */
angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {

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
            return this.all(BOWLING_ROUTES.BOWLER).getList();
        };

        /**
         * Retrieve a specific bowler from the rest server.
         * @param bowlerId
         * @returns {*}
         */
        TeamMixin.getBowler = function(bowlerId) {
            // TODO: If can retrieve the value from the bowlers list instead of from the hardware
            // TODO: Allow for the force refresh to be called.
            return this.one(BOWLING_ROUTES.BOWLER, bowlerId).get();
        };

        /**
         * Create a new bowler for this team.
         * @param bowlerConfiguration
         * @returns {*}
         */
        TeamMixin.createBowler = function(bowlerConfiguration) {
            var team = this;
            return this.all(BOWLING_ROUTES.BOWLER).post(bowlerConfiguration).then(function(bowler) {
                team.bowlers.push(bowler);
                return bowler;
            });
        };

        /**
         * Send the remove bowler data to the server, and then remove the bowler from the list of bowlers on the team.
         * @param bowler
         * @returns {*}
         */
        TeamMixin.moveBowlerToSubstitute = function(bowler) {
            var team = this;
            return bowler.put({removeTeam: true}).then(function(bowler) {

                var bowlerIndex = -1;

                team.bowlers.forEach(function(_bowler, index) {
                    if (bowler.id == _bowler.id) {
                        bowlerIndex = index;
                    }
                });

                if (bowlerIndex !== -1) {
                    team.bowlers.splice(bowlerIndex, 1);
                }

                return bowler;
            });
        };

        // Notify Restangular to override all of the models of route teams
        Restangular.extendModel(BOWLING_ROUTES.TEAM, function(model) {
            angular.extend(model, TeamMixin);
            return model;
        });
    }]);