/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:CreateBowlerController', function() {

    var httpBackend;

    var bowlerCreationRegExp = new RegExp('/bowlers/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {

        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPOST(bowlerCreationRegExp).respond(function(status, data, headers, statusText) {
            return [201, data];
        });

        $httpBackend.whenGET(new RegExp('/teams/1/$')).respond({
            id: 1,
            name: 'Team Name',
            bowlers: []
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var team = jasmine.createSpyObj('team', ['all']);
        var controller = $controller('CreateBowlerController', {'team': team}, {});

        expect(controller.bowler).toBeDefined();

    }));

    it('should submit the newly created object', inject(function($controller, $state, Restangular) {

        spyOn($state, 'go');

        $httpBackend.expectGET(new RegExp('/teams/1/$'));

        var team;
        Restangular.one('teams', 1).get().then(function(_team) {
            team = _team;
        });

        $httpBackend.flush();

        expect(team).toBeDefined();
        expect(team.createBowler).toBeDefined();

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        controller.bowler.name = 'New Bowler Name';
        controller.bowler.handicap = 34;

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

});