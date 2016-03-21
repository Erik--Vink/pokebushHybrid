var searchControllers = angular.module('searchControllers', []);

searchControllers.controller('SearchPokemonCtrl', ['$scope', '$http', function ($scope, $http){

  $http.get('https://powerful-depths-54671.herokuapp.com/ios/pokemon').success(function(data){
    $scope.pokemons = data;
  });

}]);

searchControllers.controller('SearchAreaCtrl', ['$scope', '$http', function ($scope, $http){
  //
  //$http.get('https://powerful-depths-54671.herokuapp.com/ios/pokemon').success(function(data){
  //  $scope.pokemons = data;
  //});

}]);
