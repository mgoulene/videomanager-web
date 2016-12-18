(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('PersonDialogController', PersonDialogController);

    PersonDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Person', 'Picture'];

    function PersonDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Person, Picture) {
        var vm = this;

        vm.person = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.profilepictures = Picture.query({filter: 'person-is-null'});
        $q.all([vm.person.$promise, vm.profilepictures.$promise]).then(function() {
            if (!vm.person.profilePictureId) {
                return $q.reject();
            }
            return Picture.get({id : vm.person.profilePictureId}).$promise;
        }).then(function(profilePicture) {
            vm.profilepictures.push(profilePicture);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.person.id !== null) {
                Person.update(vm.person, onSaveSuccess, onSaveError);
            } else {
                Person.save(vm.person, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('vmwebApp:personUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthday = false;
        vm.datePickerOpenStatus.deathday = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
