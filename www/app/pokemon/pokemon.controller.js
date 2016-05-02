var pokemonController = angular.module('pokemonCtrl',[]);

pokemonController.controller('PokemonController', ['$scope','Pokemon', '$stateParams', function($scope, Pokemon, $stateParams){

  if($stateParams.object){
    $scope.pokemon = $stateParams.object;
  }
  else{
    Pokemon.getOne($stateParams.name).$promise.then(function(data){
      $scope.pokemon = data;
    });
  }

}]);
