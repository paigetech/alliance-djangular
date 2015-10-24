/**
* ProfilesController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$scope', '$rootScope', '$http', 'Profile', 'Snackbar', 'FilterService'];

  /**
  * @namespace ProfileController
  */
  function ProfilesController($scope, $rootScope, $http, Profiles, Snackbar, FilterService) {
    var vm = this;

    $scope.FilterService = FilterService;

     vm.profiles= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfilesController
    */
    function activate() {
        Profiles.all().then(profilesSuccessFn, profilesErrorFn);

        /**
      * @name profilesSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profilesSuccessFn(data, status, headers, config) {
        vm.profiles = data.data;
      }


      /**
      * @name profilesErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profilesErrorFn(data, status, headers, config) {

        Snackbar.error('That user does not exist.');
      }

        function all() {
      return $http.get('/api/v1/accounts/');
    }

    }
  }
})();