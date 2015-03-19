/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:CreateBowlerController', function() {

    var $httpBackend, team;

    var bowlerCreationRegExp = new RegExp('/bowlers/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPOST(bowlerCreationRegExp).respond(function(status, data, headers, statusText) {
            return [201, data];
        });

        team = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Team Name',
            bowlers: []
        }, BOWLING_ROUTES.TEAM);

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        expect(controller.bowler).toBeDefined();

    }));

    it('should submit the newly created object', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        controller.bowler.name = 'New Bowler Name';
        controller.bowler.handicap = 34;

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

    it('should not change states when adding another', inject(function($controller, $state, $mdToast) {

        spyOn($state, 'go');
        spyOn($mdToast, 'show');

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        controller.bowler.name = 'New Bowler Name';
        controller.bowler.handicap = 34;

        controller.submit(true);

        $httpBackend.flush();

        expect($state.go).not.toHaveBeenCalled();
        expect($mdToast.show).toHaveBeenCalled();

        expect(controller.bowler.name).toBe('');
        expect(controller.bowler.handicap).toBeNull();

    }));

});