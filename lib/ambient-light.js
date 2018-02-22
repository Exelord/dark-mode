'use babel';

import throttle from 'lodash.throttle';

const loopInterval = 3000;

export default class {
  constructor(threshold, onLight = () => {}, onDark = () => {}) {
    this.threshold = threshold;
    this.onLight = onLight;
    this.onDark = onDark;
  }

  get active() {
    return this._active || false;
  }

  set active(state) {
    state ? this._activate() : this._deactivate();
    this._active = state;
  }

  _activate() {
    window.addEventListener('devicelight', throttle(this._onLightChange.bind(this), loopInterval));
  }

  _deactivate() {
    window.removeEventListener('devicelight', throttle(this._onLightChange.bind(this), loopInterval));
  }

  _onLightChange({ value }) {
    value > this.threshold ? this.onLight() : this.onDark();
  }
}
