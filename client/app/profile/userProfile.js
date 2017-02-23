angular.module('otbo5ly.userProfile', [])

.controller('userProfileController', function ($scope, $routeParams, $window,$route, $location, Users, OrderService,Approve,Special) {
  $scope.data = {};
  $scope.orders = {};
  $scope.Sorder = {
  	special:'yse',
  	DeliveryDate:1,
  	UserId:1,

  };
  var getDeliveryDate = function(){
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + 1);
		return todayDate;
	}
	$scope.Sorder.DeliveryDate = getDeliveryDate().toISOString().slice(0,10);
  	$scope.Sorder.UserId= (JSON.parse($window.localStorage.getItem('user.otbo5ly')).ID)


  $scope.cookerName = {cookes:[]}

  

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
				$scope.cookerName.cookes.push({id:data[i].ID,name:data[i].UserName})

			}
			console.log($scope.cookerName)
		})
	}

	$scope.AddSpecialOrder = function(){
		console.log($scope.Sorder)

		Special.AddSpecialOrder($scope.Sorder).then(function(){
			
		})
	}









});

  
