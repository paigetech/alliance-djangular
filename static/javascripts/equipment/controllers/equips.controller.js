/**
* EquipmentsController
* @namespace thinkster.equipment.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.equipment.controllers')
    .controller('EquipmentsController', EquipmentsController);

  EquipmentsController.$inject = ['$location', '$routeParams','$http', 'Equipment','Snackbar'];

  /**
  * @namespace EquipmentsController
  */
  function EquipmentsController($location, $routeParams, $http, Equipment, Snackbar) {
    var vm = this;


    //vm.profilesall = undefined;
    //vm.profiles = [];
      vm.equips= undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.equipment.controllers.EquipmentsController
    */
    function activate() {
        Equipment.all().then(equipmentSuccessFn, equipmentErrorFn);

        /**
      * @name equipmentSuccessProfile
      * @desc Update `equipment` on viewmodel
      */
      function equipmentSuccessFn(data, status, headers, config) {
        vm.equips = data.data;
      }


      /**
      * @name equipmentErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipmentErrorFn(data, status, headers, config) {

        Snackbar.error('That equipment does not exist.');
      }

      //function all() {
      //  return $http.get('/api/v1/equipment/');
      //}
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