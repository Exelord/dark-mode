'use babel';

import Sensor from './sensor';

import throttle from 'lodash.throttle';

const loopInterval = 3000;

export default class extends Sensor {
  constructor() {
    super(...arguments);
    this.sensorOptionName = 'ambientLightSensor';
  }

  get thresholdOption() {
    return atom.config.get('dark-mode.ambientLightThreshold');
  }

  activate() {
    this._initializeSensor();

    if (this.sensor) {
      this.sensor.start();
    }
  }

  deactivate() {
    if (this.sensor) {
      this.sensor.stop();
    }
  }

  _initializeSensor() {
    if ('AmbientLightSensor' in window) {
      this.sensor = new window.AmbientLightSensor();
      this.sensor.onreading = throttle(this._onLightChange.bind(this), loopInterval);
      this.sensor.onerror = (event) => console.warn('DarkMode:', event.error.message);
    } else {
      console.warn('DarkMode:', '"AmbientLightSensor" API is not supported!');
    }
  }

  _onLightChange({ value }) {
    value > this.thresholdOption ? this.switchToLightMode() : this.switchToDarkMode();
  }
}
