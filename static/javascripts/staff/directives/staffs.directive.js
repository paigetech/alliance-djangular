/**
* Staffs
* @namespace thinkster.staffs.directives
*/
(function () {
    'use strict';

    angular
        .module('thinkster.staff.directives')
        .directive('staffs', staffs);

    /**
    * @namespace Staff
    */
    function staffs() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf thinkster.staffs.directives.Staff
        */
        var directive = {
            controller: 'staffsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                equips: '='
            },
            templateUrl: '/static/templates/staff/staffs.html'
        };

        return directive;
    }
})();