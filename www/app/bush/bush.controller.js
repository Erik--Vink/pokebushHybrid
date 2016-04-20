var module = angular.module('bushCtrl',[]);

module.controller('BushController', ['$scope','Pokemon', function($scope, Pokemon){

  $scope.alerts = [
    { type: 'warning', msg: 'Error! Change a few things and try again.' },
    { type: 'success', msg: 'Success! You successfully did something.' },
    { type: 'info', msg: 'Note: something happened that you should know about.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type: 'info', msg: 'A new alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}]);
