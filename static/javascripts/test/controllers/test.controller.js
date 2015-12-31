(function () { 
  'use strict';

  angular
    .module('alliance.test.controllers')
    .controller('TestController', TestController);

  TestController.$inject = ['$scope'];

  function TestController($scope) {
    var vm = this;

    vm.name = "Ducati";
  }
});
