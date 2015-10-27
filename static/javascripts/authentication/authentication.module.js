(function () {
  'use strict';

  angular
    .module('openlab.authentication', [
      'openlab.authentication.controllers',
      'openlab.authentication.services'
    ]);

  angular
    .module('openlab.authentication.controllers', []);

  angular
    .module('openlab.authentication.services', ['ngCookies']);
})();
