(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('MovieDialogController', MovieDialogController);

    MovieDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Movie', 'Picture', 'Actor', 'Crew', 'Genre'];

    function MovieDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Movie, Picture, Actor, Crew, Genre) {
        var vm = this;

        vm.movie = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.posters = Picture.query({filter: 'movie-is-null'});
        $q.all([vm.movie.$promise, vm.posters.$promise]).then(function() {
            if (!vm.movie.posterId) {
                return $q.reject();
            }
            return Picture.get({id : vm.movie.posterId}).$promise;
        }).then(function(poster) {
            vm.posters.push(poster);
        });
        vm.backdrops = Picture.query({filter: 'movie-is-null'});
        $q.all([vm.movie.$promise, vm.backdrops.$promise]).then(function() {
            if (!vm.movie.backdropId) {
                return $q.reject();
            }
            return Picture.get({id : vm.movie.backdropId}).$promise;
        }).then(function(backdrop) {
            vm.backdrops.push(backdrop);
        });
        vm.actors = Actor.query();
        vm.crews = Crew.query();
        vm.pictures = Picture.query();
        vm.genres = Genre.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.movie.id !== null) {
                Movie.update(vm.movie, onSaveSuccess, onSaveError);
            } else {
                Movie.save(vm.movie, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('vmwebApp:movieUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.releaseDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
