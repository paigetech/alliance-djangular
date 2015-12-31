(function () {
    'use strict';

    angular
        .module('alliance', []);

    angular
        .module('alliance', [
            'alliance.config',
            'alliance.routes',
            'alliance.authentication',
            'alliance.layout',
            'alliance.posts',
            'alliance.utils',
            'alliance.profiles',
            'alliance.test',
        ]);

     angular
        .module('alliance.routes', ['ngRoute']);

    angular
      .module('alliance.config', []);

    angular
        .module('alliance')
        .run(run);

    run.$inject = ['$http'];

        /**
        * @name run
        * @desc Update xsrf $http headers to align with Django's defaults
        */
        function run($http) {
          $http.defaults.xsrfHeaderName = 'X-CSRFToken';
          $http.defaults.xsrfCookieName = 'csrftoken';
        }

})();



