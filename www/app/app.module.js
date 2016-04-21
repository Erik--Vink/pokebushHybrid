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
  'app.directives',
  'alertDirective'
]);

app.constant('baseApiUrl', "https://powerful-depths-54671.herokuapp.com/api/");
app.constant('baseUrl', "https://powerful-depths-54671.herokuapp.com/");

app.run(function ($rootScope, $location, Auth, $http, $window, $cookies, $state) {


  $rootScope.$on("$stateChangeStart",
    function (event, toState, toParams, fromState, fromParams) {

      if(Auth.isLoggedIn()){
        //Set request token for every route
        $http.defaults.headers.common['x-access-token']= $window.localStorage['x-access-token'];
        //Get the user info if a token exists.
        Auth.getUserStatus();
      }

      if (toState.authenticate  && !Auth.isLoggedIn()) {
        //redirect to the login page if the page requires authentication and no token exists.
        $state.transitionTo("login");
        event.preventDefault();
      }

    });

});


