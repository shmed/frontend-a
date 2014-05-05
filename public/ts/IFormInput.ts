interface IFormInput {
	isValid(): boolean;
	activateError(): void;
	desactivateError(): void;
}