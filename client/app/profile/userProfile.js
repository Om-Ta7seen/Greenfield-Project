angular.module('otbo5ly.userProfile', [])

.controller('userProfileController', function ($scope, $routeParams, $window, $location, Users, OrderService) {
  $scope.data = {};
  $scope.orders = {};
  

  $scope.getProfile = function(){
	Users.getUserProfile($routeParams.user).then(function(data) {
		console.log(data)
		if(data.UserTypeName === 'user'){
			$scope.data = data;	
		} else {
			$location.path('/');
		}
	});  	
  }
  $scope.getOrders = function(){
	Users.getUserOrders($routeParams.user).then(function(data){
		if(JSON.parse($window.localStorage.getItem('user.otbo5ly')).UserTypeName === "user"){
			$scope.orders = data;	
		} else {
			$location.path('/');
		}
	})
	}








});

  
