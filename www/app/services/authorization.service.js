angular.module('AuthorizationService', []).factory('Auth', ['Resource', '$location', '$http', '$window',  'baseUrl', function($resource, $location, $http, $window, baseUrl){
  var auth = {};
  var self = this;
  var user = null;

  this.getToken = function(){
    return $window.localStorage['x-access-token'];
  };

  this.setToken = function(token) {
    $window.localStorage['x-access-token'] = token;
  };

  auth.isLoggedIn = function(){
    return $window.localStorage['x-access-token'] != null;
  };

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      return self.user;
    }
  };

  auth.logIn = function(user){
    return $resource(baseUrl + 'auth/login').save(user,function(data){
      if(data.token){
        self.setToken(data.token);
        $http.defaults.headers.common['x-access-token']= data.token;
      }
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('x-access-token');
    $http.defaults.headers.common['x-access-token']= undefined;
  };

  auth.signUp = function(user){
    return $resource(baseUrl + 'auth/signup').save(user, function(data){
      if(data.token){
        self.setToken(data.token);
        $http.defaults.headers.common['x-access-token']= data.token;
      }
    });
  };

  auth.getUserStatus = function() {

    return $resource(baseUrl + 'auth/user').get(function(user){
      if(user){
        self.user = user;
      } else {
        self.user = null;
      }
    }, function(error){
      self.user = null;
    });

  };

  return auth;
}]);
