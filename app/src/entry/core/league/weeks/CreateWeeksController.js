/**
 * Created by rerobins on 2/25/15.
 */
var CreateWeeksController = function($state, WeekService, league) {

    var controller = this;

    controller.weeks = [];

    var date = new Date(league.start_date);

    for (var weekNumber = 1; weekNumber <= league.number_of_weeks; ++weekNumber) {
        controller.weeks.push({
            weekNumber: weekNumber,
            date: new Date(date.getTime())
        });

        date.setDate(date.getDate() + 7);
    }

    controller.submit = function() {
        WeekService.createWeeks(controller.weeks, league).then(function() {
            $state.go('bowling_entry_league_details', {leagueId: league.id});
        });
    };

};

angular.module('bowling.entry.core')
    .controller('CreateWeeksController', ['$state', 'WeekService', 'league', CreateWeeksController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling_entry_league_create_weeks', {
            url: '/entry/league/:leagueId/createWeeks',
            templateUrl: 'partials/entry/leagues/weeks/create.html',
            title: 'Create All Weeks',
            controller: 'CreateWeeksController',
            controllerAs: 'create',
            resolve: {
                user: ['UserService', function(UserService) {
                    return UserService.getUser();
                }],
                league: ['$stateParams', 'LeagueService', function($stateParams, LeagueService) {
                    return LeagueService.getLeague($stateParams.leagueId);
                }]
            }
        });

    }]);