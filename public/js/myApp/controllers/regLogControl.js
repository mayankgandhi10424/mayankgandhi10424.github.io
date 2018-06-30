/**
 * regLogControl.js
 */
 
angular.module('myApp').controller('resLogControl',function($scope,postService,$rootScope,$location){
  
  postService.getUser().success(function(data){
    if (data.auth) {
      $location.path('/');
    };
  });

  $scope.err_register = $scope.err_login = false;

  $scope.login = function(){
    postService.login($scope.User).success(function(data){
      if(data.state == 'failure'){
        $scope.error_message_login = data.message.login.toString();
        $scope.err_login = true;
        console.log('err: '+$scope.error_message_login);
      }
      else{
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.local.name;
        $location.path('/');
      }
    });
  };

  $scope.register = function(){
    postService.register($scope.user).success(function(data){
      if(data.state == 'failure'){
        $scope.error_message_register = data.message.register.toString();
         $scope.err_register = true;
        console.log($scope.error_message_register);
      }
      else{
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.local.name;
        $location.path('/');
      }
    });
  };

});
