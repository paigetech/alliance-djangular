/**
* NavbarController
* @namespace thinkster.layout.controllers
*/
(function () {
  'use strict';

  angular
      .module('thinkster.layout.controllers')
      .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$rootScope','$scope', 'Authentication', 'FilterService' ];

  /**
  * @namespace NavbarController
  */
  function NavbarController($rootScope, $scope, Authentication, FilterService) {
      var vm = this;

      $scope.FilterService = FilterService;

      vm.logout = logout;

      /**
      * @name logout
      * @desc Log the user out
      * @memberOf thinkster.layout.controllers.NavbarController
      */
      function logout() {
        Authentication.logout();
      }
  }
})();