/**
 * Created by rerobins on 3/13/15.
 */
describe('league:team:bowler:EditBowlerController', function() {

    var $httpBackend, bowlerDefinition, teamDefinition;

    var method, url, data, headers;

    var bowlerGetRegExp = new RegExp('/bowlers/1/');

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        teamDefinition = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Team Name',
            bowlers: []
        }, BOWLING_ROUTES.TEAM);

        bowlerDefinition = Restangular.restangularizeElement(teamDefinition, {
            id: 1,
            name: 'Bowler Name',
            handicap: 23
        }, BOWLING_ROUTES.BOWLER);

        teamDefinition.bowlers.push(bowlerDefinition);

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        $httpBackend.whenPUT(bowlerGetRegExp).respond(function(_method, _url, _data, _headers) {

            method = _method;
            url = _url;
            data = _data;
            headers = _headers;

            return [200, data ]
        });

        expect(teamDefinition.bowlers.length).toBe(1);

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should define the required values in the scope', inject(function($controller) {

        var team = jasmine.createSpyObj('team', ['all']);
        var controller = $controller('EditBowlerController', {'bowler': bowlerDefinition, 'team': teamDefinition}, {});

        expect(controller.bowler).toBeDefined();

    }));

    it('should submit the edited object', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('EditBowlerController', {'bowler': bowlerDefinition, 'team': teamDefinition}, {});

        controller.submit();

        $httpBackend.flush();

        expect($state.go).toHaveBeenCalled();

    }));

    it('should make a bowler a substitute', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('EditBowlerController', {'bowler': bowlerDefinition, 'team': teamDefinition}, {});

        controller.makeBowlerSub();

        $httpBackend.flush();

        expect(url).toContain('removeTeam=true');

        expect($state.go).toHaveBeenCalled();

        expect(teamDefinition.bowlers.length).toBe(0);

    }));

});