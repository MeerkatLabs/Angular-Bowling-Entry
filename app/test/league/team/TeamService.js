/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:TeamService', function() {

    var $httpBackend;
    var league;
    var leagueRegEx = new RegExp('/league/1/$');
    var teamRegEx = new RegExp('/league/1/teams/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPOST(teamRegEx).respond(function(method, url, data, headers) {
            console.log('returning data');

            return [200, data ]
        });

        $httpBackend.whenGET(leagueRegEx).respond({id: 1});

        Restangular.one('league', 1).get().then(function(_league) {
            league = _league;
        });

        $httpBackend.flush();

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a new team', inject(function(TeamService) {

        var configuration = {
            name: 'Team Name'
        };

        $httpBackend.expectPOST(teamRegEx);

        var team;
        TeamService.createTeam(configuration, league).then(function(_team) {
            team = _team;
            expect(team.name).toBe(configuration.name);
        });

        $httpBackend.flush();
        expect(team).not.toBeNull();

    }));

});