angular.module('otbo5ly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth, Users) {
  $scope.user = {};

  Users.getCookingNames().then(function(data){
    $scope.cookingNames = data;
  })


  $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (data) {

          $window.localStorage.setItem('com.otbo5ly', data.token);

          // $window.localStorage.setItem('user.otbo5ly', {ID:data.user.ID, 
          //   UserName: data.user.UserName, UserType: data.user.UserType});

          // if(data.user.UserType === 'cooker'){
          //   $rootScope.isCooker = true;
          // }

          // $rootScope.isLoggedIn = true;

          // $location.path('/users/'+ data.user.UserName );
          $location.path('/');
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  $scope.signup = function () {
      if($scope.isCooker){
        $scope.user.UserType = 'cooker';
      } else {
        $scope.user.UserType = 'user';
      }
      Auth.signup($scope.user)
        .then(function (data) {
          // $window.localStorage.setItem('com.otbo5ly', data.token);

          // $window.localStorage.setItem('user.otbo5ly', {ID:data.user.ID, 
          //   UserName: data.user.UserName, UserType: data.user.UserType});

          // if(data.user.UserType === 'cooker'){
          //   $rootScope.isCooker = true;
          // }
          // $rootScope.isLoggedIn = true;

          // $location.path('/users'+ data.user.UserName );
          $location.path('/');
        })
        .catch(function (error) {
          console.error(error);
        });
  };

  $scope.signout = function(){
    Auth.signout();
  }

  // var checkPassword = function(password){
  //   var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  //   return regularExpression.test(password);
  // };

  // var checkUserName = function(user){
  //   var regularExpression = /^[a-zA-Z0-9]+$/;
  //   return regularExpression.test(user);
  // };

});
