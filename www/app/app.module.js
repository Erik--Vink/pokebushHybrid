var app = angular.module('app', [
  'ionic',
  'ngCordova',
  'ngResource',
  'ngCookies',
  'ResourceService',
  'AuthorizationService',
  'appRoutes',
  'PokemonService',
  'AreaService',
  'MarkerService',
  'MapsService',
  'ResourceService',
  'authCtrl',
  'bushCtrl',
  'mypokemonCtrl',
  'profileCtrl',
  'searchCtrl',
  'pokemonCtrl',
  'areaCtrl',
  'app.directives',
  'alertDirective',
  'CatchService',
  'catchCtrl'
]);

app.constant('baseApiUrl', "https://powerful-depths-54671.herokuapp.com/api/");
app.constant('baseUrl', "https://powerful-depths-54671.herokuapp.com/");

app.run(function ($ionicPlatform, $rootScope, $location, Auth, $http, $window, $cookies, $state, Catch, $timeout) {

  //$ionicPlatform.ready(function() {
  //  $state.transitionTo("login");
  //  event.preventDefault();
  //
  //  //if(window.cordova && window.cordova.plugins.Keyboard) {
  //  //    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //  //    // for form inputs)
  //  //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //  //
  //  //    // Don't remove this line unless you know what you are doing. It stops the viewport
  //  //    // from snapping when text inputs are focused. Ionic handles this internally for
  //  //    // a much nicer keyboard experience.
  //  //    cordova.plugins.Keyboard.disableScroll(true);
  //  //}
  //  //if(window.StatusBar) {
  //  //    StatusBar.styleDefault();
  //  //}
  //  //navigator.splashscreen.hide();
  //});


  $rootScope.$on("$stateChangeStart",
    function (event, toState, toParams, fromState, fromParams) {
      $rootScope.previousState = fromState;

      if(Auth.isLoggedIn()){
        //Set request token for every route
        $http.defaults.headers.common['x-access-token']= $window.localStorage['x-access-token'];
        //Get the user info if a token exists.
        Auth.getUserStatus();

        //Reset the timers if the previous state was 'Catch'
        if(fromState.name == 'catch'){
          Catch.reset();
        }
      }
      else{
        if (toState.authenticate  && !Auth.isLoggedIn()) {
          //redirect to the login page if the page requires authentication and no token exists.
          $state.transitionTo("login");
          event.preventDefault();
        }
      }

    });

});


