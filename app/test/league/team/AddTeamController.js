/**
 * Created by rerobins on 3/15/15.
 */
describe('league:team:AddTeamController', function() {

    var httpBackend, leagueDefinition;

    var teamPostRegExp = new RegExp('/league/1/teams/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        leagueDefinition = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'League Name',
            teams: []
        }, BOWLING_ROUTES.LEAGUE);

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

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

    it('should submit the created object', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('AddTeamController', {'league': leagueDefinition}, {});

        $httpBackend.expectPOST(teamPostRegExp);

        controller.team.name = 'Team Name';
        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});