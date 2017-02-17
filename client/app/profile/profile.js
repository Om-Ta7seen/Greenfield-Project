angular.module('otbo5ly.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Users, OrderService) {
  $scope.data = {};

	Users.getCookerProfile($routeParams.user).then(function(data) {
		if(data.UserTypeName === 'cooker'){
			$scope.data = data;	
		} else {
			$location.path('/');
		}
	});

  	$scope.setOrder = function(UserID, cookerID, cookNameID, FullName, cookName){
		OrderService.setOrder({userID: UserID, cookerID : cookerID,
			 cookNameID: cookNameID, FullName : FullName, cookName: cookName});
	}

});