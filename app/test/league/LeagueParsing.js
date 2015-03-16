/**
 * Created by rerobins on 3/15/15.
 */
describe('league:LeagueParsing', function() {

    var $filter;

    beforeEach(module('bowling.entry.core'));

    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('should test the parsing of an incoming league values', function() {
        var incomingLeagueValue = {
            "id": 3,
            "name": "Polar Bowler Ball League",
            "start_date": "2014-11-04",
            "number_of_weeks": 18,
            "number_of_games": 3,
            "players_per_team": 5,
            "points_per_game": 2,
            "points_for_totals": 2,
            "handicap_max": 200,
            "handicap_percentage": 100,
            "teams": [],
            "weeks": []
        };

        var incomingCopy = angular.copy(incomingLeagueValue);

        var league = LeagueTransformer(incomingLeagueValue);

        expect(league).toBeDefined();

        expect(league.id).toBe(incomingCopy.id);
        expect(league.name).toBe(incomingCopy.name);
        expect(league.startDate).toEqual(new Date(2014, 10, 4));  // Because months for some reason are 0 indexed.
        expect(league.numberOfWeeks).toBe(incomingCopy.number_of_weeks);
        expect(league.numberOfGames).toBe(incomingCopy.number_of_games);
        expect(league.playersPerTeam).toBe(incomingCopy.players_per_team);
        expect(league.pointsPerGame).toBe(incomingCopy.points_per_game);
        expect(league.pointsForTotals).toBe(incomingCopy.points_for_totals);
        expect(league.handicapMax).toBe(incomingCopy.handicap_max);
        expect(league.handicapPercentage).toBe(incomingCopy.handicap_percentage);
        expect(league.teams).toBeDefined();
        expect(league.weeks).toBeDefined();
    });

    it('should verify the outgoing field values', function() {
        var incomingLeagueValue = {
            "id": 3,
            "name": "Polar Bowler Ball League",
            "start_date": "2014-11-04",
            "number_of_weeks": 18,
            "number_of_games": 3,
            "players_per_team": 5,
            "points_per_game": 2,
            "points_for_totals": 2,
            "handicap_max": 200,
            "handicap_percentage": 100,
            "teams": [],
            "weeks": []
        };

        var league = LeagueTransformer(incomingLeagueValue);

        expect(league).toBeDefined();
        league.startDate = new Date(2015, 11, 4);
        league.numberOfWeeks = 17;
        league.numberOfGames = 2;
        league.playersPerTeam = 4;
        league.pointsPerGame = 1;
        league.pointsForTotals = 3;
        league.handicapMax = 210;
        league.handicapPercentage = 90;

        var leagueCopy = angular.copy(league);

        var outgoingLeagueValue = LeagueRequestInterceptor(league, $filter);

        expect(outgoingLeagueValue).toBeDefined();
        expect(outgoingLeagueValue.id).toBeDefined();
        expect(outgoingLeagueValue.name).toBeDefined();
        expect(outgoingLeagueValue.startDate).not.toBeDefined();
        expect(outgoingLeagueValue.numberOfWeeks).not.toBeDefined();
        expect(outgoingLeagueValue.numberOfGames).not.toBeDefined();
        expect(outgoingLeagueValue.playersPerTeam).not.toBeDefined();
        expect(outgoingLeagueValue.pointsPerGame).not.toBeDefined();
        expect(outgoingLeagueValue.pointsForTotals).not.toBeDefined();
        expect(outgoingLeagueValue.handicapMax).not.toBeDefined();
        expect(outgoingLeagueValue.handicapPercentage).not.toBeDefined();
        expect(outgoingLeagueValue.teams).toBeDefined();
        expect(outgoingLeagueValue.weeks).toBeDefined();

        expect(outgoingLeagueValue.id).toBe(leagueCopy.id);
        expect(outgoingLeagueValue.name).toBe(leagueCopy.name);
        expect(outgoingLeagueValue.start_date).toEqual('2015-12-04');  // Because months for some reason are 0 indexed.
        expect(outgoingLeagueValue.number_of_weeks).toBe(leagueCopy.numberOfWeeks);
        expect(outgoingLeagueValue.number_of_games).toBe(leagueCopy.numberOfGames);
        expect(outgoingLeagueValue.players_per_team).toBe(leagueCopy.playersPerTeam);
        expect(outgoingLeagueValue.points_per_game).toBe(leagueCopy.pointsPerGame);
        expect(outgoingLeagueValue.points_for_totals).toBe(leagueCopy.pointsForTotals);
        expect(outgoingLeagueValue.handicap_max).toBe(leagueCopy.handicapMax);
        expect(outgoingLeagueValue.handicap_percentage).toBe(leagueCopy.handicapPercentage);

    });

});