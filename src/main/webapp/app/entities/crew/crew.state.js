(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('crew', {
            parent: 'entity',
            url: '/crew',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'vmwebApp.crew.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/crew/crews.html',
                    controller: 'CrewController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('crew');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('crew-detail', {
            parent: 'entity',
            url: '/crew/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'vmwebApp.crew.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/crew/crew-detail.html',
                    controller: 'CrewDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('crew');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Crew', function($stateParams, Crew) {
                    return Crew.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'crew',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('crew-detail.edit', {
            parent: 'crew-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/crew/crew-dialog.html',
                    controller: 'CrewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Crew', function(Crew) {
                            return Crew.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('crew.new', {
            parent: 'crew',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/crew/crew-dialog.html',
                    controller: 'CrewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                department: null,
                                job: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('crew', null, { reload: 'crew' });
                }, function() {
                    $state.go('crew');
                });
            }]
        })
        .state('crew.edit', {
            parent: 'crew',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/crew/crew-dialog.html',
                    controller: 'CrewDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Crew', function(Crew) {
                            return Crew.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('crew', null, { reload: 'crew' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('crew.delete', {
            parent: 'crew',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/crew/crew-delete-dialog.html',
                    controller: 'CrewDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Crew', function(Crew) {
                            return Crew.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('crew', null, { reload: 'crew' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
