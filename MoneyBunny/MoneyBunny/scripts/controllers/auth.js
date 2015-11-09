'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {

	if(Auth.user.provider) {
    $location.path('/');
  }

	$scope.register = function(user) {
		Auth.register(user).then(function() {
			toaster.pop("success", "Registered Successfully!");
			// console.log("Register successfully!");
			$location.path('/');
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");
		});
	};

	$scope.login = function(user) {
		Auth.login(user)
		.then(function() {
			toaster.pop("Logged in Successfully!");
			// console.log("Logged in successfully!");
			$location.path('/');
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");
		});
	};


	$scope.changePassword = function(user) {
		Auth.changePassword(user)
		.then(function() {

			// Reset form
			$scope.user.email = '';
			$scope.user.oldpass = '';
			$scope.user.newpass = '';


			toaster.pop("success", "Password Changed Successfully!");
			// console.log("Password changed successfully!");
		}, function(err) {
			toaster.pop("error",'Oops, Something went wrong!');
			// console.log("Error...");

		});
	};

});