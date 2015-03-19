/**
 * Controller that will provide the entry point to the league details.
 * @param $state
 * @param league
 * @constructor
 */
var LeagueDetailController = function($state, league) {
    var controller = this;

    controller.league = league;

    league.getSubstitutes().then(function(subs) {
        controller.substitutes = subs;
    });

    controller.deleteLeague = function() {
        league.remove().then(function() {
            $state.go('^.^.leagues');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('LeagueDetailController', ['$state', 'league', LeagueDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.detail', {
            url: '/',
            templateUrl: 'partials/entry/leagues/detail.html',
            title: 'League Detail',
            controller: 'LeagueDetailController',
            controllerAs: 'leagueController'
        });

    }]);
