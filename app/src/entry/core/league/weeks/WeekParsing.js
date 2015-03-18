/**
 * Parsing functionality that is added to the league models for translating between javascript and JSON data.
 */

/**
 * Method that will translate an element into JavaScript code style.
 * @param element
 * @constructor
 */
var WeekTransformer = function(element) {
    //The only values that need to be translated are the week_number and the date.

    // Translate start_date into a JS Date object.
    var _date = new Date(element.date);
    element.date = new Date(_date.getTime() + (_date.getTimezoneOffset() * 60 * 1000));
    element.weekNumber = element.week_number;

    delete element.week_number;

    return element;
};

/**
 * Method that will translate an element into something that can be transmitted to the REST service.
 * @param element
 * @param $filter
 * @constructor
 */
var WeekRequestInterceptor = function(element, $filter) {

    element.date = $filter('date')(element.date, 'yyyy-MM-dd');
    element.week_number = element.weekNumber;

    delete element.weekNumber;

    return element;
};

angular.module('bowling.entry.core')
    .run(['Restangular', 'BOWLING_ROUTES', function(Restangular, BOWLING_ROUTES) {
        Restangular.configuration.getIdFromElem = function(element) {
            if (element.route === BOWLING_ROUTES.WEEK && angular.isDefined(element.weekNumber)) {
                return element.weekNumber;
            } else {
                return Restangular.configuration.getFieldFromElem(Restangular.configuration.restangularFields.id, element);
            }
        };

    }]).run(['$filter', 'Restangular', 'BOWLING_ROUTES', function($filter, Restangular, BOWLING_ROUTES) {
        Restangular.addElementTransformer(BOWLING_ROUTES.WEEK, false, WeekTransformer);
        Restangular.addRequestInterceptor(function(element, operation, what, url) {
            if (what === BOWLING_ROUTES.WEEK && (operation === 'put' || operation === 'post')) {
                return WeekRequestInterceptor(element, $filter);
            }

            return element;
        });
    }]);