$(function(){
	var cities = new Bloodhound({
	  datumTokenizer:function(d) {
	    return Bloodhound.tokenizers.whitespace(d.norm);
	  },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  remote : {
	        url : "http://www.busbud.com/en/complete/locations/%QUERY?callback=?",
	        dataType: 'jsonp'
	  }
	});
 
	cities.initialize();
	 
	$('#from-search').typeahead(
		{
		  minLength: 2,
		  highlight: true,
		},
		{
		name: 'cities',
		displayKey: 'label',
		minLength: 3,
		highlight: true,
		source: cities.ttAdapter()
	}).on('typeahead:selected', function($e, data){
		$('#from-selection').val(data.norm);
	}).on('typeahead:opened', function($e, data){
		$('#from-selection').val('');
	});

	$('#to-search').typeahead(
		{
		  minLength: 2,
		  highlight: true,
		},
		{
		name: 'cities',
		displayKey: 'label',
		minLength: 3,
		highlight: true,
		source: cities.ttAdapter()
	}).on('typeahead:selected', function($e, data){
		$('#to-selection').val(data.norm);
	}).on('typeahead:opened', function($e, data){
		$('#to-selection').val('');
	});


	$('#search').click(function(){
		$('#submitMessage').show()
		if ($('#from-selection').val() == '' || $('#to-selection').val() == ''){
			$('#submitMessage').text('Please select both destination from the lists');
			$('#submitMessage').addClass("error");
			$('#submitMessage').removeClass("success");
		}else{
			$('#submitMessage').text('Enjoy your trip!');
			$('#submitMessage').addClass("success");
			$('#submitMessage').removeClass("error");
		}
	});
});
