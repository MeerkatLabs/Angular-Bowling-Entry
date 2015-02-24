/**
 * Definition of a user fetching service.
 */

angular.module('user', ['restangular'])
    .constant('USER_EVENTS', {
        /**
         * Event fired off when a user is loaded successfully from the back-end.
         */
        USER_DEFINED: 'user::defined',

        /**
         * Event fied off when a user is removed from the definition.
         */
        USER_CLEARED: 'user::cleared'
    });
