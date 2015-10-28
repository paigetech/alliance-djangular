/**
* IndexController
* @namespace openlab.layout.controllers
*/
(function () {
    'use strict';

    angular
        .module('openlab.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Snackbar', 'Profile'];

    /**
    * @namespace IndexController
    */
    function IndexController($scope, Authentication,  Snackbar, Profile) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.accounts = [];

        activate();

        /**
        * @name activate
        * @desc Actions to be performed when this controller is instantiated
        * @memberOf openlab.layout.controllers.IndexController
        */
        function activate() {

            Profile.all().then(accountsSuccessFn, accountsErrorFn);

            function accountsSuccessFn(data, status, headers, config) {
                vm.accounts = data.data;
            }

            function accountsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();