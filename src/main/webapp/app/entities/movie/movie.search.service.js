(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('MovieSearch', MovieSearch);

    MovieSearch.$inject = ['$resource'];

    function MovieSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/movies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
