/**
* ProfileSettingsController
* @namespace openlab.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('openlab.profiles.controllers')
    .controller('ProfileSettingsController', ProfileSettingsController);

  ProfileSettingsController.$inject = [
    '$scope', '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar', 'Equipment', '$route', 'Direction', 'Staff'
  ];

  /**
  * @namespace ProfileSettingsController
  */
  function ProfileSettingsController($scope, $location, $routeParams, Authentication, Profile, Snackbar, Equipment, $route, Direction, Staff) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;
    vm.destroyEquip = destroyEquip;
    vm.destroyStaff = destroyStaff;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf openlab.profiles.controllers.ProfileSettingsController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      var username = $routeParams.username;//.substr(1);

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('You are not authorized to view this page.');
      } else {
        // Redirect if logged in, but not the owner of this profile.
        if (authenticatedAccount.username !== username) {
          $location.url('/');
          Snackbar.error('You are not authorized to view this page.');
        }
      }

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Direction.all().then(directionSuccessFn, directionErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Update `profile` for view
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
      }

      /**
      * @name profileErrorFn
      * @desc Redirect to index
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }

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
    }


    /**
    * @name destroy
    * @desc Destroy this user's profile
    * @memberOf openlab.profiles.controllers.ProfileSettingsController
    */
    function destroy() {
      Profile.destroy(vm.profile.username).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Redirect to index and display success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = '/';

        Snackbar.show('Your account has been deleted.');
      }


      /**
      * @name profileErrorFn
      * @desc Display error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    /**
    * @name update
    * @desc Update this user's profile
    * @memberOf openlab.profiles.controllers.ProfileSettingsController
    */
    function update() {
      Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);

      /**
      * @name profileSuccessFn
      * @desc Show success snackbar
      */
      function profileSuccessFn(data, status, headers, config) {
        Snackbar.show('Your profile has been updated.');
      }


      /**
      * @name profileErrorFn
      * @desc Show error snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        String.prototype.format = function () {
          var i = 0, args = arguments;
          return this.replace(/{}/g, function () {
            return typeof args[i] != 'undefined' ? args[i++] : '';
          });
        };

        var message = '';
        _.each( data.data, function( val, key ) {
          var newmessage =' {}: {}'.format(key, val[0] );
          message += newmessage;
        });
        Snackbar.error(message);
      }
    }

    function destroyEquip(equip_id) {
      Equipment.destroy(equip_id).then(equipSuccessFn, equipErrorFn);

      /**
       * @name profileSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function equipSuccessFn(data, status, headers, config) {
        $route.reload();
        Snackbar.show('Equipment item has been deleted.');
      }

      function equipErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    function destroyStaff(staff_id) {
      Staff.destroy(staff_id).then(staffSuccessFn, staffErrorFn);

      /**
       * @name staffSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function staffSuccessFn(data, status, headers, config) {
        $route.reload();
        Snackbar.show('Staff member has been deleted.');
      }

      function staffErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();
