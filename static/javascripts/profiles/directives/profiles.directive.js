/**
* Profile
* @namespace openlab.profiles.directives
*/
(function () {
    'use strict';

    angular
        .module('openlab.profiles.directives')
        .directive('profiles', profiles);

    /**
    * @namespace Profiles
    */
    function profiles() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf openlab.posts.directives.Profile
        */
        var directive = {
            controller: 'ProfilesController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                profiles: '='
            },
            templateUrl: '/static/templates/profiles/profiles.html'
        };

        return directive;
    }
})();