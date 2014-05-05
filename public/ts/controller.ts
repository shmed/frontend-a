/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="CityTypeahead.ts" />
/// <reference path="CitySearchForm.ts" />
$(function(){

	var cityApiURL: string = 'http://www.busbud.com/en/complete/locations/%QUERY?callback=?';
	
	var fromField: CityTypeahead = new CityTypeahead('from-search', cityApiURL);
	var toField: CityTypeahead = new CityTypeahead('to-search', cityApiURL);

	var searchForm: CitySearchForm = new CitySearchForm(fromField, toField);

	$('#search').click(
		function(){
			if (searchForm.isValid()){
				$('#errorMsg').hide();
				searchForm.submit();
			}else{
				$('#errorMsg').show();
			}
		}
	);
});



