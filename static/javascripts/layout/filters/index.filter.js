(function () {
    'use strict';

    angular
        .module('thinkster.layout.filters')
        .filter('IndexFilter', IndexFilter);

    IndexFilter.$inject = ['$rootScope'];



    /**
     * @namespace IndexController
     */
    function IndexFilter($rootScope) {
        var vm = this;
        $rootScope.theFilter = '';
        vm.myFilter = $rootScope.theFilter;


        return function( items, combo) {
            var filtered = [];

            //console.log(items, combo);

            angular.forEach(items, function(item) {console.log(item.username);

                if(item.username == "qq"){
                    filtered.push(item);
                }
            });

            return filtered;
        };

    }
})();


//var sortingOrder = 'name'; //default sort
//
//function initApp($scope, $filter) {
//
//  // init
//  $scope.sortingOrder = sortingOrder;
//  $scope.pageSizes = [5,10,25,50];
//  $scope.reverse = false;
//  $scope.filteredItems = [];
//  $scope.groupedItems = [];
//  $scope.itemsPerPage = 10;
//  $scope.pagedItems = [];
//  $scope.currentPage = 0;
//  $scope.items = generateData();
//
//var searchMatch = function (haystack, needle) {
//    if (!needle) {
//      return true;
//    }
//    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
//  };
//
//  // init the filtered items
//  $scope.search = function () {
//    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
//      for(var attr in item) {
//        if (searchMatch(item[attr], $scope.query))
//          return true;
//      }
//      return false;
//    });
//    // take care of the sorting order
//    if ($scope.sortingOrder !== '') {
//      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
//    }
//    $scope.currentPage = 0;
//    // now group by pages
//    $scope.groupToPages();
//  };
//}