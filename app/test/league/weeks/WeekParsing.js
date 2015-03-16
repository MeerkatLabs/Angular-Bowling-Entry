/**
 * Created by rerobins on 3/16/15.
 */
describe('league:weeks:WeekParsing', function() {

    var $filter;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('should test the parsing of an incoming week values', function() {
        var incomingWeekValue = {
            "id": 3,
            "week_number": 3,
            "date": '2015-05-15',
            "matches": []
        };

        var incomingCopy = angular.copy(incomingWeekValue);

        var week = WeekTransformer(incomingWeekValue);

        expect(week).toBeDefined();

        expect(week.id).toBe(incomingCopy.id);
        expect(week.weekNumber).toBe(incomingCopy.week_number);
        expect(week.date).toEqual(new Date(2015, 4, 15));  // Because months for some reason are 0 indexed.
        expect(week.matches).toBeDefined();
    });

    it('should verify the outgoing field values', function() {
        var incomingWeekValue = {
            "id": 3,
            "week_number": 3,
            "date": '2015-05-15',
            "matches": []
        };

        var week = LeagueTransformer(incomingWeekValue);

        expect(week).toBeDefined();
        week.weekNumber = 5;
        week.date = new Date(2015, 2, 14);

        var weekCopy = angular.copy(week);

        var outgoingWeekValue = WeekRequestInterceptor(week, $filter);

        expect(outgoingWeekValue).toBeDefined();
        expect(outgoingWeekValue.id).toBeDefined();
        expect(outgoingWeekValue.week_number).toBeDefined();
        expect(outgoingWeekValue.weekNumber).not.toBeDefined();
        expect(outgoingWeekValue.date).toBeDefined();
        expect(outgoingWeekValue.matches).toBeDefined();


        expect(outgoingWeekValue.id).toBe(weekCopy.id);
        expect(outgoingWeekValue.week_number).toBe(weekCopy.weekNumber);
        expect(outgoingWeekValue.date).toEqual('2015-03-14');  // Because months for some reason are 0 indexed.

    });

});