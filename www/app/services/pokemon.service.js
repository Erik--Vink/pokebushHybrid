angular.module('PokemonService', []).factory('Pokemon', ['Resource', 'baseApiUrl', 'Auth', function($resource, baseApiUrl, Auth){
  return {
    get: function(params) {
      return $resource(baseApiUrl + 'pokemon').get(params);
    },
    getOne: function(name){
      return $resource(baseApiUrl + 'pokemon/'+name).get();
    },
    getMyPokemon: function(user){
      return $resource(baseApiUrl + 'user/'+user._id+'/pokemon/').query();
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
