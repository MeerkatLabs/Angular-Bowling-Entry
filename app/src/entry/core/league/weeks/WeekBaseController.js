/**
 * Controller for base week views.
 */

var WeekBaseController = function(week) {

    var controller = this;

    controller.week = week;

};

angular.module('bowling.entry.core')
    .controller('WeekBaseController', ['league', WeekBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week', {
            url: '/week/:weekId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/weeks/base.html',
            resolve: {
                week: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getWeek($stateParams.weekId);
                }]
            },
            controller: 'WeekBaseController',
            controllerAs: 'weekBase'
        });

    }]);
