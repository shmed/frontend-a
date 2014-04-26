$(function(){

	var cities = getCityBloodhoundSource('http://www.busbud.com/en/complete/locations/%QUERY?callback=?');
	var fromField = new CityTypeahead('from-search', cities);
	var toField = new CityTypeahead('to-search', cities);

	function getCityBloodhoundSource(urlSource){
		var cities = new Bloodhound({
		 datumTokenizer:function(d) {
		    return Bloodhound.tokenizers.whitespace(d.norm);
		  },
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  remote : {
	        url : urlSource,
	        dataType: 'jsonp'
		  }
		});
		
		cities.initialize();

		return cities;
	}

	$('#search').click(validateForm);

	function validateForm(){
		
		var hasError = false;

		if (!fromField.isValueSelectedFromTypeahead()){
			fromField.activateError();
			hasError = true;
		}else{
			fromField.desactivateError();
		}

		if (!toField.isValueSelectedFromTypeahead()){
			toField.activateError();
			hasError = true;
		}else{
			toField.desactivateError();
		}

		if (hasError){
			$('#submitMessage').text('Please select both destination from the lists');
			$('#submitMessage').addClass("error");
			$('#submitMessage').removeClass("success");
		}
		else{
			$('#submitMessage').text('Enjoy your trip!');
			$('#submitMessage').addClass("success");
			$('#submitMessage').removeClass("error");
		}

	}
});



