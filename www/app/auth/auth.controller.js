var authControllers = angular.module('authCtrl',[]);

authControllers.controller('AuthorizationController', ['$scope', 'Auth', '$state', '$ionicHistory' , function($scope, Auth, $state, $ionicHistory){

  $scope.$on("$ionicView.enter", function () {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  });

  $scope.user = {};

  $scope.closeAlert = function(){
    $scope.alert = null;
  };

  $scope.logIn = function(){
    Auth.logIn($scope.user).$promise.then(function(data){
      $state.transitionTo("app.bush");
    },function(error){
      if(error.data.message){
        $scope.alert = { type: 'warning', msg: error.data.message };
      }
      else{
        $scope.alert = { type: 'warning', msg: error.data.loginMessage };
      }
    });
  };

}]);
