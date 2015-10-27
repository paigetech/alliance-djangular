/**
* StaffsController
* @namespace openlab.staff.controllers
*/
(function () {
  'use strict';

  angular
    .module('openlab.staff.controllers')
    .controller('StaffsController', StaffsController);

  StaffsController.$inject = ['Staff','Snackbar'];

  /**
  * @namespace StaffsController
  */
  function StaffsController(Staff, Snackbar) {
    var vm = this;

      vm.staffs= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf openlab.staff.controllers.StaffsController
    */
    function activate() {
        Staff.all().then(staffSuccessFn, staffErrorFn);

        /**
      * @name staffSuccessProfile
      * @desc Update `staff` on viewmodel
      */
      function staffSuccessFn(data, status, headers, config) {
        vm.staffs = data.data;
      }


      /**
      * @name staffErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function staffErrorFn(data, status, headers, config) {

        Snackbar.error('That staff does not exist.');
      }

    }
  }
})();