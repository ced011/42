function initMap() {
	NProgress.start();
	$.get("/api/profiles/view", {}).done(function(res) {
		NProgress.inc();
		if (res[0].pos)
			var myLatLng = {lat: res[0].pos[0], lng: res[0].pos[1]};
		else
			var myLatLng = {lat: 48.856614, lng: 2.3522219};
		NProgress.inc();
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: myLatLng,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			rotateControl: false
		});
		NProgress.inc();
		$.get("/api/profiles/", {}).done(function(res) {
			var i = 0;
			var marker = [];

			NProgress.inc();
			res.forEach(function(profile) {
				if (profile.pos) {
					marker[i] = new google.maps.Marker({
				    	position: {lat: profile.pos[0], lng: profile.pos[1]},
				    	map: map,
				    	title: profile.firstname + " " + profile.lastname,
						icon: "/api/img/view/" + profile.username + "/50/0"
					});
					marker[i].addListener('click', function() {
						viewProfile(function() {
							$('#profiles').fadeIn('fast');
						}, profile.username);
					});
				}
				i++;
				NProgress.inc();
			});
			NProgress.done();
		});
	});
}