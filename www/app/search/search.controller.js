var searchController = angular.module('searchCtrl',[]);

searchController.controller('SearchController', ['$scope','Pokemon', function($scope, Pokemon){
  $scope.params = {
    "page" : 0,
    "limit": 20,
    "types": []
  };

  Pokemon.get($scope.params).$promise.then(function(data){
    $scope.pokemons = data.result;
  });
}]);
