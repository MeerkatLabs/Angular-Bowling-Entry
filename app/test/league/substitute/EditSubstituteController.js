/**
 * Created by rerobins on 3/16/15.
 */
describe('league:substitute:EditSubstituteController', function() {

    var $httpBackend;

    var substituteDefinition;
    var substitutePostRegExp = new RegExp('/substitute/1/$');
    var submittedSubstitute = null;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular, BOWLING_ROUTES) {

        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');

        substituteDefinition = {
            id: 1,
            name: 'Some Sub',
            handicap: 50

        };

        Restangular.restangularizeElement(null, substituteDefinition, BOWLING_ROUTES.SUBSTITUTE);

        $httpBackend.whenPUT(substitutePostRegExp).respond(function(method, url, data, headers) {
            submittedSubstitute = JSON.parse(data);
            return [201, data];
        });

    }));

    it('define scope variables', inject(function($controller) {

        var controller = $controller('EditSubstituteController', {substitute: substituteDefinition});

        expect(controller.substitute).toBeDefined();
        expect(controller.substitute.name).toBeDefined();
        expect(controller.substitute.handicap).toBeDefined();

    }));

    it('submit new substitute', inject(function($controller, $state) {

        spyOn($state, 'go');

        $httpBackend.expectPUT(substitutePostRegExp);

        var controller = $controller('EditSubstituteController', {substitute: substituteDefinition});

        controller.submit();

        $httpBackend.flush();

        expect(submittedSubstitute).toBeDefined();
        expect(submittedSubstitute.name).toBe(controller.substitute.name);
        expect(submittedSubstitute.handicap).toBe(controller.substitute.handicap);

        expect($state.go).toHaveBeenCalled();

    }));
});