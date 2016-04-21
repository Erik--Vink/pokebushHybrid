angular.module('MarkerService', []).factory('Marker', ['Resource', 'baseApiUrl', 'Area', function($resource, baseApiUrl, Area){
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
      }
      else{
        return markers;
      }
    },
    getMarker: function(id) {
      return $resource(baseApiUrl + 'area').get();
    }
  }
}]);
