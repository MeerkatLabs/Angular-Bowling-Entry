/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:CreateBowlerController', function() {

    var httpBackend;

    var bowlerCreationRegExp = new RegExp('/bowlers/$');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_) {

        $httpBackend = _$httpBackend_;

        $httpBackend.whenPOST(bowlerCreationRegExp).respond(function(status, data, headers, statusText) {
            return [201, data];
        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var team = jasmine.createSpyObj('team', ['all']);

        var teamBowlers = jasmine.createSpyObj('teamBowlers', ['post']);

        team.all.and.returnValue(teamBowlers);

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        expect(controller.bowler).toBeDefined();

    }));

    it('should submit the newly created object', inject(function($controller) {

        var team = jasmine.createSpyObj('team', ['all']);
        var teamBowlers = jasmine.createSpyObj('teamBowlers', ['post']);
        team.all.and.returnValue(teamBowlers);
        var bowlerSubmissionPromise = jasmine.createSpyObj('bowlerSubmissionPromise', ['then']);
        teamBowlers.post.and.returnValue(bowlerSubmissionPromise);

        var controller = $controller('CreateBowlerController', {'team': team}, {});

        controller.bowler.name = 'New Bowler Name';
        controller.bowler.handicap = 34;

        controller.submit();

        expect(teamBowlers.post).toHaveBeenCalled();

        var arguments = teamBowlers.post.calls.mostRecent().args;

        expect(arguments[0].name).toEqual(controller.bowler.name);
        expect(arguments[0].handicap).toEqual(controller.bowler.handicap);

    }));

});