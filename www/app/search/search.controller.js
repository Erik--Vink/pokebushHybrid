var searchController = angular.module('searchCtrl',[]);

searchController.controller('SearchController', function($scope) {

});

searchController.controller('PokemonSearchController', ['$scope', '$state', 'Pokemon', '$timeout', function($scope, $state, Pokemon, $timeout){
  $scope.params = {
    "page" : 0,
    "limit": 20,
    "types": [],
    "q": ""
  };

  var nextPage = "";

  var expr = /(\w+)\=(\d+|\w+)/g;

  var getPokemons = function(){
    Pokemon.get($scope.params).$promise.then(function(data){
      $scope.pokemons = data.result;
      if(data.next){
        data.next.match
      }
      nextPage = data.next; // /api/pokemon/?limit ...
    });
  };

  $scope.filterPokemons = function(){
      $timeout(function(){
        getPokemons();
      }, 1000);
  };

  $scope.loadNextPage = function(){



    Pokemon.get($scope.params).$promise.then(function(data){
      data.result.forEach(function(pokemon){
        $scope.pokemons.push(pokemon);
      });

      nextPage = data.next; // /api/pokemon/?limit ...
    });

  };

  getPokemons();
}]);
