var profileModule = angular.module('profileCtrl',[]);

profileModule.controller('ProfileController', ['$scope', '$rootScope', '$state' , 'Auth', 'user', function($scope, $rootScope, $state, Auth, user){

    console.log(user);

    $scope.user = user;

   //Auth.currentUser().$promise.then(function(user){
   //  $scope.user = user;
   //});
    console.log($scope.user);

    //$scope.$on('$stateChangeSuccess', function() {
    //  console.log("success");
    //
    //  console.log($scope.user);
    //});

    $scope.logOut = function(){
      Auth.logOut();
      $rootScope.hideTabs = true;
      $state.transitionTo('login');
    }

}]);
