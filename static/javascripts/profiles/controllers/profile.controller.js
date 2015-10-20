/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Equipment','Snackbar'];

  /**
  * @namespace ProfileController
  */
  function ProfileController($location, $routeParams, Posts, Profile, Equipment, Snackbar) {
    var vm = this;

    vm.profile = undefined;
    vm.direction = undefined;
    vm.posts = [];
    vm.equips = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfileController
    */
    function activate() {
      var username = $routeParams.username.substr(1);
      var item_id = $routeParams.equip; console.log(item_id);//.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Posts.get(username).then(postsSuccessFn, postsErrorFn);
      Equipment.get(username).then(equipmentSuccessFn, equipmentErrorFn);
      //Profile.all().then(profilesSuccessFn, profilesErrorFn);
      if (item_id) {
        Equipment.get_obj(item_id).then(equipSuccessFn, equipErrorFn);
      }

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }

      /**
        * @name postsSucessFn
        * @desc Update `posts` on viewmodel
        */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function equipmentSuccessFn(data, status, headers, config) {
        vm.equips = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipmentErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function equipSuccessFn(data, status, headers, config) {
        vm.equip = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function equipErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }

      ///**
      //* @name profilesSuccessProfile
      //* @desc Update `profile` on viewmodel
      //*/
      //function profilesSuccessFn(data, status, headers, config) {
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
      //  Snackbar.error('That user does not exist.');
      //}
    }
  }
})();