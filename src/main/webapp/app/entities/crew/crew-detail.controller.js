(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .controller('CrewDetailController', CrewDetailController);

    CrewDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Crew', 'Person', 'Movie'];

    function CrewDetailController($scope, $rootScope, $stateParams, previousState, entity, Crew, Person, Movie) {
        var vm = this;

        vm.crew = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('vmwebApp:crewUpdate', function(event, result) {
            vm.crew = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
