(function() {
    'use strict';
    angular
        .module('vmwebApp')
        .factory('TmdbPicture', TmdbPicture);

    TmdbPicture.$inject = ['$resource'];

    function TmdbPicture ($resource) {
        var resourceUrl =  'vmpicture/' + 'api/tmdb-pictures/:id';

        return $resource(resourceUrl, {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
        });
    }
})();
