function check(nme, units) {
	$.get('citylist.txt', function(data) {
		var lines = data.split(",");
		var flg = false;
		$.each(lines, function(n, elem) {
			if (nme.toLowerCase() == elem.toLowerCase()) {
				flg = true;
				alert(elem);
			}
		});
		if (flg) {
			$.Notify({
				caption: 'Input City Name',
				content: '' + nme,
				icon: "<span class='mif-location'>",
				type: 'success'
			});
			getData(openWeatherUrl, nme, openWeatherAppId, units)

		} else {
			issue_input_Error();
		}
	});
}