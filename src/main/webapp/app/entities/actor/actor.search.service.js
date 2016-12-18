(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('ActorSearch', ActorSearch);

    ActorSearch.$inject = ['$resource'];

    function ActorSearch($resource) {
        var resourceUrl =  'vmms/' + 'api/_search/actors/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
