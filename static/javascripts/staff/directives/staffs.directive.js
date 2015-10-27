/**
* Staffs
* @namespace openlab.staffs.directives
*/
(function () {
    'use strict';

    angular
        .module('openlab.staff.directives')
        .directive('staffs', staffs);

    /**
    * @namespace Staff
    */
    function staffs() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf openlab.staffs.directives.Staff
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