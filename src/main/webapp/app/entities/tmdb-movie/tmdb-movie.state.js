(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        console.log("tmdb-movie.state.js:stateConfig()");
        $stateProvider
        .state('tmdb-movie', {
            parent: 'entity',
            url: '/tmdb-movie',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'TMDBMovies'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tmdb-movie/tmdb-movies.html',
                    controller: 'TMDBMovieController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('tmdb-movie-detail', {
            parent: 'entity',
            url: '/tmdb-movie/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'TMDBMovie'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tmdb-movie/tmdb-movie-detail.html',
                    controller: 'TMDBMovieDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'TMDBMovie', function($stateParams, TMDBMovie) {
                    return TMDBMovie.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'tmdb-movie',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
    }

})();
