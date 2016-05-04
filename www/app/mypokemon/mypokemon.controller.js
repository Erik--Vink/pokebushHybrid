var mypokemonModule = angular.module('mypokemonCtrl',[]);

mypokemonModule.controller('MypokemonController', ['$scope', '$state' , 'Pokemon', 'myPokemon', function($scope, $state, Pokemon, myPokemon){

  myPokemon.$promise.then(function(data){
    $scope.myPokemon = data;
  });

}]);
