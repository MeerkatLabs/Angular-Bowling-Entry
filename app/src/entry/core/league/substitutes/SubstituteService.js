/**
 * Service that will allow for the manipulation of services.
 */
var SubstituteService = function() {

    var SubstituteService = {};

    SubstituteService.editSubstitute = function(sub) {
        return sub.put();
    };

    return SubstituteService;

};

angular.module('bowling.entry.core')
    .factory('SubstituteService', [SubstituteService]);