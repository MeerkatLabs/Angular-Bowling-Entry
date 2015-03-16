/**
 * Week Mixin Definition
 */

angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {

        var WeekMixin = {};

        WeekMixin.getMatches = function() {
            return this.all(BOWLING_ROUTES.MATCH).getList();
        };

        WeekMixin.getMatch = function(matchId) {
            return this.one(BOWLING_ROUTES.MATCH, matchId).get();
        };


        // Notify Restangular to override all of the models of route league
        Restangular.extendModel(BOWLING_ROUTES.WEEK, function(model) {
            angular.extend(model, WeekMixin);
            return model;
        });

    }]);