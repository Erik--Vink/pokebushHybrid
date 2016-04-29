angular.module('MapsService', []).factory('Map', ['$cordovaGeolocation', 'Marker', 'Catch', function ($cordovaGeolocation, Marker, Catch) {
  var map = null;
  var currentPosMarker;
  var rad = Math.PI / 180;

  function initMap() {

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      //Load map
      google.maps.event.addListenerOnce(map, 'idle', function () {
        //Load the markers
        loadMarkers();
      });
    });

    var watchOptions = {
      timeout: 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function (err) { /* Error: do nothing. */ },
      function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var currentLocation = new google.maps.LatLng(lat, long);

        if (currentPosMarker) {
          currentPosMarker.setPosition(currentLocation);
        } else {
          currentPosMarker = new google.maps.Marker({
            map: map,
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 5
            },
            position: currentLocation
          });
        }

        closest(200, function (closest) {
          Catch.zone(closest);
        });
      });
  }

  var calls = 0;
  function closest(range, callback){
    Marker.getMarkers().then(function(markers){
      var closestDistance = null;
      console.log(markers);
      var closest = _.reduce(markers, function (collector, marker) {
        var currentDistance = dist(currentPosMarker.position.lat(), currentPosMarker.position.lng(), marker.lat, marker.long);
        if(collector == null || currentDistance < closestDistance) {
          closestDistance = currentDistance;
          return marker;
        } else { return collector; }
      }, null);
      if(closestDistance <= range) {
        callback(closest);
      } else {
        callback(null);
      }
    });
  }

  function dist(latA, longA, latB, longB){
    var a = 0.5 - Math.cos(Math.abs(latA - latB) * rad)/2 +
      Math.cos(latA * rad) * Math.cos(latB * rad) *
      (1 - Math.cos((longA - longB) * rad))/2;

    return 12742000 * Math.asin(Math.sqrt(a));
  }

  function loadMarkers() {

    //Get all of the markers from our Marker factory
    Marker.getMarkers().then(function (markers) {
      var records = markers;

      for (var i = 0; i < records.length; i++) {

        var record = records[i];
        var markerPos = new google.maps.LatLng(record.lat, record.long);

        // Add the markerto the map
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: markerPos
        });

        var infoWindowContent = "<h4>" + record.name + "</h4>";

        addInfoWindow(marker, infoWindowContent, record);
      }
    });
  }

  function addInfoWindow(marker, message, record) {
    var infoWindow = new google.maps.InfoWindow({
      content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  }

  return {
    init: function () {
      initMap();
    }
  }
}]);
