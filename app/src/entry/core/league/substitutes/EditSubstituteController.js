/**
 * Controller that allows for the editing of a substitutes details.
 */
var EditSubstituteController = function($state, substitute) {
    var controller = this;
    controller.substitute = substitute;

    controller.submit = function() {
        substitute.put().then(function() {
            $state.go('^.^.detail');
        });
    };

};

angular.module('bowling.entry.core')
    .controller('EditSubstituteController', ['$state', 'substitute', EditSubstituteController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('bowling.league.sub.edit', {
                url: '/edit',
                templateUrl: 'partials/entry/leagues/substitutes/create.html',
                title: 'Edit Substitute',
                controller: 'EditSubstituteController',
                controllerAs: 'subController'
            });
    }]);