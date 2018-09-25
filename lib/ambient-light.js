'use babel';

import throttle from 'lodash.throttle';

const loopInterval = 3000;

export default class {
  constructor(threshold, onLight = () => {}, onDark = () => {}) {
    this.threshold = threshold;
    this.onLight = onLight;
    this.onDark = onDark;

    if ('AmbientLightSensor' in window) {
      this.sensor = new window.AmbientLightSensor();

      this.sensor.onreading = throttle(this._onLightChange.bind(this), loopInterval);

      this.sensor.onerror = (event) => {
        console.warn('DarkMode:', event.error.message)
      };
    } else {
      console.warn('DarkMode:', '"AmbientLightSensor" API is not supported!');
    }
  }

  get active() {
    return this._active || false;
  }

  set active(state) {
    state ? this._activate() : this._deactivate();
    this._active = state;
  }

  _activate() {
    if (this.sensor) {
      this.sensor.start()
    }
  }

  _deactivate() {
    if (this.sensor) {
      this.sensor.stop()
    }
  }

  _onLightChange({ value }) {
    value > this.threshold ? this.onLight() : this.onDark();
  }
}
