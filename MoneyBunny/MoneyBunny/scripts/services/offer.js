'use strict';

app.factory('Offer', function(FURL, $firebase) {
	
	var ref = new Firebase(FURL);
	var Offer ={

		offers: function(taskId) {
			return $firebase(ref.child('offers').child(taskId)).$asArray();
		},

		makeOffer: function(taskId, offer) {
			var task_offers = this.offers(taskId);
			if(task_offers) {
				return task_offers.$add(offer);
			}
		}

	};

	return Offer;
});