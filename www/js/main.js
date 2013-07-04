var user = null;
var school = null;
var host = null;

function initHeader(){
	var heading = $('.heading');
	if (school.app_background_color) {
		heading.css('backgroundColor', school.app_background_color);
	}
	if (school.app_background_image) {
		heading.css('backgroundImage', 'url(\'' + host + school.app_background_image + '\')');
	}
	if (school.app_logo) {
		heading.find('.logo img').attr('src', host + school.app_logo).parent().show();
	}
	heading.find('h1').html(school.name);
	heading.show();
}

function initIndex() {
	if (school.facebook) {
		$('#facebook').attr('href', school.facebook);
	} else {
		$('#facebook').hide();
	}
	if (school.twitter) {
		$('#twitter').attr('href', school.twitter);
	} else {
		$('#twitter').hide();
	}
	if (school.youtube) {
		$('#youtube').attr('href', school.youtube);
	} else {
		$('#youtube').hide();
	}
	$('.social').show();
}

function initAbout() {
	$('#about-page div[data-role=content]').html(school.description);
}

function initContact() {
	$('#contact-school-name').html(school.name);
	if (school.address) {
		$('#contact-address').html(school.address);
	} else {
		$('#contact-address').hide();
	}
	if (school.email) {
		$('#contact-email a').text(school.email).attr('href', 'mailto:' + school.email);
	} else {
		$('#contact-email').hide();
	}
	if (school.telephone) {
		$('#contact-tel a').text(school.telephone).attr('href', 'tel:' + school.telephone);
	} else {
		$('#contact-tel').hide();
	}
	if (school.fax) {
		$('#contact-fax').text(school.fax).attr('href', 'tel:' + school.fax);
	} else {
		$('#contact-fax').hide();
	}
	$('#contact-website a').text(school.host).attr('href', 'http://' + school.host);
}
/*
function checkNotification() {
	$.ajax({
		type: 'post',
		url: api_url + 'notifications/' + user.account_id + ,
		function(data){
			if (data.error != undefined) {
				app_alert(data.error);
			} else {
			}
		},
		function(){
			app_alert('Unable to connect to server');
		}
	);
}
*/

if (window.localStorage['user'] != undefined) {
	user = JSON.parse(localStorage.getItem('user'));
}

if (user) {
	var now = Math.round($.now() / 1000);
	var last_update = localStorage.getItem('last_update');
	
	if (window.localStorage['school'] == undefined || (now - last_update) > 10000) {
		$.ajax({
			type: 'post',
			url: api_url + 'getschool/' + user.accoun_id,
			dataType: 'json',
			success: function(data) {
				if (data.error != undefined) {
					app_alert(data.error);
				} else {
					school = data;
					localStorage.setItem('school', JSON.stringify(school));
					localStorage.setItem('last_update', now);
					host = 'http://' + school.url + '.' + schudio_domain;
					initHeader();
					initIndex();
					initAbout();
					initContact();
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				app_alert('Unable to connect to server');
			}
		});
	} else {
		school = JSON.parse(localStorage.getItem('school'));
		host = 'http://' + school.url + '.' + schudio_domain;
		initHeader();
		initIndex();
		initAbout();
		initContact();
	}
	
	$('a[target=_blank],a[target=_system]').on('click', function(event){
		event.PreventDefault();
		window.open($(this).attr('href'), '_system');
	});
} else {
	window.location = 'login.html';
}
