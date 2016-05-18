var profileModule = angular.module('profileCtrl',[]);

profileModule.controller('ProfileController', ['$scope', '$rootScope', '$state' , 'Auth', 'user', function($scope, $rootScope, $state, Auth, user){

    $scope.user = user;

    $scope.logOut = function(){
      Auth.logOut();
      $rootScope.hideTabs = true;
      $state.transitionTo('app.login');
    }

}]);
