/**
 * Created by rerobins on 3/15/15.
 */
describe('league:weeks:CreateWeeksController', function() {

    beforeEach(module('bowling.entry.core'));

    it('should test the variables stored in the controller', inject(function($controller, Restangular) {
        var league = {
            id: 1,
            name: 'Bowling League',
            start_date: '2015-11-05',
            number_of_weeks: 10
        };

        Restangular.restangularizeElement(null, league, 'league', {id: 1});

        var controller = $controller('CreateWeeksController', {league: league}, {});

        expect(controller.weeks.length).toBe(league.numberOfWeeks);
        expect(controller.weeks[0].date).toEqual(new Date(2015,10,5));
        expect(controller.weeks[0].weekNumber).toBe(1);
    }));

});