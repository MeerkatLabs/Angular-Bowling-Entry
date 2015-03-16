/**
 * Week Mixin Definition
 */

angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {

        var WeekMixin = {};

        /**
         * Fetch all of the matches associated with the week.
         * @returns {*}
         */
        WeekMixin.getMatches = function() {
            return this.all(BOWLING_ROUTES.MATCH).getList();
        };

        /**
         * Fetch a specific match definition.
         * @param matchId
         * @returns {*}
         */
        WeekMixin.getMatch = function(matchId) {
            return this.one(BOWLING_ROUTES.MATCH, matchId).get();
        };

        /**
         * Creates a new match and stores it in the REST service.
         * @param configuration
         * @returns {*}
         */
        WeekMixin.createMatch = function(configuration) {

            var encodedConfiguration = {

                lanes: configuration.team1.lane + ',' + configuration.team2.lane,
                team1_definition: configuration.team1.team.id,
                team2_definition: configuration.team2.team.id

            };

            return this.all(BOWLING_ROUTES.MATCH).post(encodedConfiguration);

        };


        // Notify Restangular to override all of the models of route league
        Restangular.extendModel(BOWLING_ROUTES.WEEK, function(model) {
            angular.extend(model, WeekMixin);
            return model;
        });

    }]);