angular.module('otbo5ly.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Users, OrderService) {
  $scope.data = {};

	Users.getCookerProfile($routeParams.user).then(function(data) {
		$scope.data = data;
	});

  	$scope.setOrder = function(UserID, cookerID, cookNameID){
  		if($window.localStorage.getItem('com.otbo5ly')){
			OrderService.setOrder({UserID: UserID, cookerID : cookerID,
			 cookNameID: cookNameID});
  		} else {
  			$location.path('/signin');
  		}
	}

});