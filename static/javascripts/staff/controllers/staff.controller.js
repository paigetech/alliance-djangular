/**
* StaffController
* @namespace openlab.staff.controllers
*/
(function () {
  'use strict';

  angular
    .module('openlab.staff.controllers')
    .controller('StaffController', StaffController);

  StaffController.$inject = ['$routeParams', 'Staff','Snackbar'];

  /**
  * @namespace StaffController
  */
  function StaffController($routeParams, Staff, Snackbar) {
    var vm = this;

    vm.staff = undefined;
    //vm.equips= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf openlab.staff.controllers.StaffController
    */
    function activate() {
      var id = $routeParams.staff;

      Staff.get_obj(id).then(staffSuccessFn, staffErrorFn);
      //staff.all().then(equipsSuccessFn, equipsErrorFn);

      /**
      * @name staffSuccessStaff
      * @desc Update `staff` on viewmodel
      */
      function staffSuccessFn(data, status, headers, config) {
        vm.staff = data.data;
      }


      /**
      * @name staffErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function staffErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }



      //  /**
      //* @name staffSuccessProfile
      //* @desc Update `staff` on viewmodel
      //*/
      //function equipsSuccessFn(data, status, headers, config) {
      //  vm.equips = data.data;
      //}
      //
      //
      ///**
      //* @name staffErrorFn
      //* @desc Redirect to index and show error Snackbar
      //*/
      //function equipsErrorFn(data, status, headers, config) {
      //
      //  Snackbar.error('That staff does not exist.');
      //}

    }
  }
})();