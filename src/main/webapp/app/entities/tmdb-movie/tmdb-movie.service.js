(function() {
    'use strict';
    angular
        .module('vmwebApp')
        .factory('TMDBMovie', TMDBMovie);

    TMDBMovie.$inject = ['$resource'];

    function TMDBMovie ($resource) {
        var resourceUrl =  'vmms/' + 'api/tmdb-movies/:id';
        console.log("tmdb-movie.service.js:TMDBMovie()");

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
