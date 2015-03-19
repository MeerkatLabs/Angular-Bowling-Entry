/**
 * Created by rerobins on 3/19/15.
 */
describe('league:LeagueDetailController', function() {

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenDELETE(new RegExp('/league/1/$')).respond(function(method, url, data, headers) {
            console.log('deleting league');
            return [204, {}];
        });

        $httpBackend.whenGET(new RegExp('/substitute/$')).respond([200, []]);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should attempt to delete the league provided', inject(function($controller, $state, Restangular, BOWLING_ROUTES) {

        spyOn($state, 'go');

        var league = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Some League'
        }, BOWLING_ROUTES.LEAGUE);


        $httpBackend.expectGET(new RegExp('/substitute/$'));

        var controller = $controller('LeagueDetailController', { league: league });

        $httpBackend.flush();

        $httpBackend.expectDELETE(new RegExp('/league/1/$'));

        controller.deleteLeague();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});