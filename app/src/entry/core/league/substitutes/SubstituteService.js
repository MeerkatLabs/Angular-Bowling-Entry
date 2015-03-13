/**
 * Service that will allow for the manipulation of services.
 */
var SubstituteService = function() {

    var SubstituteService = {};

    SubstituteService.createSubstitute = function(league, configuration) {
        return league.all('substitute').post(configuration);

    };

    SubstituteService.editSubstitute = function(sub) {
        return sub.put();
    };

    return SubstituteService;

};

angular.module('bowling.entry.core')
    .factory('SubstituteService', [SubstituteService]);