/**
 * Created by rerobins on 2/26/15.
 */
var ScoreSheetDirectiveFactory = function() {

    return {
        scope: {
            league: '&',
            team: '&'
        },
        templateUrl: 'partials/entry/leagues/matches/scoresheet/scoresheet.html',
        link: function($scope, elem, attrs) {

            $scope.gameLabels = [];
            $scope.subTotals = [];
            $scope.totals = [];
            $scope.seriesScratch = 0;
            $scope.seriesTotal = 0;

            var bowlerLength = $scope.team().bowlers.length;

            for (var gameIndex = 0; gameIndex < $scope.league().number_of_games; ++gameIndex) {
                $scope.gameLabels.push(gameIndex+1);

                var subTotal = 0;

                for (var bowlerIndex = 0; bowlerIndex < bowlerLength; ++bowlerIndex) {
                    var bowler = $scope.team().bowlers[bowlerIndex];
                    subTotal += bowler.games[gameIndex].total;
                }
                $scope.subTotals.push(subTotal);

                $scope.seriesScratch += subTotal;
            }


            var handicap = 0;
            $scope.team().bowlers.forEach(function(bowler) {
                 handicap += (bowler.handicap !== null ? bowler.handicap : 0);
            });
            $scope.teamHandicap = handicap;

            $scope.subTotals.forEach(function(subTotal) {
                $scope.totals.push(subTotal + $scope.teamHandicap);
            });

        }
    };

};

angular.module('bowling.entry.core')
    .directive('scoreSheet', [ScoreSheetDirectiveFactory]);