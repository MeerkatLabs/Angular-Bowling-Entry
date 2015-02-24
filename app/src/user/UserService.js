/**
 * Service that will fetch the user credentials from the database.
 * @param $q
 * @param $rootScope
 * @param Restangular
 * @param USER_EVENTS
 */
var UserService = function($q, $rootScope, Restangular, USER_EVENTS) {

    // Promise that will always return the currently found user.
    var deferred = null;

    // User service that is being created.
    var UserService = {};

    /**
     * Return a promise that will resolve to the user.
     * @returns {*}
     */
    UserService.getUser = function() {
        if (deferred === null) {
            deferred = $q(function(resolve, reject) {
                resolve(Restangular.one('self').get());
            });
        }

        return deferred;
    };

    /**
     * Clear out the cached user promise.  This means that the next call to getUser will force a login.
     */
    UserService.clearUser = function() {
        if (deferred !== null) {
            deferred = null;
            $rootScope.$broadcast(USER_EVENTS.USER_CLEARED);
        }
    };

    /**
     * Allows for a quick query to determine if the user has been defined from the back-end or not.
     * @returns {boolean}
     */
    UserService.isUserDefined = function() {
        return deferred !== null;
    };

    return UserService;

};

angular.module('user')
    .factory('UserService', ['$q', '$rootScope', 'Restangular', 'USER_EVENTS', UserService]);