(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('CrewDeleteController',CrewDeleteController);

    CrewDeleteController.$inject = ['$uibModalInstance', 'entity', 'Crew'];

    function CrewDeleteController($uibModalInstance, entity, Crew) {
        var vm = this;

        vm.crew = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Crew.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
