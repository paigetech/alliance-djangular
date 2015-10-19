/**
* Equipment
* @namespace thinkster.equipment.directives
*/
(function () {
  'use strict';

  angular
    .module('thinkster.equipment.directives')
    .directive('equip', equip);

  /**
  * @namespace Post
  */
  function equip() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thinkster.equipment.directives.equip
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
