function CityTypeahead(searchFieldID, bloodhoundSource){

	this.valueIsSelectedFromTypeahead = false;
	this.searchFieldID = searchFieldID;

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

		}).on('typeahead:selected', function($e, data){
			root.valueIsSelectedFromTypeahead = true;
		}).on('typeahead:opened', function($e, data){
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