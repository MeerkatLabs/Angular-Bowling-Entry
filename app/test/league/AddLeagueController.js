/**
 * Created by rerobins on 3/12/15.
 */
describe('league::AddLeagueController', function() {

    var $httpBackend;

    beforeEach(module('karma.templates'));
    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPOST(new RegExp('/league/$')).respond(function(method, url, data, headers) {
            console.log('returning data new league');

            data.id = 5000;

            return [200, data ];
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should define a league object to define', inject(function($controller) {

        var controller = $controller('AddLeagueController', {}, {});

        expect(controller.league).toBeDefined();

        console.log(JSON.stringify(controller.league));

    }));

    it('should submit the league and then goto the detail page of the state', inject(function($controller, $state) {

        var controller = $controller('AddLeagueController', {}, {});
        spyOn($state, 'go');

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();
        expect($state.go.calls.mostRecent().args[0]).toBe('^.league.detail');

    }));

});