$(document).ready(function() {
	function addeffect() {
		var title = $('.tile-area-title');
		var c_heading = $('#data_heading');
		title.animate({
			fontSize: '+=10px'
		}, 2000);

		c_heading.animate({
			fontSize: '+=10px'
		}, 2000);
	}
	
	var forecast = hello();
	addeffect();
	$('#data_heading').html(forecast.city.name + ' ' + forecast.city.country);
	forecast.list.forEach(function(forecastEntry) {
		var val = forecastEntry.dt_txt;
		var time = format_time(val);
		var temp = forecastEntry.main.temp;
		var humidity = forecastEntry.main.humidity;
		var speed = forecastEntry.wind.speed;
		var description = forecastEntry.weather[0].description;
		opo(time, temp, humidity, description, speed);
	});

	function format_time(time) {
		var dte = time.split(" ")[0];
		var time = time.split(" ")[1];
		time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			time = time.slice(1);
			time[5] = +time[0] < 12 ? 'AM' : 'PM';
			time[0] = +time[0] % 12 || 12;
		}
		var tme = time.join('');
		tme = tme.split(":");
		var am_pm = tme[2].split("0")[2];
		return dte + '  ' + tme[0] + ':' + tme[1] + am_pm;
	}

	$('.carousel').carousel({
		duration: 300
	});


	$('#bck').click(function() {
		$(this).css({
			"background": "transparent"
		});
		window.sessionStorage.removeItem(forecast);
		window.location = 'index.html';
	});
});

function opo(time, temp, humidity, description, speed) {
	var item = $('<a class="carousel-item" style="margin-left:-55px;"><div class="tile-wide fg-white" data-role="tile" style="height:200px; width:300px; background: #000000;">' +
		// '<div class=""><span class="icon mif-weather mif-2x"></span></div>'+
		'<div class="tile-content">' +
		'<span class="icon mif-weather mif-2x fg-white" style="text-align:center; width:100%;"></span>' +
		'<div class="padding10" style="padding-left:10px;"><p class="no-margin text-shadow"><h4>' + time + ' </h4></p>' +
		'<p class="no-margin text-shadow"><h4>Temperature: ' + temp + '&#8451</h4></p>' +
		'<p class="no-margin text-shadow"><h4>Wind Speed: ' + speed + 'm/s</h4></p>' +
		'<p class="no-margin text-shadow"><h4>Humidity: ' + humidity + '%</h4></p>' +
		'<p class="no-margin text-shadow"><h4>Description: ' + description + '</h4></p></div></div></div>').appendTo('.carousel');
	//var item=$('<a class="carousel-item" href="">').appendTo('.carousel');
}
