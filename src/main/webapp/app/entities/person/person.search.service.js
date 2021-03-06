(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('PersonSearch', PersonSearch);

    PersonSearch.$inject = ['$resource'];

    function PersonSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/people/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
