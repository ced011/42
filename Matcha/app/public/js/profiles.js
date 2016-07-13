function viewProfile(callback, username) {
	NProgress.start();
	$('#profiles_firstname').html("");
	$('#profiles_lastname').html("");
	$('#profiles_img_s').attr("src", "/img/pp.png");
	$('#profiles_location_s').html("Unknown");
	$('#profiles_age_s').html("?");
	$("#profiles_gender_s").html("Unknown");
	$("#profiles_preference_s").html("Both");
	$('#profiles_tags').html('');
	$('#profiles_bio').html('');
	$('#profiles_img_prev').attr('onclick', '');
	$('#profiles_img_next').attr('onclick', '');
	NProgress.inc();
	if (!username)
		username = '';
	$.get("/api/profiles/view/" + username, {}).done(function(res) {
		NProgress.inc();
		if (!res[0]) {
			info({
				end: false,
				message: "Error"
			});
			return (false);
		}
		if (res[0].firstname)
			$('#profiles_firstname').html(res[0].firstname);
		if (res[0].lastname)
			$('#profiles_lastname').html(res[0].lastname);
		$('#profiles_img_s').attr("src", '/api/img/view/' + username + '/300/0');
		if (res[0].location)
			$('#profiles_location_s').html(res[0].location);
		if (res[0].birthdate) {
			var ageDifMs = Date.now() - (new Date(res[0].birthdate));
	        var ageDate = new Date(ageDifMs);
			$('#profiles_age_s').html(Math.abs(ageDate.getUTCFullYear() - 1970));
		}
		if (res[0].gender)
			$("#profiles_gender_s").html(res[0].gender);
		if (res[0].preference)
			$("#profiles_preference_s").html(res[0].preference);
		if (res[0].tags) {
			res[0].tags.forEach(function(tag) {
				$('#profiles_tags').append('<span class="profiles_tag">#' + tag + '</span> ');
			});
		}
		if (res[0].bio)
			$('#profiles_bio').html(res[0].bio);
		NProgress.inc();
		callback();
		NProgress.done();
    });
}

function viewYourProfile(callback) {
	NProgress.start();
	$.get("/api/profiles/view/", {}).done(function(res) {
		NProgress.inc();
		if (!res[0]) {
			info({
				end: false,
				message: "Error"
			});
			return (false);
		}
		if (res[0].firstname)
			$('#edit_firstname').val(res[0].firstname);
		if (res[0].lastname)
			$('#edit_lastname').val(res[0].lastname);
		$('#edit_img_s').attr("src", '/api/img/view/' + res[0].username + '/300/0');
		if (res[0].location)
			$('#edit_location_s').val(res[0].location);
		if (res[0].birthdate)
			$('#edit_birthdate_s').val(res[0].birthdate.substr(0, 10));
		if (res[0].gender)
			$("#edit_gender_s option[value='" + res[0].gender + "']").attr("selected", "selected");
		if (res[0].preference)
			$("#edit_preference_s option[value='" + res[0].preference + "']").attr("selected", "selected");
		if (res[0].tags) {
			res[0].tags.forEach(function(tag) {
				$('#edit_tags').append('<span class="edit_tag" onclick="delTag(this)">#' + tag + '</span> ');
			});
		}
		NProgress.inc();
		getTags();
		NProgress.inc();
		if (res[0].bio)
			$('#edit_bio_s').html(res[0].bio);
		NProgress.inc();
		callback();
		NProgress.done();
    });
}

function editProfile() {
	NProgress.start();
	$.post("/api/profiles/update/", {
		firstname: $('#edit_firstname').val(),
		lastname: $('#edit_lastname').val(),
		location: $('#edit_location_s').val(),
		birthdate: $('#edit_birthdate_s').val(),
		gender: $("#edit_gender_s option:selected").text(),
		preference: $("#edit_preference_s option:selected").text(),
		bio: $('#edit_bio_s').val()
	}).done(function(res) {
		NProgress.inc();
		if (!res.request) {
			info({
				end: false,
				message: res.message
			});
			return (false);
		}
		else {
			info({
				end: true,
				message: res.message
			});
		}
		NProgress.done();
    });
}

function getTags(callback) {
	$.get("/api/tags/", {}, function(res) {
		res.forEach(function(tag) {
			$('#edit_tags_choose').append('<option value="' + tag.name + '">');
		});
    });
}

function upload(files) {
	NProgress.start();
    var file = files[0] ;

    var reader = new FileReader();

    // When the image is loaded
    reader.onload = function(evt) {
		NProgress.inc();
        $.post("/api/img/upload/", {
            objectData: evt.target.result.split(',')[1],
            type: file.type
        }).done(function(res) {
			NProgress.inc();
			if (res.request) {
				$('#uploadImg').val('');
			}
			info({
				end: res.request,
				message: res.message
			});
			NProgress.done();
        });
    };

	NProgress.inc();
    // Read in the image file as a data URL
    reader.readAsDataURL(file);
}

function delYourPicture() {
	$.post("/api/img/del/", {
		image: $('#edit_img_s').attr('src').split('/')[6]
	}).done(function(res) {
		info({
			end: res.request,
			message: res.message
		});
	});
}

function addTag() {
	$.post("/api/tags/add/", {
		tag: $('#edit_tags_add').val()
	}).done(function(res) {
		$('#edit_tags').append('<span class="edit_tag" onclick="delTag(this)">#' + $('#edit_tags_add').val() + '</span> ');
		$('#edit_tags_add').val("");
		info({
			end: res.request,
			message: res.message
		});
	});
}

function delTag(tag) {
	$.post("/api/tags/del/", {
		tag: $(tag).html().slice(1, tag.length)
	}).done(function(res) {
		$(tag).remove();
		info({
			end: res.request,
			message: res.message
		});
	});
}
