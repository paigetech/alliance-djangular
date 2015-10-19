/**
* EquipmentController
* @namespace thinkster.equipment.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.equipment.controllers')
    .controller('EquipmentController', EquipmentController);

  EquipmentController.$inject = ['$http', '$location', '$routeParams', 'Equipment','Snackbar'];

  /**
  * @namespace EquipmentController
  */
  function EquipmentController($http, $location,$routeParams, Equipment, Snackbar) {
    var vm = this;

    vm.equip = undefined;
    vm.equips= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.equipment.controllers.EquipmentController
    */
    function activate() {console.log('EquipmentController');
      //var name = $routeParams.equipment.substr(1);
      var id = $routeParams.equip;

      Equipment.get_obj(id).then(equipmentSuccessFn, equipmentErrorFn);
      Equipment.all().then(equipsSuccessFn, equipsErrorFn);

      /**
      * @name equipmentSuccessProfile
      * @desc Update `equipment` on viewmodel
      */
      function equipmentSuccessFn(data, status, headers, config) {
        vm.equip = data.data;console.log(vm.equip);
      }


      /**
      * @name equipmentErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipmentErrorFn(data, status, headers, config) {console.log(id);
        Snackbar.error(data.data.error);
      }



        /**
      * @name equipmentSuccessProfile
      * @desc Update `equipment` on viewmodel
      */
      function equipsSuccessFn(data, status, headers, config) {
        vm.equips = data.data;
      }


      /**
      * @name equipmentErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipsErrorFn(data, status, headers, config) {

        Snackbar.error('That equipment does not exist.');
      }

    }
  }
})();