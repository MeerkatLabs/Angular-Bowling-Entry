/**
 * Bowler Service factory definition.
 */
var BowlerService = function() {
    var BowlerService = {};

    /**
     * Create a new bowler based on the definition.
     * @param team
     * @param bowler
     * @returns {*}
     */
    BowlerService.createBowler = function(team, bowler) {
        return team.all('bowlers').post(bowler);
    };

    /**
     * Edit the details of a bowler definition.
     * @param bowler
     * @returns {*}
     */
    BowlerService.editBowler = function(bowler) {
        return bowler.put();
    };

    return BowlerService;
};

angular.module('bowling.entry.core')
    .factory('BowlerService', [BowlerService]);