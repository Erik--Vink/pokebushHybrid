var authControllers = angular.module('authCtrl',[]);

authControllers.controller('AuthorizationController', ['$scope', 'Auth', '$state', function($scope, Auth, $state){

  $scope.user = {};

  $scope.closeAlert = function(){
    $scope.alert = null;
  };

  $scope.logIn = function(){
    Auth.logIn($scope.user).$promise.then(function(data){
      $state.transitionTo("bush");
    },function(error){
      if(error.data.message){
        $scope.alert = { type: 'warning', msg: error.data.message };
        console.log($scope.alert);
      }
      else{
        $scope.alert = { type: 'warning', msg: error.data.loginMessage };
      }
    });
  };

  $scope.signUp = function(){
    Auth.signUp($scope.user).$promise.then(function(data){
      $location.path('bush');
    },function(error){
      $scope.error = error.data.signupMessage;
    });
  };

}]);
