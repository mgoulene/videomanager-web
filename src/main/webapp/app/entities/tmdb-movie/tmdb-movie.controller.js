(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('TMDBMovieController', TMDBMovieController);

    TMDBMovieController.$inject = ['$scope', '$state', 'TMDBMovie', 'TMDBMovieSearch'];

    function TMDBMovieController ($scope, $state, TMDBMovie, TMDBMovieSearch) {
        var vm = this;

        vm.tMDBMovies = [];
        vm.clear = clear;
        vm.search = search;
        //vm.toMovie = toMovie;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            console.log("tmdb-movie.controller.js:loadAll()");
            //TMDBMovie.query(function(result) {
            //    vm.tMDBMovies = result;
            //    vm.searchQuery = null;
            //});
        }

        function search() {
            console.log("tmdb-movie.controller.js:search()");
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            TMDBMovieSearch.query({query: vm.searchQuery}, function(result) {
                vm.tMDBMovies = result;
                vm.currentSearch = vm.searchQuery;
            });
        }
        function clear() {
            console.log("tmdb-movie.controller.js:clear()");
            vm.searchQuery = null;
            loadAll();
        }    }
})();
