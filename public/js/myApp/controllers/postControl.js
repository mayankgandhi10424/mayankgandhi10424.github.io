/**
 * postControl.js
 */
 
angular.module('myApp').controller('postControl',function($scope,postService,$routeParams,$rootScope){

  $scope.post = { created_by: '', text: '', created_at: '', likes : 0, comments : []};
  $scope.allComments = [];

  postService.getComments($routeParams.id).then(function(res){
    $scope.post = res.data;
    $scope.allComments = $scope.post.comments;
  });

  
  $scope.newComment = {created_by: '', text: '', created_at: '', likes : 0, post : {}};


  $scope.comment = function(){
    $scope.newComment.created_by = $rootScope.current_user;
    $scope.newComment.created_at = Date.now();

    postService.addComment($scope.newComment,$routeParams.id).success(function(data){
        
      $scope.allComments.push(data);
      $scope.newComment = { created_by: '', text: '', created_at: '', likes : 0, post : {}};
      
    });
  };

  $scope.likeComment = function(comment){
    postService.upvoteComment(comment).success(function(data){
      comment.likes += 1; 
    });
  };

  $scope.likePost = function(post){
    postService.upvote(post).success(function(data){
      post.likes += 1; 
    });
  };

  $scope.delete = function(comment){
    postService.deleteComment(comment,$routeParams.id).success(function(data){
      console.log(data);
      var index = $scope.allComments.indexOf(comment);
      $scope.allComments.splice(index, 1); 
      $scope.post.comments = $scope.allComments;
    });
  };

});
