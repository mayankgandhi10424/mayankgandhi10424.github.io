/**
 * myControl.js
 */
 
angular.module('myApp').controller('myControl',function($scope,postService,$rootScope){
  
  $scope.allPost = [];
  $scope.newPost = {created_by: '', text: '', created_at: '', likes : 0, comments : []};

  postService.getAll().success(function(data){
    $scope.allPost = data;
  });

	$scope.post = function(){
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();

    postService.addPost($scope.newPost).success(function(data){
        
        $scope.allPost.push(data);
        $scope.newPost = { created_by: '', text: '', created_at: '', likes : 0, comments : []};
      
    });
  };

  	$scope.like = function(post){
      postService.upvote(post).success(function(data){
        post.likes += 1; 
      });
  	};

    $scope.delete = function(post){
      postService.delete(post).success(function(data){
        console.log(data);
        var index = $scope.allPost.indexOf(post);
        $scope.allPost.splice(index, 1); 
      });
    };
});
