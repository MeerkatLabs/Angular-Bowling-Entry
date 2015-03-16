/**
 * Created by rerobins on 3/16/15.
 */
describe('league:weeks:WeekMixin', function() {

    beforeEach(module('bowling.entry.core'));

    it('should merge in the league mixin', inject(function(Restangular) {

        var incomingWeek = {
            "id": 1,
            "week_number": 1,
            "date": "2015-02-24",
            "matches": [
                1
            ]
        };

        Restangular.restangularizeElement(null, incomingWeek, 'weeks');

        expect(incomingWeek.getMatches).toBeDefined();
        expect(incomingWeek.getMatch).toBeDefined();

    }));

});