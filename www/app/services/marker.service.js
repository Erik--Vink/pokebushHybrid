angular.module('MarkerService', []).factory('Marker', ['Resource', 'baseApiUrl', 'Area', '$q', function($resource, baseApiUrl, Area, $q){
  var markers = [];

  return {
    getMarkers: function() {
      if(markers.length <1){
        return Area.get().$promise.then(function(response){
          response.forEach(function(area){
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
