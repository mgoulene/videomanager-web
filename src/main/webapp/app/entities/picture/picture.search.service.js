(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('PictureSearch', PictureSearch);

    PictureSearch.$inject = ['$resource'];

    function PictureSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/pictures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
