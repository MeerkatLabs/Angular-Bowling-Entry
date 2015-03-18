/**
 * Parsing functionality that is added to the league models for translating between javascript and JSON data.
 */

/**
 * Method that will translate an element into JavaScript code style.
 * @param element
 * @param Restangular
 * @param BOWLING_ROUTES
 * @constructor
 */
var LeagueTransformer = function(element, Restangular, BOWLING_ROUTES) {

    console.log('Parsing incoming league data');

    //id, name, teams, weeks already have good formatting.

    // Translate start_date into a JS Date object.
    var startDate = new Date(element.start_date);
    element.startDate = new Date(startDate.getTime() + (startDate.getTimezoneOffset() * 60 * 1000));

    element.numberOfWeeks = element.number_of_weeks;
    element.numberOfGames = element.number_of_games;
    element.playersPerTeam = element.players_per_team;
    element.pointsPerGame = element.points_per_game;
    element.pointsForTotals = element.points_for_totals;
    element.handicapMax = element.handicap_max;
    element.handicapPercentage = element.handicap_percentage;

    if (element.weeks && angular.isArray(element.weeks)) {
        Restangular.restangularizeCollection(element, element.weeks, BOWLING_ROUTES.WEEK);
    }

    delete element.start_date;
    delete element.number_of_weeks;
    delete element.number_of_games;
    delete element.players_per_team;
    delete element.points_per_game;
    delete element.points_for_totals;
    delete element.handicap_max;
    delete element.handicap_percentage;

    return element;
};

/**
 * Method that will translate an element into something that can be transmitted to the REST service.
 * @param element
 * @param $filter
 * @constructor
 */
var LeagueRequestInterceptor = function(element, $filter) {

    console.log('Translating League', element);

    element.start_date = $filter('date')(element.startDate, 'yyyy-MM-dd');
    element.number_of_weeks = element.numberOfWeeks;
    element.number_of_games = element.numberOfGames;
    element.players_per_team = element.playersPerTeam;
    element.points_per_game = element.pointsPerGame;
    element.points_for_totals = element.pointsForTotals;
    element.handicap_max = element.handicapMax;
    element.handicap_percentage = element.handicapPercentage;

    delete element.startDate;
    delete element.numberOfWeeks;
    delete element.numberOfGames;
    delete element.playersPerTeam;
    delete element.pointsPerGame;
    delete element.pointsForTotals;
    delete element.handicapMax;
    delete element.handicapPercentage;

    console.log('Result', element);

    return element;
};

angular.module('bowling.entry.core')
    .run(['$filter', 'Restangular', 'BOWLING_ROUTES', function($filter, Restangular, BOWLING_ROUTES) {
        Restangular.addElementTransformer(BOWLING_ROUTES.LEAGUE, false, function(element) {
            return LeagueTransformer(element, Restangular, BOWLING_ROUTES);
        });
        Restangular.addRequestInterceptor(function(element, operation, what, url) {
            if (what === BOWLING_ROUTES.LEAGUE && (operation === 'put' || operation === 'post')) {
                return LeagueRequestInterceptor(element, $filter);
            }

            return element;
        });
    }]);