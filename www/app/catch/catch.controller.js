var catchController = angular.module('catchCtrl',[]);

catchController.controller('CatchController', ['$scope','Pokemon', '$stateParams', 'Catch', '$state', '$rootScope', function($scope, Pokemon, $stateParams, Catch, $state, $rootScope){

  if($stateParams.object){
    $scope.pokemon = $stateParams.object;
  }
  else{
    Pokemon.getOne($stateParams.name).$promise.then(function(data){
      $scope.pokemon = data;
    });
  }

  $scope.catch = function(){
    if(Catch.catch()){
      $scope.catchMessage = "Gotcha!\n" + $scope.pokemon.name + " was caught.";
    } else {
      $scope.catchMessage = "Aargh, almost had it!";
    }
  };

  $scope.leave = function(){
    $state.transitionTo($rootScope.previousState.name, {}, {reload:true});
  };

}]);
