/**
* Posts
* @namespace thinkster.equipment.services
*/
(function () {
    'use strict';

    angular
        .module('thinkster.equipment.services')
        .factory('Equipment', Equipment);

    Posts.$inject = ['$http'];

    /**
    * @namespace Equipment
    * @returns {Factory}
    */
    function Equipment($http) {
        var Equipment = {
            all: all,
            create: create,
            get: get
        };

        return Equipment;

    ////////////////////

    /**
    * @name all
    * @desc Get all Equipment
    * @returns {Promise}
    * @memberOf thinkster.equipment.services.Equipment
    */
    function all() {
        return $http.get('/api/v1/equipment/');
        }

    /**
    * @name create
    * @desc Create a new Equipment
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf thinkster.equipment.services.Equipment
    */
    function create(content) {
        return $http.post('/api/v1/equipment/', {
            content: content
        });
    }

    /**
     * @name get
     * @desc Get the Equipment of a given user
     * @param {string} username The username to get Posts for
     * @returns {Promise}
     * @memberOf thinkster.equipment.services.Equipment
     */
    function get(username) {
        return $http.get('/api/v1/equipment/' + username + '/equipment/');
        }
    }
})();
