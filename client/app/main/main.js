angular.module('otbo5ly.main', [])

.controller('MainController', function ($scope, Users, Auth) {
  $scope.data = {};

  	Users.getTodayCookings().then(function(data){
  		$scope.data.cookings = data;
  	});

  	Users.getAllCookers().then(function(data){
  		$scope.data.cookers = data;
  	});

});