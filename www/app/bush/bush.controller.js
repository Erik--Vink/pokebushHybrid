var bushModule = angular.module('bushCtrl',[]);

bushModule.controller('BushController', ['$scope', '$cordovaGeolocation', 'Map', function($scope, $cordovaGeolocation, Map){

  //Init the map
  Map.init();



}]);
