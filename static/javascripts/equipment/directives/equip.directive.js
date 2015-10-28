/**
* Equipment
* @namespace openlab.equipment.directives
*/
(function () {
  'use strict';

  angular
    .module('openlab.equipment.directives')
    .directive('equip', equip);

  /**
  * @namespace Equipment
  */
  function equip() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf openlab.equipment.directives.equip
    */
    var directive = {
      //controller: 'EquipmentsController',
      //controllerAs: 'vm',
      restrict: 'E',
      scope: {
        equip: '='
      },
      templateUrl: '/static/templates/equipment/equip.html'
    };

    return directive;
  }
})();
