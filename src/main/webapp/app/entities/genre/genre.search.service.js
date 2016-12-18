(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('GenreSearch', GenreSearch);

    GenreSearch.$inject = ['$resource'];

    function GenreSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/genres/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
