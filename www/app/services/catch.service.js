angular.module('CatchService', []).factory('Catch', ['$state', '$timeout', 'baseApiUrl', '$http', 'Auth', function ($state, $timeout, baseApiUrl, $http, Auth) {
  var curr = null;
  var time = [];
  var target = null;
  var baseTimeMinutes = 3;
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
      stopTimers();
    } else {
      time.push($timeout(appear, rnTime()));

      if(curr == null && marker == null) {
        stopTimers();
      }
    }
    curr = marker;
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
      $timeout.cancel(out);
    });
    time.length = 0;
  }

  function _catch(){
    if(!target.rarity){
      if(Math.random() <= defaultRarity){
        on_catch();
        return true;
      }
      return false;
    }
  }

  function on_catch(){
    Auth.getUserStatus().$promise.then(function(user){
      $http({
        method: 'PUT',
        url: baseApiUrl + 'user/' + user._id + '/pokemon/' + target.lowerName
      });
    });
  }

}]);
