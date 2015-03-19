/**
 * Controller responsible for the creation of a new bowler on a team.
 */
var CreateBowlerController = function($state, $mdToast, team) {

    var controller = this;

    // container for all of the content.  In theory should just be submitted to the restangular service as is, and
    // restangular will be responsible for converting it to something that the API can handle.
    controller.bowler = { };

    /**
     * Submit the form to the API, and if successful, reset to add another bowler.
     * @param addAnother whether to add another bowler after this one
     */
    controller.submit = function(addAnother) {
        team.createBowler(controller.bowler).then(function(bowler) {
            if (addAnother) {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Bowler: ' + bowler.name + ' created')
                );
                resetForm();
            } else {
                $state.go('^.detail');
            }
        });
    };

    var resetForm = function() {
        controller.bowler.name = '';
        controller.bowler.handicap = null;
    };

    resetForm();
};

angular.module('bowling.entry.core')
    .controller('CreateBowlerController', ['$state', '$mdToast', 'team', CreateBowlerController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.team.createBowler', {
            url: '/createBowler',
            templateUrl: 'partials/entry/leagues/teams/bowler/create.html',
            title: 'Create Bowler',
            controller: 'CreateBowlerController',
            controllerAs: 'bowlerController'
        });
    }]);