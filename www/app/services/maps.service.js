angular.module('MapsService', []).factory('Map', ['$cordovaGeolocation', 'Marker', function($cordovaGeolocation, Marker){
  var apiKey = false;
  var map = null;

  function initMap(){

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){

        //Load the markers
        loadMarkers();

        //TODO: fix the currentPosMarker

        var currentPosMarker = new google.maps.Marker({
          map: map,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5
          },
          position: latLng
        });

        var watchOptions = {
          //frequency : 1000,
          timeout : 3000,
          enableHighAccuracy: false // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(function(position) {
          var lat         = position.coords.latitude,
            long            = position.coords.longitude,
            currentLocation = new google.maps.LatLng(lat, long);
          currentPosMarker.setPosition(currentLocation);

          console.log('assigning your new position');

        }, function(error) {
          console.log('Error w/ watchPosition: ' + error);
        });

      });

    }, function(error){
      console.log("Could not get location");

      //Load the markers
      loadMarkers();

    });

  }

  function loadMarkers(){

    //Get all of the markers from our Marker factory
    Marker.getMarkers().then(function(markers){

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

  function initLocationProcedure() {
    initializeMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        errorCallback_highAccuracy,
        {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
    } else {
      alert("Your Phone does not support Geolocation");
    }
  }

  function displayAndWatch(position) {
    // set current position
    setCurrentPosition(position);
    // watch position
    watchCurrentPosition();
  }

  function errorCallback_highAccuracy(position) {
  }

  function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(
      function (position) { setMarkerPosition(currentPositionMarker,position);
      }, error, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
  }
  function error(){
  }

  function setMarkerPosition(marker, position) {
    marker.setPosition(
      new plugin.google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude)

    );
  }

  function setCurrentPosition(pos) {
    currentPositionMarker = map.addMarker({
      'position': new plugin.google.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      )

    }, function(marker) {
      currentPositionMarker = marker;
    });
    map.setCenter(new plugin.google.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    ));
  };

  return {
    init: function(){
      initMap();
    }
  }
}]);
