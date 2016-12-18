(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('CrewSearch', CrewSearch);

    CrewSearch.$inject = ['$resource'];

    function CrewSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/crews/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
