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

            var _deferred = Restangular.one('self').get().then(function(user) {
                // After resolved, replace the cache with the temporary value.
                deferred = _deferred;
                $rootScope.$broadcast(USER_EVENTS.USER_DEFINED, user);
                return user;
            }).catch(function(message) {
                console.log('Error fetching user: ' + message);
                return $q.reject(message);
            });

            // Until the user has been resolved, return a temporary value.
            return _deferred;

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