angular.module('otbo5ly.newOrder', [])

.controller('NewOrderController', function ($scope, Users, Auth) {
	$scope.data = {};

	Users.addNewOrder($scope.data).then(function(resp){
		console.log(resp)
		alert(your order has been sent successfully)
	})
});






// angular.module('otbo5ly.newOrder', [])

// .controller('NewOrderController', function ($scope, Users, Auth) {
// 	$scope.data = {};

// 	$scope.submit = function () {
// 		Users.addNewOrder($scope.data).then(function(resp){
// 			console.log(resp)
// 			alert(your order has been sent successfully)
// 		})
// 	}
// });