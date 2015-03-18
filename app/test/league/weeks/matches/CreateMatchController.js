/**
 * Created by rerobins on 3/17/15.
 */
describe('leage:weeks:matches:CreateMatchController', function() {

    var $httpBackend, week, league, newMatch;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$httpBackend_, Restangular) {
        $httpBackend = _$httpBackend_;

        Restangular.setRequestSuffix('/');
        Restangular.setBaseUrl('http://localhost/api');
        newMatch = null;

        $httpBackend.whenPOST(new RegExp('/matches/$')).respond(function(method, url, data, headers) {
            console.log('returning data new match');

            newMatch = JSON.parse(data);

            return [200, data ];
        });
    }));

    beforeEach(inject(function(Restangular, BOWLING_ROUTES) {

        league = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Some League'
        }, BOWLING_ROUTES.LEAGUE);

        week = Restangular.restangularizeElement(league, {
            id: 1,
            week_number: 1,
            date: '2015-01-01'
        }, BOWLING_ROUTES.WEEK);

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should submit the match data', inject(function($controller, $state) {

        spyOn($state, 'go');

        var controller = $controller('CreateMatchController', {league: league, week: week}, {});

        expect(controller.match).toBeDefined();
        expect(controller.match.team1).toBeDefined();
        expect(controller.match.team2).toBeDefined();

        controller.match.team1.lane = 2;
        controller.match.team2.lane = 3;

        controller.match.team1.team = {
            id: 5
        };
        controller.match.team2.team = {
            id: 6
        };

        $httpBackend.expectPOST(new RegExp('/matches/$'));

        controller.submit();

        $httpBackend.flush();

        expect(newMatch).toBeDefined();
        expect(newMatch).not.toBeNull();

        expect(newMatch.lanes).toBe('2,3');
        expect(newMatch.team1_definition).toBe(5);
        expect(newMatch.team2_definition).toBe(6);

        expect($state.go).toHaveBeenCalled();
    }));


});