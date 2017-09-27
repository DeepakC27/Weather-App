
$(document).ready(function() {

	var cityName;

	$('#entered_loc').keypress(function(e) {
		var e = event.which || event.keyCode;
		if (e == 13) {
			cityName = $("#entered_loc").val();
			if (cityName.length != 0) {
				var nme = /^[a-zA-Z]+$/.test(cityName);
				if (nme == true) {
					prepareData('metric',2);
					// alert('Its OK');
				}
				else{
					issue_input_Error();
				}
			}
			else{
				issue_input_Error();
			}
		}
	});

	$('#curr_loc_btn').click(function() {
		$(this).css({ 'background': 'transparent'})
		initiateSearch();
	});


	function initiateSearch() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			alert("Geolocation is not supported by this browser!!!");
		}

		function showPosition(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			var geocoder;
			geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(lat, long);

			geocoder.geocode({
					'latLng': latlng
				},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							var add = results[0].formatted_address;
							var value = add.split(",");
							count = value.length;
							cityName = value[count - 3];
							$('#entered_loc').removeAttr('placeholder');
							$('#entered_loc').val(cityName);
							prepareData('metric', 1);
						} else {
							$.Notify({
								caption: 'Failed',
								content: "Please enter the city name or try again!!!",
								type: 'warning'
							});
						}
					}
				}
			)
		}

		function showError(error) {
			var val;
			switch (error.code) {
				case error.PERMISSION_DENIED:
					val = "User denied the request for Geolocation";
					break;
				case error.POSITION_UNAVAILABLE:
					val = "Location information is unavailable";
					break;
				case error.TIMEOUT:
					val = "The request to get user location timed out";
					break;
				case error.UNKNOWN_ERROR:
					val = "An unknown error occurred";
					break;
					
			}
			$.Notify({
				caption: 'Failed',
				content: '' + val,
				type: 'alert'
			});
		}

	}
});
