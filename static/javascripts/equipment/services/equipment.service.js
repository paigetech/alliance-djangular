/**
* Posts
* @namespace thinkster.equipment.services
*/
(function () {
    'use strict';

    angular
        .module('thinkster.equipment.services')
        .factory('Equipment', Equipment);

    Equipment.$inject = ['$http'];

    /**
    * @namespace Equipment
    * @returns {Factory}
    */
    function Equipment($http) {
        var Equipment = {
            destroy: destroy,
            all: all,
            create: create,
            get: get,
            get_obj: get_obj
        };

        return Equipment;

    ////////////////////

    /**
    * @name destroy
    * @desc Destroys the given equipment
    * @param {Object} equipment The equipment to be destroyed
    * @returns {Promise}
    * @memberOf thinkster.equipment.services.Equipment
    */
    function destroy(equipment) {
      return $http.delete('/api/v1/equipment/' + equipment + '/');
    }

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
    function create(name, lab) {
        return $http.post('/api/v1/equipment/', {
            name: name,
            lab: lab
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
        return $http.get('/api/v1/accounts/' + username + '/equipment/');
        }


    function get_obj(id) {
        return $http.get('/api/v1/equipment/' + id + '/');
        }
    }
})();
