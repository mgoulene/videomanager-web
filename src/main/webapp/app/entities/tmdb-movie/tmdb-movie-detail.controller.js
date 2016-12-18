(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('TMDBMovieDetailController', TMDBMovieDetailController);

    TMDBMovieDetailController.$inject = ['$window', '$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TMDBMovie','TMDBMovieImport'];

    function TMDBMovieDetailController($window, $scope, $rootScope, $stateParams, previousState, entity, TMDBMovie, TMDBMovieImport) {
        console.log("tmdb-movie-detail.controller.js:TMDBMovieDetailController()");
        var vm = this;

        vm.tMDBMovie = entity;
        vm.previousState = previousState.name;
        vm.importTMDBMovie = importTMDBMovie;


        var unsubscribe = $rootScope.$on('vmwebApp:tMDBMovieUpdate', function(event, result) {
            vm.tMDBMovie = result;
        });
        $scope.$on('$destroy', unsubscribe);
        function importTMDBMovie() {
            console.log("tmdb-movie-detail.controller.js:toMovie()"+vm.tMDBMovie.id);
            TMDBMovieImport.import({id: vm.tMDBMovie.id}, function(result) {
                console.log("tmdb-movie-detail.controller.js:toMovie() - imported"+vm.tMDBMovie.id);
                $window.location.href = '#/movie/'+result.id;
            });
        }
    }
})();
