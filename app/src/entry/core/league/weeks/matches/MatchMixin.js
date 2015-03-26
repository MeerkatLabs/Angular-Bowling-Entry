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

            var matchData = { };
            if (teamNumber == 1) {
                matchData.team1 = encodedConfiguration;
            } else {
                matchData.team2 = encodedConfiguration;
            }

            return this.patch(matchData);

        };

        // Notify Restangular to override all of the models of route league
        Restangular.extendModel(BOWLING_ROUTES.MATCH, function(model) {
            angular.extend(model, MatchMixin);
            return model;
        });

    }]);