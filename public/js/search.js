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
	});

});

