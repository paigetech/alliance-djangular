/**
* Profile
* @namespace openlab.profiles.directives
*/
(function () {
  'use strict';

  angular
    .module('openlab.profiles.directives')
    .directive('profile', profile);

  /**
  * @namespace Profile
  */
  function profile() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf openlab.profiles.directives.Profile
    */
    var directive = {
      restrict: 'E',
      scope: {
        profile: '='
      },
      templateUrl: '/static/templates/profiles/lab.html'
    };

    return directive;
  }
})();