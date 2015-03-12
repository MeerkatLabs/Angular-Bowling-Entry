/**
 * Controller responsible for the display of the week details.
 *
 * This includes all of the matches that are defined in the week.
 */
var WeekDetailController = function(league, week) {

    var controller = this;
    controller.week = week;
    controller.league = league;

    week.getMatches().then(function(matches) {
        controller.matches = matches;
    });

};

angular.module('bowling.entry.core')
    .controller('WeekDetailController', ['league', 'week', WeekDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week', {
                url: '/week/:weekId',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    week: ['$stateParams', 'league', function($stateParams, league) {
                        return league.getWeek($stateParams.weekId);
                    }]
                }
            }).state('bowling.league.week.details', {
                url: '/',
                templateUrl: 'partials/entry/leagues/weeks/detail.html',
                title: 'Week Detail',
                controller: 'WeekDetailController',
                controllerAs: 'weekController'
            });

    }]);