/**
 * Controller responsible for editing a bowlers details.
 */
var EditBowlerController = function($stateParams, $state, BowlerService, league, team, bowler) {

    console.log('bowler', bowler);

    var controller = this;

    controller.substitute = bowler;

    controller.submit = function() {
        console.log('Editing new substitute');

        BowlerService.save(bowler).then(function() {
            $state.go('^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditBowlerController', ['$stateParams', '$state', 'BowlerService', 'league', 'team', 'bowler', EditBowlerController])
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('bowling.league.team.bowler', {
                url: '/:bowlerId',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    bowler: ['$stateParams', 'team', function($stateParams, team) {
                        console.log('Resolving bowler');
                        console.log('Getting Sub: ', $stateParams.bowlerId);
                        console.log('From Team: ', team);

                        return team.getBowler($stateParams.bowlerId).then(function(sub) {
                            console.log('Retrieved sub: ', sub);
                            return sub;
                        }).catch(function() {
                            console.log('Failed');
                        });
                    }]
                }
            }).state('bowling.league.team.bowler.edit', {
                url: '/edit',
                templateUrl: 'partials/entry/leagues/substitutes/create.html',
                title: 'Edit Bowler',
                controller: 'EditBowlerController',
                controllerAs: 'subController'
            });
    }]);