/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:CreateBowlerController', function() {

    var httpBackend, bowlerDefinition;

    var bowlerGetRegExp = new RegExp('/bowlers/1/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {

        $httpBackend = _$httpBackend_;

        bowlerDefinition = {
            id: 1,
            name: 'Bowler Name',
            handicap: 23
        };

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenGET(bowlerGetRegExp).respond(bowlerDefinition);
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

    it('should submit the edited object', inject(function($controller, $state, Restangular) {

        spyOn($state, 'go');

        $httpBackend.expectGET(new RegExp('/bowlers/1/$'));

        var bowler;
        Restangular.one('bowlers', 1).get().then(function(_bowler) {
            bowler = _bowler;
        });

        $httpBackend.flush();

        expect(bowler).toBeDefined();

        var controller = $controller('EditBowlerController', {'bowler': bowler}, {});

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});