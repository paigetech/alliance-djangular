/**
* Equipments
* @namespace thinkster.equipment.directives
*/
(function () {
    'use strict';

    angular
        .module('thinkster.equipment.directives')
        .directive('equips', equips);

    /**
    * @namespace Equipment
    */
    function equips() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf thinkster.equipment.directives.equips
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