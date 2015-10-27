(function () {
    'use strict';

    angular
        .module('openlab.filters')
        .filter('IndexFilter', IndexFilter);

    IndexFilter.$inject = ['$rootScope'];

    /**
     * @namespace IndexFilter
     */
    function IndexFilter($rootScope) {

        return function(items, theFilter) {
            var filtered = [];

            angular.forEach(items, function(item) {
                if (theFilter) {
                    for(var attr in item) {//console.log(item[attr]);
                        if( item[attr] ){console.log(typeof item[attr], attr);
                        //    if(item[attr].indexOf(theFilter) > -1){
                        //        filtered.push(item);
                        //    }
                        }
                    }

                } else {
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