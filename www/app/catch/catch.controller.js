var catchController = angular.module('catchCtrl',[]);

catchController.controller('CatchController', ['$scope','Pokemon', '$stateParams', 'Catch', '$state', '$rootScope', '$cordovaVibration', function($scope, Pokemon, $stateParams, Catch, $state, $rootScope, $cordovaVibration){

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
    if($rootScope.previousState.name == 'pokemon'){
      $state.transitionTo("search.pokemon");
    }
    else if($rootScope.previousState.name == 'area'){
      $state.transitionTo("search.area");
    }
    else{
      $state.transitionTo($rootScope.previousState.name, {}, {reload:true});
    }
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    $cordovaVibration.vibrate(100);
  });

}]);
