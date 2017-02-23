angular.module('otbo5ly.userProfile', [])

.controller('userProfileController', function ($scope, $routeParams, $window,$route, $location, Users, OrderService,Approve,Special) {
  $scope.data = {};
  $scope.orders = {};
  $scope.Sorder = {};
   // var b = []
  $scope.cookerName = []

  

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
        Approve.DeleteOrder({orderId:orderId}).then(function(){
        	$route.reload();
        })
	}

	$scope.getAllCookers = function () {
		Users.getAllCookers().then(function(data){
			console.log(data)
			for (var i = 0; i < data.length; i++) {
				$scope.cookerName.push(data[i].UserName)

			}
			console.log($scope.cookerName)
		})
	}

	$scope.AddSpecialOrder = function(){
		Special.AddSpecialOrder($scope.order).then(function(){
			console.log(" in add speacial")
		})
	}









});

  
