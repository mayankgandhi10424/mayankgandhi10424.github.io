/**
 * postService.js
 */
 
angular.module('myApp').factory('postService',function($http){
  
  var factory = {};

  factory.getUser = function(){
    return $http.get('/user');
  }

  factory.logout = function(){
    return $http.get('/logout');
  }

  factory.login = function(user){
    return $http.post('/login',user);
  }

  factory.register = function(user){
    return $http.post('/register',user);
  }

  factory.facebookLogin = function(){
    return $http.get('/auth/facebook');
  }

  factory.googleLogin = function(){
    return $http.get('/auth/google');
  }

  factory.getAll = function(){
    return $http.get('/api/posts');
  }

  factory.addPost = function(post){
    return $http.post('/api/posts',post);
  }

  factory.upvote = function(post){
    return $http.put('/api/posts/'+post._id+'/upvote');
  }

  factory.editPost = function(post){
    return $http.put('/api/posts/'+post._id,post)
  }

  factory.delete = function(post){
    return $http.delete('/api/posts/'+post._id);
  }
  //get the post by id
  factory.get = function(id){
    return $http.get('/api/posts/'+id);
  }

  factory.getComments = function(id){
    return $http.get('/api/posts/'+id+'/comments');
  }

  factory.addComment = function(comment,id){
    return $http.post('/api/posts/'+id+'/comment',comment);
  }

  factory.editComment = function(comment){
    return $http.put('/api/posts/comment/'+comment._id,comment);
  }

  factory.upvoteComment = function(comment){
    return $http.put('/api/posts/comment/'+comment._id+'/upvote');
  }

  factory.deleteComment = function(comment,id){
    return $http.delete('/api/posts/'+id+'/'+comment._id);
  }

  return factory;
}); 
