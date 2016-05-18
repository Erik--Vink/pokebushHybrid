var app = angular.module('appRoutes', []);

app.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider){

  $ionicConfigProvider.views.transition('platform');

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app/menu/menu.html"
    })
    .state('app.login', {
      url:'/login',
      controller: 'AuthorizationController',
      templateUrl: 'app/auth/login.html'
    })
    .state('app.bush', {
      url:'/bush',
      controller: 'BushController',
      templateUrl: 'app/bush/bush.html',
      authenticate: true
    })
    .state('app.mypokemon', {
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
    .state('app.profile', {
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
    .state('app.search', {
      url:'/search',
      templateUrl: 'app/search/search.html',
      controller: 'SearchController',
      abstract: true,
      authenticate: true
    })
    .state('app.search.pokemon', {
      url: '/pokemon',
      templateUrl: 'app/search/searchPokemon.html',
      authenticate: true
    })
    .state('app.search.area', {
      url: '/area',
      templateUrl: 'app/search/searchArea.html',
      authenticate: true
    })
    .state('app.pokemon', {
      url: '/pokemon/:name',
      templateUrl: 'app/pokemon/pokemon.html',
      controller: 'PokemonController',
      authenticate: true,
      params: {'name': {}, 'object': null}
    })
    .state('app.catch', {
      url: '/catch/:name',
      templateUrl: 'app/catch/catch.html',
      controller: 'CatchController',
      authenticate: true,
      cache:false,
      params: {'name': {}, 'object': null}
    })
    .state('app.area', {
      url: '/area/:name',
      templateUrl: 'app/area/area.html',
      controller: 'AreaController',
      authenticate: true,
      params: {'name': {}, 'object': null}
    });

  $urlRouterProvider.otherwise('/app/login');

});
