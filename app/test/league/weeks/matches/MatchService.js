/**
 * Created by rerobins on 3/13/15.
 */
describe('league:matches:MatchService', function() {

    beforeEach(module('bowling.entry.core'));

    describe('create Match', function() {

        var matchCreateRegEx = new RegExp('/matches/$');
        var weekRegEx = new RegExp('/weeks/1/$');
        var $httpBackend;

        beforeEach(inject(function(_$httpBackend_, Restangular) {
            $httpBackend = _$httpBackend_;

            Restangular.setRequestSuffix('/');
            Restangular.setBaseUrl('http://localhost/api');

            $httpBackend.whenPOST(matchCreateRegEx).respond(function(method, url, data, headers) {
                console.log('returning data');

                return [200, data ]
            });

            $httpBackend.whenGET(weekRegEx).respond({week_number: 1, id: 1, date: '2015-05-06'});

        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should attempt to create a new match', inject(function(MatchService, Restangular) {
            var configuration = {
                team1: {
                    team: {
                        id: 1
                    },
                    lane: 5
                }, team2: {
                    team: {
                        id: 2
                    },
                    lane: 6
                }
            };

            var week = null;
            Restangular.one('weeks', 1).get().then(function(_week) {
                week = _week;
            });

            $httpBackend.expectGET(weekRegEx);
            $httpBackend.flush();

            expect(week).not.toBeNull();

            $httpBackend.expectPOST(matchCreateRegEx);

            var createdMatch = null;
            MatchService.createMatch(configuration, week).then(function(_match) {
                createdMatch = _match;

                expect(createdMatch.lanes).toBe('5,6');
                expect(createdMatch.team1_definition).toBe(1);
                expect(createdMatch.team2_definition).toBe(2);
            });

            $httpBackend.flush();

            expect(createdMatch).not.toBeNull();

        }));

    });

    describe('clean up Scoresheet', function() {

        it('should clean up the spread sheet', inject(function(MatchService) {

            var scoresheet = {
                team1: {
                    bowlers: [
                        {
                            games: [
                                {
                                    frames: [
                                        {
                                            frame_number: 1,
                                            throws: []
                                        },
                                        {
                                            frame_number: 2,
                                            throws: [2,4]
                                        },
                                        {
                                            frame_number: 3,
                                            throws: []
                                        },
                                        {
                                            frame_number: 4,
                                            throws: [5,5]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                team2: {
                    bowlers: []
                }
            };

            MatchService.cleanUpScoresheet(scoresheet);

            // The frames without throws should be removed.
            expect(scoresheet.team1.bowlers[0].games[0].frames.length).toBe(2);

            expect(scoresheet.team1.bowlers[0].games[0].frames[0].frame_number).toBe(2);
            expect(scoresheet.team1.bowlers[0].games[0].frames[0].throws).toBe('2,4');

            expect(scoresheet.team1.bowlers[0].games[0].frames[1].frame_number).toBe(4);
            expect(scoresheet.team1.bowlers[0].games[0].frames[1].throws).toBe('5,5');

        }));



    });

});