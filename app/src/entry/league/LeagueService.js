/**
 * Definition of the league service.
 */

var LeagueService = function(League) {

    var LeagueService = {};

    LeagueService.createLeague = function(leagueConfiguration) {

    };

    return LeagueService;

};

angular.module('bowling.entry.league')
    .factory('LeagueService', ['League', LeagueService]);
