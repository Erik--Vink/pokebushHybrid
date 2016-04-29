angular.module('CatchService', []).factory('Catch', ['$timeout', function ($timeout) {
  var curr = null;
  var time = null;
  var baseTimeMinutes = 1;
  var minTimePercent = 80;
  var maxTimePercent = 160;

  return {
    zone: function (marker){
      if(curr == null && marker != null){ wait(); }
      curr = marker;
      if(curr == null && time != null){ cancel(); }
    },
    reset: function(){
      if(curr != null) { wait(); }
    }
  };

  function wait() {time = $timeout(appear, rnTime());}
  function cancel() { $timeout.cancel(time); }

  function rnTime() {
    var ms = baseTimeMinutes*60*1000;
    var min = minTimePercent/100;
    var add = (maxTimePercent - minTimePercent)/100;
    var all = (min+(Math.random()*add))*ms;
    console.log(all);
    console.log(all/60/1000);
    return all;
  }

  function appear() {
    var pokemon = _.sample(curr.pokemon);
    console.log("you caught a " + pokemon.name);
  }
}]);
