'use strict';

app.controller('AuthController', function($scope, $location, Auth) {

	if(Auth.user.provider) {
    $location.path('/');
  }

	$scope.register = function(user) {
		Auth.register(user).then(function() {
			console.log("Register successfully!");
			$location.path('/');
		}, function(err) {
			console.log("Error...");
		});
	};

	$scope.login = function(user) {
		Auth.login(user)
		.then(function() {
			console.log("Logged in successfully!");
			$location.path('/');
		}, function(err) {
			console.log("Error...");
		});
	};


	$scope.changePassword = function(user) {
		Auth.changePassword(user)
		.then(function() {

			// Reset form
			$scope.user.email = '';
			$scope.user.oldpass = '';
			$scope.user.newpass = '';


			console.log("Password changed successfully!");
		}, function(err) {
			console.log("Error...");
		});
	};

});