var app = angular.module('app', [
  'ionic',
  'ngResource',
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

app.run(function ($rootScope, $location, Auth) {

    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {

            Auth.getUserStatus().$promise.then(function(result){
                if (next.access.restricted && !Auth.isLoggedIn()) {
                    $location.path('/login');
                    //$route.reload();
                }
            },function(error){
                if (next.access.restricted && !Auth.isLoggedIn()) {
                    $location.path('/login');
                    //$route.reload();
                }
            });
            //Auth.getUserStatus(); // Determine if the user needs to be redirected
        });
});
