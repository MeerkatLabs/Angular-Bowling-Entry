/**
 * Created by rerobins on 3/17/15.
 */
describe('league:weeks:matches:MatchDetailController', function() {

    var league, week, match;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(Restangular, BOWLING_ROUTES) {
        league = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'league',
            number_of_games: 3
        }, BOWLING_ROUTES.LEAGUE);

        week = Restangular.restangularizeElement(league, {
            id: 1,
            week_number: 1,
            date: '2015-01-01'
        }, BOWLING_ROUTES.WEEK);

        match = Restangular.restangularizeElement(week, {
            "id": 3,
            "lanes": "3,4",
            "team1": {
                "id": 5,
                "name": "Pinty Droppers",
                "bowlers": [
                    {
                        "id": 11,
                        "definition": 12,
                        "name": "Jay",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
                        "games": [
                            {
                                "game_number": 1,
                                "total": 154,
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
                        "total": 154
                    },
                    {
                        "id": 12,
                        "definition": 13,
                        "name": "Lindsay",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 13,
                        "definition": 14,
                        "name": "Todd",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 14,
                        "definition": 15,
                        "name": "Nichie",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 15,
                        "definition": 16,
                        "name": "Michelle",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                ],
                "definition_id": 4
            },
            "team2": {
                "id": 6,
                "name": "The Pin is Mightier Than The Ball",
                "bowlers": [
                    {
                        "id": 16,
                        "definition": 20,
                        "name": "Michael",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 17,
                        "definition": 21,
                        "name": "Laura",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 18,
                        "definition": 22,
                        "name": "Bill",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 19,
                        "definition": 23,
                        "name": "Janie",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                    },
                    {
                        "id": 20,
                        "definition": 24,
                        "name": "Ram",
                        "type": "regular",
                        "handicap": null,
                        "average": null,
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
                ],
                "definition_id": 5
            }

        }, BOWLING_ROUTES.MATCH);
    }));

    it('should generate valid scoresheet data', inject(function($controller) {
        var controller = $controller('MatchDetailController', {league: league, week: week, match: match }, {});

        expect(controller.scoreSheet).toBe(match);
        expect(controller.league).toBe(league);
        expect(controller.week).toBe(week);

        expect(controller.gameLabels).toBeDefined();
        expect(angular.isArray(controller.gameLabels)).toBeTruthy();
        expect(controller.gameLabels.length).toBe(league.numberOfGames);

    }));

});