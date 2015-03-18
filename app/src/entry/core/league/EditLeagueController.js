/**
 * Allow editing of leagues.
 */
var EditLeagueController = function($state, LeagueService, league) {
    var controller = this;
    controller.league = league;

    controller.submit = function() {
        league.put().then(function(league) {
            LeagueService.setCurrentLeague(league);

            // TODO: If the number of weeks have changed, will want to redirect to the weeks editor, otherwise will
            // go back to the details of the league.
            $state.go('^.detail');
        });
    };
};

angular.module('bowling.entry.core')
    .controller('EditLeagueController', ['$state', 'LeagueService', 'league', EditLeagueController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.edit', {
            url: '/edit',
            templateUrl: 'partials/entry/leagues/edit.html',
            title: 'Edit League Detail',
            controller: 'EditLeagueController',
            controllerAs: 'editLeague'
        });

    }]);