/**
 * Created by rerobins on 3/15/15.
 */
describe('league:weeks:EditWeeksController', function() {

    beforeEach(module('bowling.entry.core'));

    it('should test the variables stored in the controller', inject(function($controller, Restangular) {
        var league = {
            id: 1,
            name: 'Bowling League',
            start_date: '2014-01-01',
            number_of_weeks: 4,
            weeks: [
                {
                    week_number: 1,
                    date: '2014-01-01'
                },
                {
                    week_number: 2,
                    date: '2014-01-08'
                },
                {
                    week_number: 3,
                    date: '2014-01-15'
                },
                {
                    week_number: 4,
                    date: '2014-01-22'
                }
            ]
        };

        Restangular.restangularizeElement(null, league, 'league', {id: 1});

        var controller = $controller('EditWeeksController', {league: league}, {});

        expect(controller.weeks.length).toBe(league.numberOfWeeks);
        expect(controller.weeks[0].date).toEqual(new Date(2014,0,1));
        expect(controller.weeks[0].weekNumber).toBe(1);
    }));

});