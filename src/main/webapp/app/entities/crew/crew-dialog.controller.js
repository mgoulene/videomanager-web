(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('CrewDialogController', CrewDialogController);

    CrewDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Crew', 'Person', 'Movie'];

    function CrewDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Crew, Person, Movie) {
        var vm = this;

        vm.crew = entity;
        vm.clear = clear;
        vm.save = save;
        vm.people = Person.query();
        vm.movies = Movie.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.crew.id !== null) {
                Crew.update(vm.crew, onSaveSuccess, onSaveError);
            } else {
                Crew.save(vm.crew, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('vmwebApp:crewUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
