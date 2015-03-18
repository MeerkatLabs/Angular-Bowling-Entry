/**
 * Bowling core module definition.
 *
 * Constant definition for creating route information.
 */
angular.module('bowling.entry.core', ['restangular', 'ngMaterial', 'ngMessages', 'ui.router', 'user'])
    .constant('BOWLING_ROUTES', {
        'LEAGUE': 'league',
        'TEAM': 'teams',
        'BOWLER': 'bowlers',
        'WEEK': 'weeks',
        'SUBSTITUTE': 'substitute',
        'MATCH': 'matches'
    });
