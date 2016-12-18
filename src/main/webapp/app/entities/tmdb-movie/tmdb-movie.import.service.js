(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .factory('TMDBMovieImport', TMDBMovieImport);

    TMDBMovieImport.$inject = ['$resource'];

    function TMDBMovieImport($resource) {
        console.log("tmdb-movie.import.service.js:TMDBMovieImport()");
        var resourceUrl =  'vmms/' + 'api/_import/tmdb-movies/:id';

        return $resource(resourceUrl, {}, {
            'import': { method: 'GET'}
        });
    }
})();
