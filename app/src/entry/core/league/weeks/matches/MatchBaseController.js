/**
 * Created by rerobins on 3/17/15.
 */
var MatchBaseController = function(match) {
    var controller = this;
    controller.match = match;
};

angular.module('bowling.entry.core')
    .controller('MatchBaseController', ['match', MatchBaseController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.week.match', {
            url: '/:matchId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/weeks/matches/base.html',
            resolve: {
                match: ['$stateParams', 'week', function($stateParams, week) {
                    return week.getMatch($stateParams.matchId);
                }]
            },
            controller: 'MatchBaseController',
            controllerAs: 'matchBase'
        });

    }]);