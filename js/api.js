var openWeatherAppId = '********',
	openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'



var prepareData = function(units, flg) {
	var cityName = $('#entered_loc').val();
	if (flg == 1) {
		getData(openWeatherUrl, cityName, openWeatherAppId, units)
	} else {
		if (cityName && cityName != '') {
			cityName = cityName.trim();
			check(cityName, units);
		} else {
			$.Notify({
				caption: 'Error',
				content: 'Plz enter city name',
				icon: "<span class='mif-location'>",
				type: 'alert'
			});
		}
	}
}


function issue_input_Error() {
	$.Notify({
		caption: 'Error',
		content: 'City not found!!',
		icon: "<span class='mif-location'>",
		type: 'warning'
	});
	$('#entered_loc').val("");
}


function getData(url, cityName, appId, units) {
	addeffect();
	var request = $.ajax({
		url: url,
		dataType: "jsonp",
		data: {
			q: cityName,
			appid: appId,
			units: units
		},
		jsonpCallback: "fetchData",
		type: "GET"
	}).fail(function(error) {
		addeffect_re_init();
		issue_input_Error();
	})
}

function addeffect() {
	var obj = $('#current_loc');
	var curloc = $('#input_loc');
	obj.animate({
		left: '+=1000px'
	}, 2000);
	curloc.animate({
		right: '+=1000px'
	}, 2000);
	$('#data_loader').css('display', 'block');
}

function addeffect_re_init() {
	var obj = $('#current_loc');
	var curloc = $('#input_loc');
	obj.animate({
		left: '-=1000px'
	}, 1000);
	curloc.animate({
		right: '-=1000px'
	}, 1000);
	$('#data_loader').css('display', 'none');
}


function fetchData(forecast) {
	try {
		window.sessionStorage.setItem('forecast', JSON.stringify(forecast));
		window.location = 'rendering.html';
	} catch (err) {
		console.error(err.message);
	}
}

function hello() {
	// console.log(JSON.parse(localStorage.getItem('data')));
	return JSON.parse(window.sessionStorage.getItem('forecast'));
}
