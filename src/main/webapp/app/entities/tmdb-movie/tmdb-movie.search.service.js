(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('TMDBMovieSearch', TMDBMovieSearch);

    TMDBMovieSearch.$inject = ['$resource'];

    function TMDBMovieSearch($resource) {
        console.log("tmdb-movie.search.service.js:TMDBMovieSearch()");
        var resourceUrl =  'vmms/' + 'api/_search/tmdb-movies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
