/**
* EquipmentsController
* @namespace thinkster.equipment.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.equipment.controllers')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['Equipment','Snackbar'];

  /**
  * @namespace EquipmentsController
  */
  function EquipmentsController(Equipment, Snackbar) {
    var vm = this;

      vm.equips= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.equipment.controllers.EquipmentsController
    */
    function activate() {
        Equipment.all().then(equipmentSuccessFn, equipmentErrorFn);

        /**
      * @name equipmentSuccessProfile
      * @desc Update `equipment` on viewmodel
      */
      function equipmentSuccessFn(data, status, headers, config) {
        vm.equips = data.data;
      }


      /**
      * @name equipmentErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipmentErrorFn(data, status, headers, config) {

        Snackbar.error('That equipment does not exist.');
      }

    }
  }
})();