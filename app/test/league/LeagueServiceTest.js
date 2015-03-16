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
            Restangular.setBaseUrl('http://localhost/api');

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

        it('should make sure that the additional methods are all defined', inject(function(LeagueService) {

            var league = null;
            LeagueService.getLeague(1).then(function(_league) {

                league = _league;

                expect(league.getTeam).toBeDefined();
                expect(league.getSubstitutes).toBeDefined();
                expect(league.getSubstitute).toBeDefined();
                expect(league.getWeek).toBeDefined();
                expect(league.createTeam).toBeDefined();
                expect(league.createSubstitute).toBeDefined();
                expect(league.createWeeks).toBeDefined();

            });

            $httpBackend.flush();

            expect(league).not.toBeNull();

        }));
    });

    describe('league:LeagueServiceTest:_createLeague', function() {

        var league = {};
        var $httpBackend;

        var leaguePostRegEx = new RegExp('/league/$');

        var postedLeagueData = null;

        beforeEach(inject(function(_$httpBackend_, Restangular) {
            $httpBackend = _$httpBackend_;

            Restangular.setRequestSuffix('/');
            Restangular.setBaseUrl('http://localhost/api');

            $httpBackend.whenPOST(leaguePostRegEx).respond(function(method, url, data, headers) {
                console.log('returning data');

                postedLeagueData = JSON.parse(data);
                return [200, data ]
            });

        }));

        afterEach(function() {
            postedLeagueData = null;
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

            var leagueCopy = angular.copy(leagueDefinition);

            $httpBackend.expectPOST(leaguePostRegEx);

            var dataReceived = null;
            LeagueService.createLeague(leagueDefinition).then(function(data) {
                dataReceived = data;
                expect(postedLeagueData.name).toBe(leagueCopy.name);
                expect(postedLeagueData.start_date).toBe('2015-06-20');
                expect(postedLeagueData.number_of_weeks).toBe(leagueCopy.numberOfWeeks);
                expect(postedLeagueData.number_of_games).toBe(leagueCopy.numberOfGames);
                expect(postedLeagueData.players_per_team).toBe(leagueCopy.playersPerTeam);
                expect(postedLeagueData.points_per_game).toBe(leagueCopy.pointsPerGame);
                expect(postedLeagueData.points_for_totals).toBe(leagueCopy.pointsForTotals);
                expect(postedLeagueData.handicap_max).toBe(leagueCopy.handicapMax);
                expect(postedLeagueData.handicap_percentage).toBe(leagueCopy.handicapPercentage);
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