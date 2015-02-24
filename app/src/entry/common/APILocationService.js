/**
 * Provider responsible for defining and providing all of the resources and services with a common API prefix value.
 */

/**
 * Service definition that will allow the lookup of the api prefix for resources.
 * @param {string} apiPrefix
 * @constructor
 */
var APILocationService = function(apiPrefix) {

    var prefix = apiPrefix;

    /**
     * Prefix getter.
     * @returns {string}
     */
    this.getPrefix = function() {
        return prefix;
    };

};

/**
 * Provider definition that allows for the setting of the prefix.
 * @constructor
 */
var APILocationServiceProvider = function() {

    var apiPrefix = 'http://127.0.0.1:8000/bowling/api';

    /**
     * Set the API prefix value for all of the resource definitions.
     * @param {string} prefix
     */
    this.setApiPrefix = function(prefix) {
        apiPrefix = prefix;
    };

    // Provider service getter.
    this.$get = [function() {
        return new APILocationService(apiPrefix);
    }];

};

angular.module('bowling.entry.common')
    .provider('APILocationService', APILocationServiceProvider);
