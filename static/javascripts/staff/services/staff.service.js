/**
* Staff
* @namespace thinkster.staff.services
*/
(function () {
    'use strict';

    angular
        .module('thinkster.staff.services')
        .factory('Staff', Staff);

    Staff.$inject = ['$http'];

    /**
    * @namespace Staff
    * @returns {Factory}
    */
    function Staff($http) {
        var Staff = {
            destroy: destroy,
            all: all,
            create: create,
            get: get,
            get_obj: get_obj
        };

        return Staff;

    ////////////////////

    /**
    * @name destroy
    * @desc Destroys the given staff
    * @param {Object} staff The staff to be destroyed
    * @returns {Promise}
    * @memberOf thinkster.staff.services.Staff
    */
    function destroy(staff) {
      return $http.delete('/api/v1/staff/' + staff + '/');
    }

    /**
    * @name all
    * @desc Get all Staff
    * @returns {Promise}
    * @memberOf thinkster.staff.services.Staff
    */
    function all() {
        return $http.get('/api/v1/staff/');
        }

    /**
    * @name create
    * @desc Create a new Staff
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf thinkster.staff.services.Staff
    */
    function create(name, lab) {
        return $http.post('/api/v1/staff/', {
            name: name,
            lab: lab
        });
    }

    /**
     * @name get
     * @desc Get the Staff of a given user
     * @param {string} username The username to get Posts for
     * @returns {Promise}
     * @memberOf thinkster.staff.services.Staff
     */
    function get(username) {
        return $http.get('/api/v1/accounts/' + username + '/staff/');
        }


    function get_obj(id) {
        return $http.get('/api/v1/staff/' + id + '/');
        }
    }
})();
