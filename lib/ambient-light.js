'use babel';

import Ambient from 'ambientlight/build';

export default class {
	constructor(onLight, onDark) {
		this.onLight = onLight;
		this.onDark = onDark;
	}

	activate() {
		this.dispose();
		if (this.isTurnOn()) {
			this.intervalInstance = this._sensorProcess();
		}
	}

	dispose() {
		if (this.intervalInstance) {
			clearInterval(this.ambientLight);
		}
	}

	isTurnOn() {
		return atom.config.get('dark-mode.ambientLight');
	}

	_sensorProcess() {
		return setInterval(() => {
			this._lux() > this._threshold() ? this.onLight() : this.onDark();
		}, this._interval());
	}

	_threshold() {
		return atom.config.get('dark-mode.ambientLightThreshold');
	}

	_lux() {
		return Ambient();
	}

	_interval() {
		return atom.config.get('dark-mode.ambientLightInterval');
	}
}
