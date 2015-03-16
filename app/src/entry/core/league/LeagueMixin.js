/**
 * Add League Mixin to the restangular models.
 */
angular.module('bowling.entry.core')
    .run(['Restangular', function(Restangular) {

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

        /**
         * Create a new team object based on the configuration provided.
         * @param teamConfiguration
         * @returns {*}
         */
        LeagueMixin.createTeam = function(teamConfiguration) {
            var league = this;

            return this.all('teams').post(teamConfiguration).then(function(team) {
                // Save the newly created team into the list of teams that are in the league.
                league.teams.push({
                    id: team.id,
                    name: team.name
                });

                return team;
            });
        };

        /**
         * Create new substitute object.
         * @param configuration substitute definition.
         */
        LeagueMixin.createSubstitute = function(configuration) {
            return this.all('substitute').post(configuration);
        };

        /**
         * An array or a single week to create.
         * @param {{}[]|{}} weeks
         */
        LeagueMixin.createWeeks = function(weeks) {

            var weeksCollection = weeks;
            if (!angular.isArray(weeks)) {
                weeksCollection = [weeks];
            }

            var promises = [];

            var route = this.all('weeks');

            weeksCollection.forEach(function(week) {
                promises.push(route.post({
                    week_number: week.weekNumber,
                    date: $filter('date')(week.date, 'yyyy-MM-dd')
                }));
            });

            return $q.all(promises);

        };

        // Notify Restangular to override all of the models of route league
        Restangular.extendModel('league', function(model) {
            angular.extend(model, LeagueMixin);
            return model;
        });

    }]);