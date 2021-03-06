var val = Z.getVal();
var logged = false;

Z.id("info").style.display = "none";
Z.id("login_bar").style.display = "none";
Z.id("member_bar").style.display = "none";

if (window.innerWidth > 1020)
	Z.id("take_pictures").style.display = "none";

if (Z.id("info_cross"))
	Z.id("info_cross").addEventListener("click", hide_info);

if (Z.id("switch_reset_submit")) {
	Z.id("switch_reset_submit").addEventListener("click", function() {
		Z.id("reset").style.display = "block";
		Z.id("signin").style.display = "none";
	});
}

if (Z.id("switch_signin_submit")) {
	Z.id("switch_signin_submit").addEventListener("click", function() {
		Z.id("reset").style.display = "none";
		Z.id("signin").style.display = "block";
	});
}

window.addEventListener("DOMContentLoaded", function() {
	Z.post("model/auth.php", {
		request: "OK"
	}, function(res) {
		res = JSON.parse(res);
		if (res.logged == true) {
			logged = true;
			Z.id("login_bar").style.display = "none";
			Z.id("member_bar").style.display = "block";
			if (window.innerWidth > 1020)
				Z.id("aside").style.display = "block";
			Z.id("member_user").innerHTML = res.user;
			Z.id("member_mail").innerHTML = res.mail;
			Z.id("member_hearts").innerHTML = res.hearts;
			if (Number.isInteger(parseInt(val.p)))
				pics(val.p, true);
			else
				pics(0);
		}
		else {
			logged = false;
			Z.id("login_bar").style.display = "block";
			Z.id("member_bar").style.display = "none";
			Z.id("aside").style.display = "none";
			Z.id("member_user").innerHTML = "";
			Z.id("member_mail").innerHTML = "";
			Z.id("member_hearts").innerHTML = "?";
			if (Number.isInteger(parseInt(val.p)))
				pics(val.p, true);
			else
				pics(0);
		}
	});
});

function hide_info() {
	Z.id("info").style.display = "none";
}
