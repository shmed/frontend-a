/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/typeahead/typeahead.d.ts" />
/// <reference path="../../typings/custom/bloodhound.d.ts" />
/// <reference path="IFormInput.ts" />
class CityTypeahead implements IFormInput{

	isSelectedFromList: boolean;
	searchFieldID: string;
	lastValue: string;

	constructor(searchFieldID: string, urlCitySource: string){
		this.searchFieldID = searchFieldID;
		var cities = this.getCityBloodhoundSource(urlCitySource);
		this.setUpTypeahead(cities);
		this.isSelectedFromList = false;
	}

	public isValid() : boolean{
		return this.isSelectedFromList;
	}

	public activateError() : void{
		$('#' + this.searchFieldID +'-group').addClass("has-error");
	}

	public desactivateError() : void{
		$('#' + this.searchFieldID +'-group').removeClass("has-error");
	}

	private setUpTypeahead(bloodhoundSource) : void{
		var root = this;
		$('#' + this.searchFieldID).typeahead(
			{
			  minLength: 2,
			  highlight: true,
			},
			{
			name: 'cities',
			displayKey: 'label',
			highlight: true,
			source: bloodhoundSource.ttAdapter()

		}).on('typeahead:selected typeahead:autocomplete', function($e, data){
			root.isSelectedFromList = true;
			root.desactivateError();
		}).on('change', function(e){
			root.isSelectedFromList = false;
		});
	}

	private getCityBloodhoundSource(urlSource): any{
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
}
