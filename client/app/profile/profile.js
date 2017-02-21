angular.module('otbo5ly.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Users, OrderService,Approve) {
  $scope.data = {};
  $scope.orders = {};

  $scope.getProfile = function(){
	Users.getCookerProfile($routeParams.user).then(function(data) {
		console.log(data)
		if(data.UserTypeName === 'cooker'){
			$scope.data = data;	
		} else {
			$location.path('/');
		}
	});  	
  }

  $scope.getOrders = function(){
	Users.getCookerOrders($routeParams.user).then(function(data){
		if(JSON.parse($window.localStorage.getItem('user.otbo5ly')).UserTypeName === "cooker"){
			console.log("oooooooooooooooooo",data)
			$scope.orders = data;	
		} else {
			$location.path('/');
		}
	})
	}

  	$scope.setOrder = function(UserID, cookerID, cookNameID, FullName, cookName){
		OrderService.setOrder({userID: UserID, cookerID : cookerID,
			 CookNamesID: cookNameID, FullName : FullName, cookName: cookName});
	}

	$scope.acceptOrder = function(orderId){
		console.log(orderId)

		console.log('in accept order')
		Approve.acceptOrder({orderId:orderId}).then(
			
			)
	}
	$scope.cancelOrder = function(orderId){

        Approve.cancelOrder({orderId:orderId}).then(
            console.log('in cancel order')
        	)
	}

	$scope.dos=function(){
    $(".no").fadeOut()
}


});