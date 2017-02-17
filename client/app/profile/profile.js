angular.module('otbo5ly.profile', [])

.controller('ProfileController', function ($scope, $routeParams, Users, orderService) {
  $scope.data = {};

	Users.getCookerProfile($routeParams.user).then(function(data) {
		$scope.data = data;
	});

	$scope.setOrder = function(UserID, cookerID, cookNameID){
		
	}

});