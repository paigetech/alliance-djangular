(function () {
  'use strict';

  angular
      .module('thinkster.staff', [
        'thinkster.staff.controllers',
        'thinkster.staff.services',
        'thinkster.staff.directives'
    ]);

  angular
      .module('thinkster.staff.controllers', []);

  angular
      .module('thinkster.staff.services', []);

    angular
      .module('thinkster.staff.directives', ['ngDialog']);
})();
