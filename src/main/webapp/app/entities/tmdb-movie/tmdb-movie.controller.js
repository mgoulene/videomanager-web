(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('TMDBMovieController', TMDBMovieController);

    TMDBMovieController.$inject = ['$scope', '$state', 'TMDBMovie', 'TMDBMovieSearch','TMDBMovieImport'];

    function TMDBMovieController ($scope, $state, TMDBMovie, TMDBMovieSearch, TMDBMovieImport) {
        var vm = this;

        vm.tMDBMovies = [];
        vm.clear = clear;
        vm.search = search;
        vm.importBatch = importBatch;
        //vm.searchQuery = searchQuery;
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
       function importBatch() {
            console.log("tmdb-movie.controller.js:importBatch() : "+vm.fromId+", "+vm.toId);
            if (!vm.fromId || !vm.toId) {
                return vm.loadAll();
            }
            TMDBMovieImport.importRange({fromId: vm.fromId, toId: vm.toId}, function(result) {
                //vm.tMDBMovies = result;
                //vm.currentSearch = vm.searchQuery;
            });
        }


        function clear() {
            console.log("tmdb-movie.controller.js:clear()");
            vm.searchQuery = null;
            loadAll();
        }    }
})();
