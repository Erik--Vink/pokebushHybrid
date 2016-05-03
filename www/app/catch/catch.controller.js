var catchController = angular.module('catchCtrl',[]);

catchController.controller('CatchController', ['$scope','Pokemon', '$stateParams', 'Catch', '$state', function($scope, Pokemon, $stateParams, Catch, $state){
  console.log($stateParams.object);
  if($stateParams.object){
    $scope.pokemon = $stateParams.object;
  }
  else{
    Pokemon.getOne($stateParams.name).$promise.then(function(data){
      $scope.pokemon = data;
    });
  }

  $scope.catch = function(){
    Catch.catch();
    Catch.reset();
    $state.go('bush');
  }
  $scope.leave = function(){
    Catch.reset();
    $state.go('bush');
  }
}]);
