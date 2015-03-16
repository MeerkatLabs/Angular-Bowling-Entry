/**
 * Created by rerobins on 3/16/15.
 */
describe('league:weeks:WeekMixin', function() {

    beforeEach(module('bowling.entry.core'));

    it('should merge in the week mixin', inject(function(Restangular) {

        var incomingWeek = {
            "id": 1,
            "week_number": 1,
            "date": "2015-02-24",
            "matches": [
                1
            ]
        };

        Restangular.restangularizeElement(null, incomingWeek, 'weeks');

        expect(incomingWeek.getMatches).toBeDefined();
        expect(incomingWeek.getMatch).toBeDefined();
        expect(incomingWeek.createMatch).toBeDefined();

    }));

    describe('create Match', function() {

        var matchCreateRegEx = new RegExp('/matches/$');
        var $httpBackend;
        var week = null;

        beforeEach(inject(function(_$httpBackend_, Restangular) {
            $httpBackend = _$httpBackend_;

            Restangular.setRequestSuffix('/');
            Restangular.setBaseUrl('http://localhost/api');

            $httpBackend.whenPOST(matchCreateRegEx).respond(function(method, url, data, headers) {
                console.log('returning data');

                return [200, data ]
            });

        }));

        beforeEach(inject(function(Restangular, BOWLING_ROUTES) {
            week = {
                "id": 1,
                "week_number": 1,
                "date": "2015-02-24",
                "matches": [
                    1
                ]
            };

            Restangular.restangularizeElement(null, week, BOWLING_ROUTES.WEEK);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should attempt to create a new match', function() {
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

            $httpBackend.expectPOST(matchCreateRegEx);

            var createdMatch = null;
            week.createMatch(configuration).then(function(_match) {
                createdMatch = _match;

                expect(createdMatch.lanes).toBe('5,6');
                expect(createdMatch.team1_definition).toBe(1);
                expect(createdMatch.team2_definition).toBe(2);
            });

            $httpBackend.flush();

            expect(createdMatch).not.toBeNull();

        });

    });

});