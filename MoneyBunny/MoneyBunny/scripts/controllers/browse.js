'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth, Comment, Offer) {

	$scope.searchTask = '';		
	$scope.tasks = Task.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;
	$scope.user = Auth.user;
	
	if($routeParams.taskId) {
		var task = Task.getTask($routeParams.taskId).$asObject();
		$scope.listMode = false;
		setSelectedTask(task);	
	}	
		
	function setSelectedTask(task) {
		$scope.selectedTask = task;
		
		// We check isTaskCreator only if user signedIn 
		// so we don't have to check every time normal guests open the task
		if($scope.signedIn()) {
			// Check if the current login user is the creator of selected task
			$scope.isTaskCreator = Task.isCreator;
			
			// Check if the selectedTask is open
			$scope.isOpen = Task.isOpen;			
		}
		$scope.comments = Comment.comments(task.$id);
		$scope.offers = Offer.offers(task.$id);
		$scope.block = false;

	};

	// --------------- TASK ---------------	

	$scope.cancelTask = function(taskId) {
		Task.cancelTask(taskId).then(function() {
			toaster.pop('success', "This task is cancelled successfully.");
		});
	};

	$scope.addComment = function() {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

	Comment.addComment($scope.selectedTask.$id, comment).then(function(){
		$scope.content = '';
	}); 	
	};

	$scope.makeOffer=function() {
		var offer = {
			total: $scope.total,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar,
		};

		Offer.makeOffer($scope.selectedTask.$id, offer).then(function() {
			toaster.pop('success','Your offer has been placed.');
			$scope.total = '';
			$scope.block = true;
		});
	}

});