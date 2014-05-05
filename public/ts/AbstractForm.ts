/// <reference path="IFormInput.ts" />
class AbstractForm {

	inputs:IFormInput[];
	
	constructor() {
		this.inputs = new Array<IFormInput>();
	}

	submit(): void{
		throw new Error('This method is abstract');
	}

	public isValid() : boolean{
		var returnValue: boolean = true;
		for(var i in this.inputs){

			if (!this.inputs[i].isValid()){
				returnValue = false;
				this.inputs[i].activateError();
			}else{
				this.inputs[i].desactivateError();
			}
		}

		return returnValue;
	}

	public addFormInput(input: IFormInput) : void{
		this.inputs.push(input);
	}

	public removeFormInput(input: IFormInput) : void{
		this.inputs.splice(this.inputs.indexOf(input), 1);
	}
}