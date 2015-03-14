/**
 * League Mixin Definition for all of the restangular league defined objects.
 */
var LeagueMixin = { };

/**
 * Return the team associated with the team id provided (from the league).
 * @param {int} teamId
 * @returns {*}
 */
LeagueMixin.getTeam = function(teamId) {
    return this.one('teams', teamId).get();
};

/**
 * Return all of the substitutes that are associated with the league.
 * @returns {*}
 */
LeagueMixin.getSubstitutes = function() {
    return this.all('substitute').getList();
};

/**
 * Return a specific substitute associated with the league.
 * @param {int} subId
 * @returns {*}
 */
LeagueMixin.getSubstitute = function(subId) {
    return this.one('substitute', subId).get();
};

/**
 * Return a specific week associated with the league.
 * @param {int} weekId
 * @returns {*}
 */
LeagueMixin.getWeek = function(weekId) {
    return this.one('weeks', weekId).get();
};

angular.module('bowling.entry.core')
    .run(['Restangular', function(Restangular) {

        Restangular.extendModel('league', function(model) {
            angular.extend(model, LeagueMixin);
            return model;
        });

    }]);