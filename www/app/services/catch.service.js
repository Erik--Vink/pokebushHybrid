angular.module('CatchService', []).factory('Catch', ['$state', '$timeout', function ($state, $timeout) {
  var curr = null;
  var time = [];
  var target = null;
  var baseTimeMinutes = 0.1;
  var minTimePercent = 80;
  var maxTimePercent = 160;
  var defaultRarity = 0.5;

  return {
    zone: zone,
    reset: reset,
    catch: _catch
  };

  function rnTime() {
    var ms = baseTimeMinutes*60*1000;
    var min = minTimePercent/100;
    var add = (maxTimePercent - minTimePercent)/100;
    var all = (min+(Math.random()*add))*ms;
    return all;
  }

  function appear() {
    target = _.sample(curr.pokemon);
    $state.go('catch', {object: target});
  }

  function zone(marker){
    if(target != null) {
      $timeout.cancel(time);
    } else {
      time.push($timeout(appear, rnTime()));

      if(curr == null && marker == null) {
        stopTimers();
      } else {
        curr = marker;
      }
    }
  }

  function reset(){
    stopTimers();
    target = null;
    zone(curr);
  }

  function stopTimers(){
    var count = 0;
    _.forEach(time, function(out){
      count++;
      console.log("Cancelling " + count + " timers");
      $timeout.cancel(out);
    });
    time.length = 0;
  }

  function _catch(){
    if(!target.rarity){
      if(Math.random() <= defaultRarity){
        console.log("Caught!");
      }
    }
  }
}]);
