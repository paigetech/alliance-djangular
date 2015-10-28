(function () {
    'use strict';

    angular
        .module('openlab.routes')
        .config(config);


    config.$inject = ['$routeProvider'];

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).when('/', {
            controller: 'IndexController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/layout/index.html'
        }).when('/:username', {
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/profile.html'
        }).when('/:username/settings', {
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/settings.html'
        }).when('/equipment/:equip', {
            controller: 'EquipmentController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/equipment/equip.html'
        }).when('/staff/:staff', {
            controller: 'StaffController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/staff/staff.html'
        }).when('/api/v1/api_root/', {
            templateUrl: '/api/v1/api_root/'
        }).when('/api/v1/admin/', {
            templateUrl: '/api/v1/admin/'
        }).otherwise('/');
    }
})();