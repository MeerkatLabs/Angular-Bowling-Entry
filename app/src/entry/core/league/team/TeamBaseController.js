/**
 * Base Controller and state definition for team views.
 */
var TeamBaseController = function(league, team) {

    var controller = this;

    controller.league = league;
    controller.team = team;

};

angular.module('bowling.entry.core')
    .controller('TeamBaseController', ['league', 'team', TeamBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.team', {
            url: '/:teamId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/teams/base.html',
            resolve: {
                team: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getTeam($stateParams.teamId);
                }]
            },
            controller: 'TeamBaseController',
            controllerAs: 'teamBaseController'
        });
    }]);