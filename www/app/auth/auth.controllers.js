var authControllers = angular.module('authCtrl',[]);

authControllers.controller('AuthorizationController', ['$scope', 'Auth', '$location', function($scope, Auth, $location){

  $scope.user = {};

  $scope.logIn = function(){
    Auth.logIn($scope.user).$promise.then(function(data){
      console.log(data);
      //$location.path('bush');
    },function(error){
      console.log(error);
      if(error.data.message){
        $scope.error = error.data.message;
      }
      else{
        $scope.error = error.data.loginMessage;
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
