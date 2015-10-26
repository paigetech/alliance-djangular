/**
* DirectionController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('DirectionController', DirectionController);

  DirectionController.$inject = ['$routeParams', 'Direction','Snackbar'];

  /**
  * @namespace ProfileController
  */
  function DirectionController( $routeParams, Direction, Snackbar) {
    var vm = this;

    vm.direction = undefined;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.DirectionController
    */
    function activate() {
      var name = $routeParams.name;//.substr(1);

      Direction.get(name).then(directionSuccessFn, directionErrorFn);

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function directionSuccessFn(data, status, headers, config) {console.log('Dir');
        vm.direction = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function directionErrorFn(data, status, headers, config) {console.log('Not Dir');
        Snackbar.error(data.data.error);
      }

    }
  }
})();