/**
* NewEquipmentController
* @namespace thinkster.equipment.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.equipment.controllers')
    .controller('NewEquipmentController', NewEquipmentController);

  NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Equipment'];

  /**
  * @namespace NewEquipmentController
  */
  function NewEquipmentController($rootScope, $scope, Authentication, Snackbar, Equipment) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Equipment
    * @memberOf thinkster.equipment.controllers.NewEquipmentController
    */
    function submit() {
      $rootScope.$broadcast('equipment.added', {
        equip: vm.equip,
        lab: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();

      Equipment.create(vm.equip).then(createEquipmentSuccessFn, createEquipmentErrorFn);


      /**
      * @name createEquipmentSuccessFn
      * @desc Show snackbar with success message
      */
      function createEquipmentSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Equipment added.');
      }

      /**
      * @name createEquipmentErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createEquipmentErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('equipment.added.error');
        Snackbar.error(data.error);
      }
    }
  }
})();