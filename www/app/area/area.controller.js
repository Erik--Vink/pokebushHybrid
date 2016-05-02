var areaController = angular.module('areaCtrl',[]);

areaController.controller('AreaController', ['$scope','Area', '$stateParams', function($scope, Area, $stateParams){

  if($stateParams.object){
    $scope.area = $stateParams.object;
  }
  else{
    Area.getOne($stateParams.name).$promise.then(function(data){
      $scope.area = data;
    });
  }

}]);
