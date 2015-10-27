(function () {
    'use strict';

    angular
        .module('openlab', []);

    angular
        .module('openlab', [
            'ui.bootstrap',
            'openlab.config',
            'openlab.routes',
            'openlab.authentication',
            'openlab.layout',
            'openlab.posts',
            'openlab.utils',
            'openlab.profiles',
            'openlab.directions',
            'openlab.equipment',
            'openlab.staff',
            'openlab.filters'
        ]);

     angular
        .module('openlab.routes', ['ngRoute']);

    angular
      .module('openlab.config', []);

    angular
      .module('openlab.filters', []);

    angular
        .module('openlab').service('FilterService', function() {
      this.LabFilter = "";
    });



    angular
        .module('openlab')
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



