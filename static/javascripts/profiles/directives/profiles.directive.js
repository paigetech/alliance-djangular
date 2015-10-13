/**
* Profile
* @namespace thinkster.profiles.directives
*/
(function () {
    'use strict';

    angular
        .module('thinkster.profiles.directives')
        .directive('profiles', profiles);

    /**
    * @namespace Profiles
    */
    function profiles() {
        /**
        * @name directive
        * @desc The directive to be returned
        * @memberOf thinkster.posts.directives.Profiles
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