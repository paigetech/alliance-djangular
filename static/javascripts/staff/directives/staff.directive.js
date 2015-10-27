/**
* Staff
* @namespace openlab.staff.directives
*/
(function () {
  'use strict';

  angular
    .module('openlab.staff.directives')
    .directive('staff', staff);

  /**
  * @namespace Staff
  */
  function staff() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf openlab.staff.directives.Staff
    */
    var directive = {
      //controller: 'staffsController',
      //controllerAs: 'vm',
      restrict: 'E',
      scope: {
        equip: '='
      },
      templateUrl: '/static/templates/staff/staff.html'
    };

    return directive;
  }
})();
