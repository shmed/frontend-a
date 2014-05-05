/// <reference path="CityTypeahead.ts" />
/// <reference path="AbstractForm.ts" />

class CitySearchForm extends AbstractForm{

	constructor(fromInput: CityTypeahead, toInput: CityTypeahead){
		super();
		this.addFormInput(fromInput);
		this.addFormInput(toInput);
	}

	submit(): void{
		alert('Submitted!');
	}
}
