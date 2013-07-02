var schudio_domain = 'schudiodev.com';
var api_url = 'http://app.schudiodev.com/api/';

function app_alert(text) {
	if (navigator.notification != undefined) {
		navigator.notification.alert(text);
	} else {
		alert(text);
	}
}

function onDeviceReady() {
	if (navigator.splashscreen != undefined) {
		navigator.splashscreen.hide();
	}
}

document.addEventListener('deviceready', onDeviceReady, false);