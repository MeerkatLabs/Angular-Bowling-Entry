/**
 * Team Detail Controller.
 */

var TeamDetailController = function($stateParams, TeamService, league, team) {

    var controller = this;

    controller.league = league;

    controller.team = team;

    team.getBowlers().then(function(bowlers) {
        controller.bowlers = bowlers;
    });

};

angular.module('bowling.entry.core')
    .controller('TeamDetailController', ['$stateParams', 'TeamService', 'league', 'team', TeamDetailController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.team', {
                url: '/:teamId',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    team: ['$stateParams', 'league', function($stateParams, league) {
                        return league.getTeam($stateParams.teamId);
                    }]
                }
            }).state('bowling.league.team.detail', {
                url: '/',
                templateUrl: 'partials/entry/leagues/teams/detail.html',
                title: 'Team Detail',
                controller: 'TeamDetailController',
                controllerAs: 'teamController'
            });
    }]);
