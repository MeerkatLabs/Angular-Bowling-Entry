/**
 * Created by rerobins on 3/15/15.
 */
describe('league:team:AddTeamController', function() {

    var teamDefinition;

    beforeEach(module('bowling.entry.core'));

    beforeEach(function() {

        teamDefinition = {
            id: 1,
            name: 'Team Name',
            bowlers: []
        };

    });

    it('should define the required values in the scope', inject(function($controller) {

        var controller = $controller('TeamDetailController', {team: teamDefinition}, {});

        expect(controller.team).toBeDefined();
        expect(controller.team).toBe(teamDefinition);

    }));

});