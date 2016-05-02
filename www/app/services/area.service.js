angular.module('AreaService', []).factory('Area', ['Resource', 'baseApiUrl', function($resource, baseApiUrl){
  return {
    get: function() {
      return $resource(baseApiUrl + 'area').query();
    },
    getOne: function(name){
      return $resource(baseApiUrl + 'area/'+name).get();
    }
  }
}]);
