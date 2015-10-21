/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$location', '$routeParams','$http', 'Profile', 'Equipment','Snackbar'];

  /**
  * @namespace ProfileController
  */
  function ProfilesController($location, $routeParams,$http, Profiles, Equipment, Snackbar) {
    var vm = this;


    //vm.profilesall = undefined;
    //vm.profiles = [];
      vm.profiles= undefined;
    //vm.equips=[]


    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfileController
    */
    function activate() {
        Profiles.all().then(profilesSuccessFn, profilesErrorFn);
      //Equipment.get("qq").then(equipmentSuccessFn, equipmentErrorFn);

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

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function equipmentSuccessFn(data, status, headers, config) {
        vm.equips = data.data;console.log(vm.equips);
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipmentErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
        //vm.profiles = Profile.all();console.log( vm.profiles.data);
        //vm.profiles = $http.get('/api/v1/accounts/');console.log( vm.profiles);
        //for (var i = 0; i < profilesall.length; ++i) {
        //
        //
        //  vm.profiles.push([i]);

        //}
      //return vm.profiles;
        //$scope.$watchCollection(function () { return $scope.profiles; });
        //$scope.$watch(function () { return $(window).width(); });
      //var username = $routeParams.username.substr(1);

      //Profile.get(username).then(profileSuccessFn, profileErrorFn);
      //Posts.get(username).then(postsSuccessFn, postsErrorFn);
      //Profiles.


      //
      ///**
      //* @name profilesSuccessProfile
      //* @desc Update `profile` on viewmodel
      //*/
      //function profilesSuccessFn(data, status, headers, config) {console.log(data.data);
      //  vm.profiles = data.data;
      //}
      //
      //
      ///**
      //* @name profilesErrorFn
      //* @desc Redirect to index and show error Snackbar
      //*/
      //function profilesErrorFn(data, status, headers, config) {
      //
      //  Snackbar.error('Error.');
      //}
    }
  }
})();