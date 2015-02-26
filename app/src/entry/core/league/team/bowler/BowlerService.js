/**
 * Created by rerobins on 2/24/15.
 */
var BowlerService = function() {
    var BowlerService = {};

    BowlerService.createBowler = function(team, bowler) {
        return team.all('bowlers').post(bowler);
    };

    BowlerService.editBowler = function(bowler) {
        return bowler.put();
    };

    return BowlerService;
};

angular.module('bowling.entry.core')
    .factory('BowlerService', [BowlerService]);