/**
 * Created by rerobins on 3/15/15.
 */
describe('league:team:AddTeamController', function() {

    var teamDefinition;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(Restangular, BOWLING_ROUTES) {

        teamDefinition = Restangular.restangularizeElement(null, {
            id: 1,
            name: 'Team Name',
            bowlers: []
        }, BOWLING_ROUTES.TEAM);

    }));

    it('should define the required values in the scope', inject(function($controller) {

        var controller = $controller('TeamDetailController', {team: teamDefinition}, {});

        expect(controller.team).toBeDefined();
        expect(controller.team).toBe(teamDefinition);

    }));

});