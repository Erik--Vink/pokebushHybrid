angular.module('CatchService', []).factory('Catch', ['$state', '$timeout', function ($state, $timeout) {
  var curr = null;
  var time = null;
  var target = null;
  var baseTimeMinutes = 0.1;
  var minTimePercent = 80;
  var maxTimePercent = 160;
  var defaultRarity = 0.5;

  return {
    zone: function (marker){
      if(target != null){
        if(time != null){ cancel(); }
      } else if(curr == null) {
        if(marker != null){
          wait();
        } else if (time != null) {
          cancel();
        }
      }
      curr = marker;
    },
    reset: function(){
      target = null;
      if(curr != null) { wait(); }
    },
    catch: function(){
      if(trycatch()){
        //do something.
      }
    }
  };

  function wait() {
    time = $timeout(appear, rnTime());
  }
  function cancel() { $timeout.cancel(time); console.log(time); }

  function rnTime() {
    var ms = baseTimeMinutes*60*1000;
    var min = minTimePercent/100;
    var add = (maxTimePercent - minTimePercent)/100;
    var all = (min+(Math.random()*add))*ms;
    //console.log(all);
    //console.log(all/60/1000);
    return all;
  }

  function appear() {
    target = _.sample(curr.pokemon);
    $state.go('catch', {object: target});
  }
  function trycatch(){
   if(!target.rarity){
     if(Math.random() <= defaultRarity){
       console.log("success");
       return true;
     } else {
       console.log("no luck");
       return false;
     }
   }
  }
}]);
