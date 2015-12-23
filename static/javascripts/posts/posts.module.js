(function () {
    'use strict';

    angular
        .module('alliance.posts', [
            'alliance.posts.controllers',
            'alliance.posts.directives',
            'alliance.posts.services'
        ]);

    angular
        .module('alliance.posts.controllers', []);

    angular
        .module('alliance.posts.directives', ['ngDialog']);

    angular
        .module('alliance.posts.services', []);
})();