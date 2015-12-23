/**
* Posts
* @namespace alliance.posts.directives
*/
(function () {
    'use strict';

    angular
        .module('alliance.posts.directives')
        .directive('posts', posts);

    /**
    * @namespace Posts
    */
    function posts() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf alliance.posts.directives.Posts
        */
        var directive = {
            controller: 'PostsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                posts: '='
            },
            templateUrl: '/static/templates/posts/posts.html'
        };

        return directive;
    }
})();