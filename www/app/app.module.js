var app = angular.module('app', [
  'ionic',
  'ngResource',
  'ngCookies',
  'ResourceService',
  'AuthorizationService',
  'appRoutes',
  'PokemonService',
  'ResourceService',
  'authCtrl',
  'bushCtrl',
  'profileCtrl',
  'searchCtrl',
  'alertDirective'
]);

app.constant('baseApiUrl', "https://powerful-depths-54671.herokuapp.com/api/");
app.constant('baseUrl', "https://powerful-depths-54671.herokuapp.com/");

app.run(function ($rootScope, $location, Auth, Pokemon, $http, $window, $cookies, $state) {


  $rootScope.$on("$stateChangeStart",
    function (event, toState, toParams, fromState, fromParams) {

      //Set request token for every route
      $http.defaults.headers.common['x-access-token']= $window.localStorage['x-access-token'];

      if(toState.authenticate  != false){
        Auth.getUserStatus();
      }

      if (toState.authenticate  && !Auth.isLoggedIn()) {
        $state.transitionTo("login");
        event.preventDefault();
      }

    });

});


