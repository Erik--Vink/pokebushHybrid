var searchController = angular.module('searchCtrl',[]);

searchController.controller('SearchController', function($scope) {

});

searchController.controller('PokemonSearchController', ['$scope', '$state', 'Pokemon', '$timeout', function($scope, $state, Pokemon, $timeout){

  $scope.morePokemonsCanBeLoaded = false;
  $scope.pokemons = [];

  var nextPageParams = "";
  var expr = /(\w+)\=(\d+|\w+)/g;

  var getPokemons = function(){
    Pokemon.get(nextPageParams).$promise.then(function(data){
      data.result.forEach(function(pokemon){
        $scope.pokemons.push(pokemon);
      });
      if(data.next){// If the pokemon request contains a 'next' url
        //Parse the url to a params object
        var params = {};
        var regexParams = data.next.match(expr);
        regexParams.forEach(function(param){
          var parts = param.split('=');
          if(/^\d+$/.test(parts[1])){//If it is a number, parse the string to an int
            parts[1] = parseInt(parts[1]);
          }
          params[parts[0]] = parts[1];
        });

        nextPageParams = params;
        $scope.morePokemonsCanBeLoaded = true
      }
      else{
        nextPageParams = "";
        $scope.morePokemonsCanBeLoaded = false
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  var timeout;
  $scope.filterPokemons = function(){
    if (timeout != null) {
      $timeout.cancel(timeout);
    }
    timeout = $timeout(function() {
      nextPageParams = {
        "q": $scope.params.q
      };
      $scope.pokemons = [];
      getPokemons();
    }, 500);
  };

  $scope.loadNextPage = function(){
    if($scope.morePokemonsCanBeLoaded){//If a link to the next result was provided
      getPokemons();
    }
  };

  $scope.$on('$stateChangeSuccess', function() {
    if($scope.pokemons.length <1){
      getPokemons();
    }
  });
}]);

searchController.controller('AreaSearchController', ['$scope', '$state', 'Area', function($scope, $state, Area){

  $scope.areas = [];

  var getAreas = function(){
    Area.get().$promise.then(function(data){
      $scope.areas = data;
    });
  };

  $scope.$on('$stateChangeSuccess', function() {
    if($scope.areas.length <1){
      getAreas();
    }
  });
}]);
