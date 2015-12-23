/**
* Register controller
* @namespace alliance.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('alliance.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication', '$http'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication, $http) {
    var vm = this;

    vm.register = register;

    ///**
    //* @name register
    //* @desc Register a new user
    //* @memberOf alliance.authentication.controllers.RegisterController
    //*/
    function register() {
      Authentication.register(vm.email, vm.password, vm.username);
    }

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf alliance.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: vm.username,
        password: vm.password,
        email: vm.email
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure! ' + JSON.stringify(data));
      }
    }


    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf alliance.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }






  }



})();
