/**
 * Parsing functionality that is added to the league models for translating between javascript and JSON data.
 */

/**
 * Method that will translate an element into JavaScript code style.
 * @param element
 * @constructor
 */
var WeekTransformer = function(element) {

    console.log('Parsing incoming week data');

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

    console.log('Translating Week', element);

    element.date = $filter('date')(element.date, 'yyyy-MM-dd');
    element.week_number = element.weekNumber;

    delete element.weekNumber;

    console.log('Result', element);

    return element;
};

angular.module('bowling.entry.core')
    .run(['Restangular', '$filter', function(Restangular, $filter) {
        Restangular.addElementTransformer('weeks', false, WeekTransformer);
        Restangular.addRequestInterceptor(function(element, operation, what, url) {
            if (what === 'weeks' && (operation === 'put' || operation === 'post')) {
                return WeekRequestInterceptor(element, $filter);
            }

            return element;
        });
    }]);