/**
* NewStaffController
* @namespace thinkster.staff.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.staff.controllers')
    .controller('NewStaffController', NewStaffController);

  NewStaffController.$inject = ['$rootScope', '$scope', '$route', 'Authentication', 'Snackbar', 'Staff'];

  /**
  * @namespace NewStaffController
  */
  function NewStaffController($rootScope, $scope, $route, Authentication, Snackbar, Staff) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Staff
    * @memberOf thinkster.staff.controllers.NewStaffController
    */
    function submit() {
      $rootScope.$broadcast('Staff.added', {
        staff: vm.staff,
        lab: Authentication.getAuthenticatedAccount().id
      });

      $scope.closeThisDialog();

      Staff.create(vm.staff, Authentication.getAuthenticatedAccount().id).then(createStaffSuccessFn, createStaffErrorFn);



      /**
      * @name createStaffSuccessFn
      * @desc Show snackbar with success message
      */
      function createStaffSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Staff member added.');
        $route.reload();
      }

      /**
      * @name createStaffErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createStaffErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('Staff.added.error');
        Snackbar.error(data.error);
      }
    }
  }
})();