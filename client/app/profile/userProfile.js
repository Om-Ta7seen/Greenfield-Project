angular.module('otbo5ly.userProfile', [])

.controller('userProfileController', function ($scope, $routeParams, $window, $location, Users, OrderService,Approve) {
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

			

			$scope.orders = data;	
		} else {
			$location.path('/');
		}
	})
	}

	$scope.DeleteOrder = function(orderId){
		console.log("ddddd",orderId)

        Approve.DeleteOrder({orderId:orderId}).then(
            console.log('in cancel order')
        	)
	}









});

  
