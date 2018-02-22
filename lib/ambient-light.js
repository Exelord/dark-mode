'use babel';

export default class {
	constructor(threshold, onLight, onDark) {
		this.threshold = threshold;
		this.onLight = onLight;
		this.onDark = onDark;
	}

	onDark() {}
	onLight() {}

	get active() {
		return this._active || false;
	}

	set active(state) {
		state ? this._activate() : this._deactivate();
		this._active = state;
	}

	_activate() {
		window.addEventListener('devicelight', this._onLightChange.bind(this));
	}

	_deactivate() {
		window.removeEventListener('devicelight', this._onLightChange.bind(this));
	}

	_onLightChange({ value }) {
		value > this.threshold ? this.onLight() : this.onDark();
	}
}
