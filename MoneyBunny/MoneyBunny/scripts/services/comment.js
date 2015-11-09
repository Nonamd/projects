'use strict';

app.factory('Comment', function(FURL, $firebase) {

	var ref = new Firebase(FURL);

	var Comment={
		comments: function(taskID) {
			return $firebase(ref.child('comments').child(taskID)).$asArray();
		},

		addComment: function(taskId, comment) {
			var task_comments = this.comments(taskId);
			comment.datatime=Firebase.ServerValue.TIMESTAMP;

			if(task_comments){
				return task_comments.$add(comment);
			}
		}
	};
	
	return Comment;
});