/**
 * Created by rerobins on 3/15/15.
 */
describe('league:team:AddTeamController', function() {

    var httpBackend, leagueDefinition;

    var leagueGetRegExp = new RegExp('/league/1/$');
    var teamPostRegExp = new RegExp('/league/1/teams/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {

        $httpBackend = _$httpBackend_;

        leagueDefinition = {
            id: 1,
            name: 'League Name',
            teams: []
        };

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenGET(leagueGetRegExp).respond(leagueDefinition);
        $httpBackend.whenPOST(teamPostRegExp).respond(function(method, url, data, headers) {
            console.log('data', data);
            return [200, data ]
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var controller = $controller('AddTeamController', {league: {}}, {});

        expect(controller.team).toBeDefined();

    }));

    it('should submit the created object', inject(function($controller, $state, Restangular) {

        spyOn($state, 'go');

        $httpBackend.expectGET(leagueGetRegExp);

        var league;
        Restangular.one('league', 1).get().then(function(_league) {
            league = _league;
        });

        $httpBackend.flush();

        expect(league).toBeDefined();

        var controller = $controller('AddTeamController', {'league': league}, {});

        $httpBackend.expectPOST(teamPostRegExp);

        controller.team.name = 'Team Name';
        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});