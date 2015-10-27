(function () {
  'use strict';

  angular
      .module('openlab.equipment', [
        'openlab.equipment.controllers',
        'openlab.equipment.services',
        'openlab.equipment.directives'
    ]);

  angular
      .module('openlab.equipment.controllers', []);

  angular
      .module('openlab.equipment.services', []);

    angular
      .module('openlab.equipment.directives', ['ngDialog']);
})();
