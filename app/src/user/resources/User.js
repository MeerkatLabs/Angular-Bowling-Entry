/**
 * User Resource.
 */


/**
 * User Resource Definition.  This definition does not allow for the modification of any user in the system, it should
 * only be used to modify the currently logged in user.
 * @param $resource
 * @param {{}} configuration
 * @param {string} configuration.url
 * @returns {*}
 * @constructor
 */
var User = function($resource, configuration) {
    var User = $resource(configuration.url, {}, {},
        {stripTrailingSlashes:false}
    );

    return User;
};

/**
 * Provider that allows for the definition of a User Service.  Allows for the configuration of the URL that will be used
 * to retrieve user information from a REST API.
 * @constructor
 */
var UserProvider = function() {
    var userRESTURL = 'http://127.0.0.1:8000/bowling/api/self/';

    /**
     * Set the url that will be used to retrieve the user information from the REST service.
     * @param {string} url
     */
    this.setRestURL = function(url) {
        userRESTURL = url;
    };

    // Angular factory creation.
    this.$get = ['$resource', function($resource) {

        var configuration = {
            url: userRESTURL
        };

        return User($resource, configuration);
    }];

};

angular.module('user')
    .provider('User', [UserProvider]);