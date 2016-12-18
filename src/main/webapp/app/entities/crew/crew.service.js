(function() {
    'use strict';
    angular
        .module('vmwebApp')
        .factory('Crew', Crew);

    Crew.$inject = ['$resource'];

    function Crew ($resource) {
        var resourceUrl =  'vmms/' + 'api/crews/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
