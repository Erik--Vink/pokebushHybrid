angular.module('MarkerService', []).factory('Marker', ['Resource', 'baseApiUrl', 'Area', '$q', function($resource, baseApiUrl, Area, $q){
  var markers = null;

  return {
    getMarkers: function() {
      if(markers == null) {
        markers = [];
        return Area.get().$promise.then(function(response){
          response.forEach(function(area){
            console.log("push -> " + area.name);
            markers.push(area);
          });
          return markers;
        });
      } else {
        return $q.when(markers);
      }
    },
    getMarker: function(id) {
      return $resource(baseApiUrl + 'area').get();
    }
  }
}]);
