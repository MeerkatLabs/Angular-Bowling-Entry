/**
 * Created by rerobins on 2/26/15.
 */
var ScoreSheetDirectiveFactory = function() {

    return {
        require: 'ngModel',
        scope: {
            league: '&'
        },
        templateUrl: 'partials/entry/leagues/matches/scoresheet/display.html',
        link: function($scope, elem, attrs, ngModelController) {

            /*
            Model is the team value which contains all of the bowlers and all of the games.

            View Value will look like:
                bowlers: [
                    {
                        handicap: value,
                        games: [
                            value, value, value
                        ]
                    },
                ]
             */

            var modelValueBase = {};

            ngModelController.$formatters.push(function(modelValue) {

                modelValueBase = angular.copy(modelValue);

                var viewObject = {
                    name: modelValue.name,
                    bowlers: []
                };

                angular.forEach(modelValue.bowlers, function(value, key) {
                    var games = [];

                    var total = 0;
                    for (var gameIndex = 0; gameIndex < $scope.league().number_of_games; ++gameIndex) {
                        var gameTotal = value.games[gameIndex].total;
                        games.push(gameTotal);
                        total += gameTotal;
                    }

                    viewObject.bowlers.push({
                        name: value.name,
                        handicap: value.handicap,
                        games: games,
                        type: value.type,
                        total: total,
                        calculateHandicap: value.handicap === null
                    });
                });

                return viewObject;

            });

            ngModelController.$render = function() {
                var viewValue = ngModelController.$viewValue;


                $scope.bowlers = viewValue.bowlers;
                $scope.name = viewValue.name;

                updateDisplay(viewValue);
            };

            var updateDisplay = function() {
                $scope.gameLabels = [];
                $scope.subTotals = [];
                $scope.totals = [];
                $scope.seriesScratch = 0;
                $scope.seriesTotal = 0;
                var bowlerLength = $scope.bowlers.length;

                for (var gameIndex = 0; gameIndex < $scope.league().number_of_games; ++gameIndex) {
                    $scope.gameLabels.push(gameIndex+1);

                    var subTotal = 0;

                    for (var bowlerIndex = 0; bowlerIndex < bowlerLength; ++bowlerIndex) {
                        var bowler = $scope.bowlers[bowlerIndex];
                        subTotal += bowler.games[gameIndex];

                        if (gameIndex === 0) {
                            bowler.total = bowler.games[gameIndex];
                        } else {
                            bowler.total += bowler.games[gameIndex];
                        }
                    }
                    $scope.subTotals.push(subTotal);

                    $scope.seriesScratch += subTotal;
                }

                var handicap = 0;
                $scope.bowlers.forEach(function(bowler) {
                    if (bowler.calculateHandicap) {
                        var league = $scope.league();
                        bowler.average = Math.floor(bowler.total / league.number_of_games);
                        bowler.handicap = Math.floor((league.handicap_percentage / 100.0) * (league.handicap_max - bowler.average));
                        if (bowler.handicap < 0) {
                            bowler.handicap = 0;
                        }
                    }

                    handicap += (bowler.handicap !== null ? bowler.handicap : 0);
                });
                $scope.teamHandicap = handicap;

                $scope.subTotals.forEach(function(subTotal) {
                    $scope.totals.push(subTotal + $scope.teamHandicap);
                });
            };

            ngModelController.$parsers.push(function(viewValue) {

                // The only thing that should be updated is the game values.
                viewValue.bowlers.forEach(function(bowler, index) {
                    for (var gameIndex = 0; gameIndex < $scope.league().number_of_games; ++gameIndex) {
                        modelValueBase.bowlers[index].games[gameIndex].total = bowler.games[gameIndex];
                    }
                });

                console.log(modelValueBase);

                return modelValueBase;

            });

            $scope.update = function() {
                var viewValue = { name: $scope.name, bowlers: $scope.bowlers };
                ngModelController.$setViewValue(viewValue);
                updateDisplay();
            };

        }
    };

};

angular.module('bowling.entry.core')
    .directive('scoreSheet', [ScoreSheetDirectiveFactory]);