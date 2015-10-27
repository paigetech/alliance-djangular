/**
* Direction
* @namespace openlab.directions.services
*/
(function () {
  'use strict';

  angular
    .module('openlab.directions.services')
    .factory('Direction', Direction);

  Direction.$inject = ['$http'];

  /**
  * @namespace Direction
  */
  function Direction($http) {
    /**
    * @name Direction
    * @desc The factory to be returned
    * @memberOf openlab.profiles.services.Profile
    */
    var Direction = {
      destroy: destroy,
      get: get,
      update: update,
      all: all
    };

    return Direction;

    /////////////////////

    /**
    * @name destroy
    * @desc Destroys the given profile
    * @param {Object} profile The profile to be destroyed
    * @returns {Promise}
    * @memberOf openlab.profiles.services.Profile
    */
    function destroy(direction) {
      return $http.delete('/api/v1/directions/' + direction + '/');
    }


    /**
    * @name get
    * @desc Gets the profile for user with username `username`
    * @param {string} username The username of the user to fetch
    * @returns {Promise}
    * @memberOf openlab.profiles.services.Profile
    */
    function get(direction) {
      return $http.get('/api/v1/directions/' + direction + '/');
      //  return $http.get('/api/v1/accounts/' + user + '/'+user.direction+'/');
    }

    /**
    * @name update
    * @desc Update the given profile
    * @param {Object} profile The profile to be updated
    * @returns {Promise}
    * @memberOf openlab.profiles.services.Profile
    */
    function update(direction) {
      return $http.put('/api/v1/directions/' + direction.name + '/', direction);
    }

    /**
    * @name all
    * @desc Get all Profiles
    * @returns {Promise}
    * @memberOf openlab.profiles.services.Profile
    */
    function all() {
      return $http.get('/api/v1/directions/');
    }
  }
})();