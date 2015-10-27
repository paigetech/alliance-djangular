(function () {
  'use strict';

  angular
      .module('openlab.staff', [
        'openlab.staff.controllers',
        'openlab.staff.services',
        'openlab.staff.directives'
    ]);

  angular
      .module('openlab.staff.controllers', []);

  angular
      .module('openlab.staff.services', []);

    angular
      .module('openlab.staff.directives', ['ngDialog']);
})();
