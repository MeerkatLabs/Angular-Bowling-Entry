/**
 * Mixin for the scoresheet objects.
 */

angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {

        var ScoresheetMixin = {};

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
        ScoresheetMixin.clean = function () {

            // TODO this should return a promise.

            cleanUpTeams(this.team1);
            cleanUpTeams(this.team2);
        };

        // Notify Restangular to override all of the models of route league
        Restangular.extendModel(BOWLING_ROUTES.SCORESHEET, function(model) {
            angular.extend(model, ScoresheetMixin);
            return model;
        });

    }]);