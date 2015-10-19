(function () {
    'use strict';

    angular
        .module('thinkster', []);

    angular
        .module('thinkster', [
            'thinkster.config',
            'thinkster.routes',
            'thinkster.authentication',
            'thinkster.layout',
            'thinkster.posts',
            'thinkster.utils',
            'thinkster.profiles',
            'thinkster.directions',
            'thinkster.equipment'
        ]);

     angular
        .module('thinkster.routes', ['ngRoute']);

    angular
      .module('thinkster.config', []);

    angular
        .module('thinkster')
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



