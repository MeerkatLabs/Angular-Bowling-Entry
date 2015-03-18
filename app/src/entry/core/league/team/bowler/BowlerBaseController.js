/**
 * Bowler base controller.
 */
var BowlerBaseController = function(bowler) {
    var controller = this;
    controller.bowler = bowler;
};

angular.module('bowling.entry.core')
    .controller('BowlerBaseController', ['bowler', BowlerBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.team.bowler', {
            url: '/:bowlerId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/teams/bowler/base.html',
            resolve: {
                bowler: ['$stateParams', 'team', function($stateParams, team) {
                    return team.getBowler($stateParams.bowlerId);
                }]
            },
            controller: 'BowlerBaseController',
            controllerAs: 'bowlerBase'
        });
    }]);