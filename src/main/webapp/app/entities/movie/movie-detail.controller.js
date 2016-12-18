(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('MovieDetailController', MovieDetailController);

    MovieDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Movie', 'Picture', 'Actor', 'Crew', 'Genre'];

    function MovieDetailController($scope, $rootScope, $stateParams, previousState, entity, Movie, Picture, Actor, Crew, Genre) {
        var vm = this;

        vm.movie = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('vmwebApp:movieUpdate', function(event, result) {
            vm.movie = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
