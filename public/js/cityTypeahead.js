function CityTypeahead(searchFieldID, bloodhoundSource){

	this.valueIsSelectedFromTypeahead = false;
	this.searchFieldID = searchFieldID;
	this.lastValue;
	function setUpTypeahead(root, bloodhoundSource){
		$('#' + root.searchFieldID).typeahead(
			{
			  minLength: 2,
			  highlight: true,
			},
			{
			name: 'cities',
			displayKey: 'label',
			highlight: true,
			source: bloodhoundSource.ttAdapter()

		}).on('typeahead:selected typeahead:autocompleted', function($e, data){
			root.valueIsSelectedFromTypeahead = true;
			lastValue = data;
		}).on('typeahead:opened', function($e, data){
			if (lastValue != data)
				root.valueIsSelectedFromTypeahead = false;
		});
	}

	setUpTypeahead(this, bloodhoundSource);

}

CityTypeahead.prototype.isValueSelectedFromTypeahead = function (){
		return this.valueIsSelectedFromTypeahead;
};

CityTypeahead.prototype.activateError = function (){
		$('#' + this.searchFieldID +'-group').addClass("has-error");
};

CityTypeahead.prototype.desactivateError = function (){
		$('#' + this.searchFieldID +'-group').removeClass("has-error");
};
