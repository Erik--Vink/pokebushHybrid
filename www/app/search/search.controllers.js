var searchControllers = angular.module('searchCtrl',[]);

searchControllers.controller('SearchPokemonController', ['$scope','Pokemon', function($scope, Pokemon){
  console.log("search pokeys");
  $scope.params = {
    "page" : 0,
    "limit": 20,
    "types": []
  };

  Pokemon.get($scope.params).$promise.then(function(data){
    $scope.pokemons = data.result;
  });
}]);

searchControllers.controller('SearchAreaController', ['$scope', '$http', function ($scope, $http){
  //
  //$http.get('https://powerful-depths-54671.herokuapp.com/api/ios/pokemon').success(function(data){
  //  $scope.pokemons = data;
  //});

}]);
