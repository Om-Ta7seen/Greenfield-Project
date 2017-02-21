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
<<<<<<< HEAD
			for(var i=0;i<data.length;i++){
				if(data[i].approved === 'none'){
					data[i].approved = 'your order waiting the cook answer'
				}
				if(data[i].approved === 'yes'){
					data[i].approved = 'your order accepted'
				}
				if(data[i].approved === 'no'){
					data[i].approved = 'your order denid'
				}
			}
=======
			console.log("in profile ",data)
>>>>>>> dfdcb8ccda5da01443cccb3d3c7ba1a6680b18ae
			$scope.orders = data;	
		} else {
			$location.path('/');
		}
	})
	}








});

  
