/**
 * Week Mixin Definition
 */

angular.module('bowling.entry.core')
    .run(['Restangular', function(Restangular) {

        var WeekMixin = {};

        WeekMixin.getMatches = function() {
            return this.all('matches').getList();
        };

        WeekMixin.getMatch = function(matchId) {
            return this.one('matches', matchId).get();
        };


        // Notify Restangular to override all of the models of route league
        Restangular.extendModel('weeks', function(model) {
            angular.extend(model, WeekMixin);
            return model;
        });

    }]);