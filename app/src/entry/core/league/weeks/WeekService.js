/**
 * Created by rerobins on 2/24/15.
 */

var WeekServiceFactory = function($filter, $q) {
    var WeekService = {};

    WeekService.createWeeks = function(weeksCollection, league) {
        var promises = [];

        var route = league.all('weeks');

        weeksCollection.forEach(function(week) {
            promises.push(route.post({
                week_number: week.weekNumber,
                date: $filter('date')(week.date, 'yyyy-MM-dd')
            }));
        });

        return $q.all(promises);

    };

    return WeekService;
};

angular.module('bowling.entry.core')
    .factory('WeekService', ['$filter', '$q', WeekServiceFactory])
    .config(['RestangularProvider', function(RestangularProvider) {

        RestangularProvider.extendModel('weeks', function(model) {

            model.getMatches = function() {
                return this.all('matches').getList();
            };

            model.getMatch = function(matchId) {
                return this.one('matches', matchId).get();
            };

            return model;

        });

    }]);