angular.module('alertDirective',[])

.controller('IonicAlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = 'close' in $attrs;
  this.close = $scope.close;
}])

.directive('alert', function () {
  return {
    restrict: 'EA',
    controller: 'IonicAlertController',
    template: '<div class=\"card\" role=\"alert\"><a class=\"item item-text-wrap item-icon-right pointer\" ng-class=\"\'alert-\' + type\"><div ng-transclude></div><i ng-show=\"closeable\" class=\"icon ion-close\" ng-click=\"close()\"></i></a></div>',
    // template: 'templates/alert.html',
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&'
    }
  }

});
