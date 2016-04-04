var app = angular.module('appRoutes', []);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('login', {
      url:'/login',
      controller: 'AuthorizationController',
      templateUrl: 'app/auth/login.html'
    })
    .state('bush', {
      url:'/bush',
      templateUrl: 'app/bush/bush.html'
    })
    .state('search', {
      url:'/search',
      abstract: true,
      templateUrl: 'app/search/search.html'
    })
    .state('search.pokemon', {
      url: '/pokemon',
      views: {
        'search-pokemon': {
          templateUrl: 'app/search/searchPokemon.html',
          controller: 'SearchPokemonController'
        }
      }
    })
    .state('search.area', {
      url: '/area',
      views: {
        'search-area': {
          templateUrl: 'app/search/searchArea.html',
          controller: 'SearchAreaController'
        }
      }
    });
  ;

  $urlRouterProvider.otherwise('/login');



});



//config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {



    //$routeProvider
    //
    //    .when('/404', {
    //        templateUrl: 'views/404.html',
    //        access: {restricted: false}
    //    })
    //    .when('/', {
    //        templateUrl: 'app/bush/bush.html',
    //        controller: 'BushController',
    //        access: {restricted: true}
    //    })
    //    .when('/signup', {
    //        templateUrl: 'app/auth/signup.html',
    //        controller: 'AuthorizationController',
    //        access: {restricted: false}
    //    })
    //    .when('/login', {
    //        templateUrl: 'app/auth/login.html',
    //        controller: 'AuthorizationController',
    //        access: {restricted: false}
    //    })
    //    .when('/bush', {
    //        templateUrl: 'app/bush/bush.html',
    //        controller: 'BushController',
    //        access: {restricted: true}
    //    })
    //    .when('/mypokemon', {
    //        templateUrl: 'app/user/mypokemon.html',
    //        controller: 'MypokemonController',
    //        access: {restricted: true}
    //    })
    //    .when('/myprofile', {
    //        templateUrl: 'app/user/myprofile.html',
    //        controller: 'MyprofileController',
    //        access: {restricted: true}
    //    })
    //    .when('/searchpokemon', {
    //        templateUrl: 'app/search/searchPokemon.html',
    //        controller: 'SearchPokemonController',
    //        access: {restricted: true}
    //    })
    //    .when('/searcharea', {
    //        templateUrl: 'app/search/searchArea.html',
    //        controller: 'SearchAreaController',
    //        access: {restricted: true}
    //    });
    //
    //$routeProvider.otherwise('/login');
    //
    //$locationProvider.html5Mode(true);

//}]);
