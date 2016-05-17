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
    .state('mypokemon', {
      url:'/mypokemon',
      controller: 'MypokemonController',
      templateUrl: 'app/mypokemon/mypokemon.html',
      authenticate: true,
      cache:false,
      resolve: {
        myPokemon: function(Auth, Pokemon) {
          return Auth.getUserStatus().$promise.then(function(user){
            return Pokemon.getMyPokemon(user);
          });
        }
      }
    })
    .state('profile', {
      url:'/profile',
      controller: 'ProfileController',
      templateUrl: 'app/profile/profile.html',
      authenticate: true,
      resolve: {
        user: function(Auth) {
          return Auth.getUserStatus();

        }
      }
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
    })
    .state('pokemon', {
      url: '/pokemon/:name',
      templateUrl: 'app/pokemon/pokemon.html',
      controller: 'PokemonController',
      authenticate: true,
      params: {'name': {}, 'object': null}
    })
    .state('catch', {
      url: '/catch/:name',
      templateUrl: 'app/catch/catch.html',
      controller: 'CatchController',
      authenticate: true,
      cache:false,
      params: {'name': {}, 'object': null}
    })
    .state('area', {
      url: '/area/:name',
      templateUrl: 'app/area/area.html',
      controller: 'AreaController',
      authenticate: true,
      params: {'name': {}, 'object': null}
    });

  $urlRouterProvider.otherwise('/login');

});
