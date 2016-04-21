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
      controller: 'BushController',
      templateUrl: 'app/bush/bush.html',
      authenticate: true
    })
    .state('profile', {
      url:'/profile',
      controller: 'ProfileController',
      templateUrl: 'app/profile/profile.html',
      authenticate: true
    })
    .state('search', {
      url:'/search',
      templateUrl: 'app/search/search.html',
      controller: 'SearchController',
      authenticate: true
    })
    .state('search.pokemon', {
      url: '/pokemon',
      templateUrl: 'app/search/searchPokemon.html',
      authenticate: true
    })
    .state('search.area', {
      url: '/area',
      templateUrl: 'app/search/searchArea.html',
      authenticate: true
    });

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
