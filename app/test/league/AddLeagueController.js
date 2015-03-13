/**
 * Created by rerobins on 3/12/15.
 */
describe('league::AddLeagueController', function() {

    var $httpBackend;

    beforeEach(module('bowling.entry.core'));


    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;

    }));

    it('should define a league object to define', inject(function($controller) {

        var controller = $controller('AddLeagueController', {}, {});

        expect(controller.league).toBeDefined();

        console.log(JSON.stringify(controller.league));

    }));

});