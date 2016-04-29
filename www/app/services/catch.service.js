angular.module('CatchService', []).factory('Catch', ['$timeout', function ($timeout) {
  var curr = null;
  var time = null;

  function zone(marker){
    if(curr == null && marker != null){ wait(); }
    curr = marker;
    if(curr == null && time != null){ cancel(); }
  }

  function wait(){
    time = $timeout(appear, 1000);
  }
  function cancel(){
    $timeout.cancel(time);
  }

  function appear(){
    //If triggers make a random pokemon appear
  }
}]);
