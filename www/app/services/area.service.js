angular.module('AreaService', []).factory('Area', ['Resource', 'baseApiUrl', function($resource, baseApiUrl){
  return {
    get: function() {
      return $resource(baseApiUrl + 'area').query();
    }
    //,
    //addArea: function(pokemon,area) {
    //  return $resource(baseApiUrl + 'pokemon/'+pokemon.lowerName+"/area/"+area.canonicalName).update(area);
    //},
    //deleteArea: function(pokemon,area) {
    //  return $resource(baseApiUrl + 'pokemon/'+pokemon.lowerName+"/area/"+area.canonicalName).delete();
    //}
  }
}]);
