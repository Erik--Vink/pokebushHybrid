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
  'searchCtrl'
]);

app.constant('baseApiUrl', "https://powerful-depths-54671.herokuapp.com/api/");
app.constant('baseUrl', "https://powerful-depths-54671.herokuapp.com/");
//app.constant('baseApiUrl', "http://localhost:3010/api/");
//app.constant('baseUrl', "http://localhost:3010/");

app.run(function ($rootScope, $location, Auth, Pokemon, $http, $window, $cookies, $state) {


  $rootScope.$on("$stateChangeStart",
    function (event, toState, toParams, fromState, fromParams) {

      //Set request token for every route
      $http.defaults.headers.common['x-access-token']= $window.localStorage['x-access-token'];

      if(toState.access.restricted != false){
        Auth.getUserStatus();
      }

      if (toState.access.restricted && !Auth.isLoggedIn()) {
        $state.go('login');
      }

    });

    //$rootScope.$on('$routeChangeStart',
    //    function (event, next, current) {
    //
    //        Auth.getUserStatus().$promise.then(function(result){
    //            if (next.access.restricted && !Auth.isLoggedIn()) {
    //                $location.path('/login');
    //                //$route.reload();
    //            }
    //        },function(error){
    //            if (next.access.restricted && !Auth.isLoggedIn()) {
    //                $location.path('/login');
    //                //$route.reload();
    //            }
    //        });
    //        //Auth.getUserStatus(); // Determine if the user needs to be redirected
    //    });
});
