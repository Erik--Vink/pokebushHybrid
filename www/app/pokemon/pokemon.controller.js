var pokemonController = angular.module('pokemonCtrl',[]);

pokemonController.controller('PokemonController', ['$scope','Pokemon', '$stateParams', function($scope, Pokemon, $stateParams){

  $scope.pokemon = $stateParams.object;
}]);
