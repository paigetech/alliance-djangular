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
            'thinkster.equipment',
            'thinkster.filters'
        ]);

     angular
        .module('thinkster.routes', ['ngRoute']);

    angular
      .module('thinkster.config', []);

    angular
      .module('thinkster.filters', []);

    angular
        .module('thinkster').service('FilterService', function() {
      this.LabFilter = "";
    });

    angular.module('thinkster').directive('autoComplete', function($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
        };
    });

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



