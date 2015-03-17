/**
 * Created by rerobins on 3/17/15.
 */
describe('league:weeks:matches:scoresheet:ScoresheetDirective', function() {

    var $compile, $rootScope, league, team;

    beforeEach(module('karma.templates'));
    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$compile_, _$rootScope_, Restangular) {

        league = Restangular.restangularizeElement(null, {
            "id": 3,
            "name": "Polar Bowler Ball League",
            "start_date": "2014-11-04",
            "number_of_weeks": 18,
            "number_of_games": 3,
            "players_per_team": 5,
            "points_per_game": 2,
            "points_for_totals": 2,
            "handicap_max": 200,
            "handicap_percentage": 100
        }, 'league');

        team = {
            "id": 5,
            "name": "Pinty Droppers",
            "bowlers": [
                {
                    "id": 11,
                    "name": "Jay",
                    "type": "regular",
                    "handicap": null,
                    "games": [
                        {
                            "game_number": 1,
                            "total": 0,
                            "frames": [],
                            "splits": []
                            },
                        {
                            "game_number": 2,
                            "total": 0,
                            "frames": [],
                            "splits": []
                            },
                        {
                            "game_number": 3,
                            "total": 0,
                            "frames": [],
                            "splits": []
                            }
                        ],
                    "total": 0
                }
            ]
        };

        $compile = _$compile_;
        $rootScope = _$rootScope_;

        $rootScope.league = league;
        $rootScope.team = team;

    }));

    it('should translate the content correctly (no previous values)', function() {

        var element = $compile('<score-sheet league="league" ng-model="team"></score-sheet>')($rootScope);
        $rootScope.$digest();

        var isolatedScope = element.isolateScope();

        console.log(isolatedScope.bowlers);

        // Only one bowler defined
        expect(isolatedScope.bowlers.length).toBe(1);
        var bowler = isolatedScope.bowlers[0];

        // Verify the bowler data
        expect(bowler.name).toBe('Jay');
        expect(bowler.handicap).toBe(league.handicapMax);
        expect(bowler.average).toBe(0);
        expect(bowler.total).toBe(0);

        expect(bowler.games.length).toBe(league.numberOfGames);

        // All of the values should be 0'd out
        for (var gameIndex = 0; gameIndex < league.numberOfGames; ++gameIndex) {
            expect(bowler.games[gameIndex]).toBe(0);
        }

        // Verify all of the subtotals
        expect(angular.isArray(isolatedScope.subTotals)).toBeTruthy();
        expect(isolatedScope.subTotals.length).toBe(league.numberOfGames);

        for (gameIndex = 0; gameIndex < league.numberOfGames; ++gameIndex) {
            expect(isolatedScope.subTotals[gameIndex]).toBe(0);
        }

        expect(isolatedScope.seriesScratch).toBe(0);
        expect(isolatedScope.teamHandicap).toBe(league.handicapMax);
        expect(isolatedScope.seriesTotal).toBe(league.handicapMax * league.numberOfGames);
    });

    it('should update content correctly (no previous values)', function() {

        var element = $compile('<score-sheet league="league" ng-model="team"></score-sheet>')($rootScope);
        $rootScope.$digest();

        var isolatedScope = element.isolateScope();

        console.log(isolatedScope.bowlers);

        // Only one bowler defined
        expect(isolatedScope.bowlers.length).toBe(1);
        var bowler = isolatedScope.bowlers[0];

        bowler.games[0] = 116;
        bowler.games[1] = 137;
        bowler.games[2] = 121;

        isolatedScope.update();

        expect(bowler.average).toBe(Math.floor((116+137+121)/ 3.0));

    });


});