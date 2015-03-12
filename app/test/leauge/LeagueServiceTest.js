/**
 * Created by rerobins on 3/12/15.
 */
describe('league:LeagueServiceTest', function() {

    beforeEach(module('bowling.entry.core'));

    describe('league:LeagueServiceTest:getAll', function() {

        var $httpBackend;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET(new RegExp('/league$'))
                .respond([]);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('request the collection of leagues correctly', inject(function(LeagueService) {

            $httpBackend.expectGET(new RegExp('league'));

            var result = null;
            LeagueService.getAll().then(function(leagues) {
                result = leagues;
                console.log(JSON.stringify(result));
            });

            $httpBackend.flush();

            expect(result).toBeDefined();
            expect(result.length).toBe(0);
        }));

    });

    describe('league:LeagueServiceTest:_getLeague', function() {
        var $httpBackend;

        var league01Get = new RegExp('/league/1/$');
        var league01  = {
            name: 'League1 Name',
            id: 1
        };

        var league02Get = new RegExp('/league/2/$');
        var league02 = {
            name: 'League2 Name',
            id: 2
        };

        beforeEach(inject(function(_$httpBackend_, Restangular) {
            $httpBackend = _$httpBackend_;

            Restangular.setRequestSuffix('/');
            Restangular.setBaseUrl('http://localhost/api')

            $httpBackend.whenGET(league01Get)
                .respond(league01);

            $httpBackend.whenGET(league02Get)
                .respond(league02);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should fetch league01 from the database', inject(function(LeagueService) {

            $httpBackend.expectGET(league01Get);

            LeagueService.getLeague(1).then(function(league) {
                expect(league).not.toBeNull();
                expect(league.name).toEqual(league01.name);
                expect(league.id).toEqual(league01.id);
            });

            $httpBackend.flush();

        }));

        it('cache getting league01 from the database', inject(function(LeagueService) {

            $httpBackend.expectGET(league01Get);

            var cachedLeague = null;
            LeagueService.getLeague(1).then(function(league) {
                expect(league).not.toBeNull();
                cachedLeague = league;
            });

            $httpBackend.flush();

            var fetchedLeague = LeagueService.getLeague(1);
            expect(fetchedLeague.then).not.toBeDefined();
            expect(fetchedLeague).toBe(cachedLeague);
            expect(LeagueService.getCurrentLeague()).toBe(fetchedLeague);

        }));

        it('fetch league 2 after being populated with league 1', inject(function(LeagueService) {

            $httpBackend.expectGET(league01Get);
            LeagueService.getLeague(1);

            $httpBackend.flush();

            $httpBackend.expectGET(league02Get);
            LeagueService.getLeague(2).then(function(league) {
                expect(league.name).toBe(league02.name);
                expect(league.id).toBe(league02.id);
            });

            $httpBackend.flush();

        }));
    });

    describe('league:LeagueServiceTest:_createLeague', function(LeagueService) {

        var league = {};
        var $httpBackend;

        var leaguePostRegEx = new RegExp('/league/$');

        beforeEach(inject(function(_$httpBackend_, Restangular) {
            $httpBackend = _$httpBackend_;

            Restangular.setRequestSuffix('/');
            Restangular.setBaseUrl('http://localhost/api');

            $httpBackend.whenPOST(leaguePostRegEx).respond(function(method, url, data, headers) {
                console.log('returning data');

                return [200, data ]
            });

        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should send the correct post information when creating a new league', inject(function(LeagueService) {

            // While this may look like may, it's really june.
            var date = new Date(2015, 5, 20);

            var leagueDefinition = {
                name: 'League Name',
                startDate: date,
                numberOfWeeks: 10,
                numberOfGames: 3,
                playersPerTeam: 4,
                pointsPerGame: 2,
                pointsForTotals: 2,
                handicapMax: 210,
                handicapPercentage: 90
            };

            $httpBackend.expectPOST(leaguePostRegEx);

            var dataReceived = null;
            LeagueService.createLeague(leagueDefinition).then(function(data) {
                dataReceived = data;
                expect(data.name).toBe(leagueDefinition.name);
                expect(data.start_date).toBe('2015-06-20');
                expect(data.number_of_weeks).toBe(leagueDefinition.numberOfWeeks);
                expect(data.number_of_games).toBe(leagueDefinition.numberOfGames);
                expect(data.players_per_team).toBe(leagueDefinition.playersPerTeam);
                expect(data.points_per_game).toBe(leagueDefinition.pointsPerGame);
                expect(data.points_for_totals).toBe(leagueDefinition.pointsForTotals);
                expect(data.handicap_max).toBe(leagueDefinition.handicapMax);
                expect(data.handicap_percentage).toBe(leagueDefinition.handicapPercentage);

            });

            $httpBackend.flush();

            expect(dataReceived).not.toBeNull();

        }));

        it('should cache the newly created league in the current league pointer', inject(function(LeagueService) {

            // While this may look like may, it's really june.
            var date = new Date(2015, 5, 20);

            var leagueDefinition = {
                name: 'League Name',
                startDate: date,
                numberOfWeeks: 10,
                numberOfGames: 3,
                playersPerTeam: 4,
                pointsPerGame: 2,
                pointsForTotals: 2,
                handicapMax: 210,
                handicapPercentage: 90
            };

            $httpBackend.expectPOST(leaguePostRegEx);

            var dataReceived = null;
            LeagueService.createLeague(leagueDefinition).then(function(data) {
                dataReceived = data;
            });

            $httpBackend.flush();

            expect(dataReceived).not.toBeNull();
            expect(LeagueService.getCurrentLeague()).toBe(dataReceived);

        }));

    });

});