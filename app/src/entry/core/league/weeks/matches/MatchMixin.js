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

            /**
             * Cleans up the frame details in a game in order to post the data to the REST service.
             * @param game
             */
            var cleanUpGame = function (game) {

                var framesToRemove = [];

                game.frames.forEach(function (frame) {
                    if (angular.isArray(frame.throws)) {
                        if (frame.throws.length > 0) {
                            frame.throws = frame.throws.join(',');
                        } else {
                            framesToRemove.push(frame);
                        }
                    }
                });

                framesToRemove.forEach(function (frame) {
                    var index = game.frames.indexOf(frame);
                    if (index > -1) {
                        game.frames.splice(index, 1);
                    }
                });
            };

            /**
             * Cleans up the bowler data for posting to the REST service.
             * @param bowler
             */
            var cleanUpBowler = function (bowler) {
                bowler.games.forEach(cleanUpGame);
            };

            /**
             * Cleans up the team data for posting to the REST service.
             * @param team
             */
            var cleanUpTeams = function (team) {
                team.bowlers.forEach(cleanUpBowler);
            };

            /**
             * Cleans up the score sheet data for posting to the REST service.
             */
            MatchMixin.clean = function () {

                // TODO this should return a promise.

                cleanUpTeams(this.team1);
                cleanUpTeams(this.team2);
            };


        // Notify Restangular to override all of the models of route league
            Restangular.extendModel(BOWLING_ROUTES.MATCH, function(model) {
                angular.extend(model, MatchMixin);
                return model;
            });

    }]);