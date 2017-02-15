angular.module('otbo5ly.profile', [])

.controller('ProfileController', function ($scope, $location, Users, $routeParams, Auth) {
  $scope.data = {};

	Users.getCookerProfile($routeParams.user).then(function(data) {
		$scope.data = data;
	});

});