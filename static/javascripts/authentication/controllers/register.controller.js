/**
* Register controller
* @namespace thinkster.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication', '$http', 'Direction'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication, $http, Direction) {
    var vm = this;

    vm.register = register;

    $scope.selected = "";
    Direction.all().then(directionSuccessFn, directionErrorFn);

    /**
      * @name directionSuccessFn
      * @desc Update `direction` for view
      */
      function directionSuccessFn(data, status, headers, config) {
        vm.directions = data.data;
        $scope.directions = vm.directions;
      }

      /**
      * @name directionErrorFn
      * @desc Display error snackbar
      */
      function directionErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }

    ///**
    //* @name register
    //* @desc Register a new user
    //* @memberOf thinkster.authentication.controllers.RegisterController
    //*/
    //function register() {
    //  Authentication.register(vm.email, vm.password, vm.username);
    //}

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username, direction) {
      return $http.post('/api/v1/accounts/', {
        username: vm.username,
        password: vm.password,
        email: vm.email,
        direction: vm.direction
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(vm.email, vm.password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }


    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf thinkster.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }






  }



})();
