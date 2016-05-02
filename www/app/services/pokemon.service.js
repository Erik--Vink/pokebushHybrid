angular.module('PokemonService', []).factory('Pokemon', ['Resource', 'baseApiUrl', function($resource, baseApiUrl){
  return {
    get: function(params) {
      return $resource(baseApiUrl + 'pokemon').get(params);
    },
    getOne: function(name){
      return $resource(baseApiUrl + 'pokemon/'+name).get();
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
