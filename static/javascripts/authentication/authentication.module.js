(function () {
  'use strict';

  angular
    .module('alliance.authentication', [
      'alliance.authentication.controllers',
      'alliance.authentication.services'
    ]);

  angular
    .module('alliance.authentication.controllers', []);

  angular
    .module('alliance.authentication.services', ['ngCookies']);
})();
