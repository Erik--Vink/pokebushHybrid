angular.module('AuthorizationService', []).factory('Auth', ['$resource', '$location', 'baseUrl', function($resource, $location, baseUrl){
    var auth = {};
    var self = this;
    var user = null;

    auth.isLoggedIn = function(){
        if(self.user) {
            return true;
        } else {
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            return self.user;
        }
    };

    auth.logIn = function(user){
        return $resource(baseUrl + 'auth/login').save(user,function(user){
            self.user = user;
        });
    };

    auth.logOut = function(){
        return $resource(baseUrl + 'auth/logout').get(function(){
            self.user = null;
        });
    };

    auth.signUp = function(user){
        return $resource(baseUrl + 'auth/signup').save(user);
    };

   auth.getUserStatus = function() {

       $resource(baseUrl + 'auth').get(function(user){
           if(user){
               self.user = user;
           } else {
               self.user = null;
           }
       }, function(){
           self.user = null;
       });

       return $resource(baseUrl + 'user').get();

    };

    return auth;
}]);
