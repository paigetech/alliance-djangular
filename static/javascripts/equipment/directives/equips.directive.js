/**
* Equipments
* @namespace openlab.equipment.directives
*/
(function () {
    'use strict';

    angular
        .module('openlab.equipment.directives')
        .directive('equips', equips);

    /**
    * @namespace Equipment
    */
    function equips() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf openlab.equipment.directives.equips
        */
        var directive = {
            controller: 'EquipmentsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                equips: '='
            },
            templateUrl: '/static/templates/equipment/equips.html'
        };

        return directive;
    }
})();