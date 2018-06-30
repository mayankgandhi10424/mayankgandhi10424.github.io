/**
 * route.js
 */
 
angular.module('myApp').config(function($routeProvider){
  $routeProvider
    //All posts display
    .when('/', {
      templateUrl: 'post.html',
      controller: 'myControl'
    })
    //single post display
    .when('/posts/:id',{
      templateUrl: 'comment.html',
      controller: 'postControl'
    })
    //register and login
    .when('/registerLogin',{
      templateUrl: 'registerLogin.html',
      controller: 'resLogControl'
    })
    //any other url
    .otherwise({
      redirectTo : '/'
    })
    ;
});
