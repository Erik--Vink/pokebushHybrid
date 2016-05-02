var mypokemonModule = angular.module('mypokemonCtrl',[]);

mypokemonModule.controller('MypokemonController', ['$scope', '$state' , 'Pokemon', function($scope, $state, Pokemon){
  $scope.myPokemon = [];
  Pokemon.getMyPokemon().$promise.then(function(data){
    data.forEach(function(pokemon){
      $scope.myPokemon.push(pokemon);
    });
    console.log($scope.myPokemon);
  });


}]);
