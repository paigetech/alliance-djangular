(function () {
  'use strict';

  angular
      .module('thinkster.equipment', [
        'thinkster.equipment.controllers',
        'thinkster.equipment.services',
        'thinkster.equipment.directives'
    ]);

  angular
      .module('thinkster.equipment.controllers', []);

  angular
      .module('thinkster.equipment.services', []);

    angular
      .module('thinkster.equipment.directives', ['ngDialog']);
})();
