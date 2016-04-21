var profileModule = angular.module('profileCtrl',[]);

profileModule.controller('ProfileController', ['$scope', '$rootScope', '$state' , 'Auth', function($scope, $rootScope, $state, Auth){

    $scope.logOut = function(){
      Auth.logOut();
      $rootScope.hideTabs = true;
      $state.transitionTo('login');
    }

}]);
