(function () {
    'use strict';

    angular
        .module('openlab.posts', [
            'openlab.posts.controllers',
            'openlab.posts.directives',
            'openlab.posts.services'
        ]);

    angular
        .module('openlab.posts.controllers', []);

    angular
        .module('openlab.posts.directives', ['ngDialog']);

    angular
        .module('openlab.posts.services', []);
})();