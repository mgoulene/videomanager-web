(function() {
    'use strict';

    angular
        .module('vmwebApp')
        .directive('pictureLoad', pictureLoad);

    pictureLoad.$inject = ['TmdbPicture'];

    function pictureLoad(TmdbPicture) {
        var directive = {
            replace : true,
            restrict : 'A',
            //template : '<div class="ribbon hidden"><a href="" >{{ribbonEnv}}</a></div>',
            link: load
        };

        return directive;

        function load(scope, element, attrs) {
            if (element[0].nodeName == 'IMG') {
                var posterId = attrs.pictureLoad;
                if (posterId != null && posterId != "") {
                    TmdbPicture.get({id : posterId}).$promise.then(function (result) {
                        element.attr('src', 'data:' + result.imageContentType + ';base64,' + result.image);
                        console.log(attrs.ngSrc);
                });
                }
            }
        }
    }
})();
