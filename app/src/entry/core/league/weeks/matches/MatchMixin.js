/**
 * Mixin for the match objects.
 */

angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {

            var MatchMixin = {};

            /**
             * Assign bowlers to the match for a specified team.
             * @param configuration
             * @returns {*}
             */
            MatchMixin.assignBowlers = function(configuration) {

                var teamNumber = configuration.teamNumber;

                var encodedConfiguration = {
                    bowlers: []
                };

                configuration.bowlers.forEach(function(bowlerConfig) {
                    encodedConfiguration.bowlers.push({
                        id: bowlerConfig.id,
                        definition: bowlerConfig.val.id,
                        type: bowlerConfig.type
                    });
                });

                return this.one(BOWLING_ROUTES.MATCH_TEAM, teamNumber).customPUT(encodedConfiguration);

            };

            MatchMixin.getScoreSheet = function() {
                return this.one(BOWLING_ROUTES.SCORESHEET).get();
            };

            // Notify Restangular to override all of the models of route league
            Restangular.extendModel(BOWLING_ROUTES.MATCH, function(model) {
                angular.extend(model, MatchMixin);
                return model;
            });

    }]);