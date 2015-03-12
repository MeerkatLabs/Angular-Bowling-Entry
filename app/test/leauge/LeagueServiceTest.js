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
    });

});