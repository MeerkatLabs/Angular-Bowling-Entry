/**
 * Substitute Base Controller.
 */
var SubstituteBaseController = function(bowler) {
    var controller = this;
    controller.bowler = bowler;
};

angular.module('bowling.entry.core')
    .controller('SubstituteBaseController', ['$state', 'substitute', SubstituteBaseController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.sub', {
            url: '/sub/:subId',
            abstract: true,
            templateUrl: 'partials/entry/leagues/substitutes/base.html',
            resolve: {
                substitute: ['$stateParams', 'league', function($stateParams, league) {
                    return league.getSubstitute($stateParams.subId);
                }]
            },
            controller: 'SubstituteBaseController',
            controllerAs: 'substituteBase'
        });
    }]);