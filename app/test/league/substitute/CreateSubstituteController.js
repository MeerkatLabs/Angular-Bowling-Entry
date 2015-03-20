/**
 * Created by rerobins on 3/16/15.
 */
describe('league:substitute:CreateSubstituteController', function() {

    var $httpBackend;

    var leagueDefinition;
    var substitutePostRegExp = new RegExp('/substitute/$');
    var submittedSubstitute = null;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        leagueDefinition = {
            id: 1,
            name: 'Some League',
            teams: [],
            weeks: []
        };

        Restangular.restangularizeElement(null, leagueDefinition, BOWLING_ROUTES.LEAGUE);

        $httpBackend.whenPOST(substitutePostRegExp).respond(function(method, url, data, headers) {
            console.log(data);
            submittedSubstitute = JSON.parse(data);
            return [201, data];
        });

    }));

    it('define scope variables', inject(function($controller) {

        var controller = $controller('CreateSubstituteController', {league: leagueDefinition});

        expect(controller.substitute).toBeDefined();
        expect(controller.substitute.name).toBeDefined();
        expect(controller.substitute.average).toBeDefined();

    }));

    it('submit new substitute', inject(function($controller, $state) {

        spyOn($state, 'go');

        $httpBackend.expectPOST(substitutePostRegExp);

        var controller = $controller('CreateSubstituteController', {league: leagueDefinition});

        controller.submit();

        $httpBackend.flush();

        expect(submittedSubstitute).toBeDefined();
        expect(submittedSubstitute.name).toBe(controller.substitute.name);
        expect(submittedSubstitute.average).toBe(controller.substitute.average);

        expect($state.go).toHaveBeenCalled();

    }));
});