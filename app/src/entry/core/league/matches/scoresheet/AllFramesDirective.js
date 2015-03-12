/**
 * Created by rerobins on 2/26/15.
 */
var AllFramesDirectiveFactory = function($state) {

    return {
        templateUrl: 'partials/entry/leagues/matches/games/allFrames.html',
        scope: {
            team: '&',
            gameNumber: '&'
        },
        link: function($scope, elem, attr) {
            console.log('$scope', $scope);
            console.log('$state', $state);

            $scope.state = function(frameId) {
                return {
                    leagueId: $state.params.leagueId,
                    matchId: $state.params.matchId,
                    weekId: $state.params.weekId,
                    gameId: $state.params.gameId,
                    frameId: frameId
                };
            };
        }
    };

};

angular.module('bowling.entry.core')
    .directive('allFrames', ['$state', AllFramesDirectiveFactory]);