/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:EditBowlerController', function() {

    var httpBackend, bowlerDefinition;

    var bowlerGetRegExp = new RegExp('/bowlers/1/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        bowlerDefinition = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Bowler Name',
            handicap: 23
        }, BOWLING_ROUTES.BOWLER);

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPUT(bowlerGetRegExp).respond(function(method, url, data, headers) {
            return [200, data ]
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var team = jasmine.createSpyObj('team', ['all']);
        var controller = $controller('EditBowlerController', {'bowler': bowlerDefinition}, {});

        expect(controller.bowler).toBeDefined();

    }));

    it('should submit the edited object', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('EditBowlerController', {'bowler': bowlerDefinition}, {});

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});