angular.module('myApp',['ngRoute']).run(function($rootScope,postService){
  $rootScope.authenticated = false;
  $rootScope.current_user = "";  

  postService.getUser().success(function(data){
    if(data.auth){
      if(data.user.local){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.local.name; 
      }
      else if(data.user.facebook){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.facebook.name; 
      }
      else if(data.user.google){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.google.name;
      }
    }
    else{
      $rootScope.authenticated = false;
      $rootScope.current_user = ""; 
    }
  });

  $rootScope.logout = function(){
    postService.logout().success(function(){
      $rootScope.authenticated = false;
      $rootScope.current_user = "";
      console.log('logout');   
    });

  };  
});
