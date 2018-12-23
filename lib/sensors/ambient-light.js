'use babel';

import Sensor from './sensor';

import throttle from 'lodash.throttle';

const loopInterval = 3000;

export default class extends Sensor {
  get sensorOptionName() {
    return 'ambientLightSensor';
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
    this.sensor = new window.AmbientLightSensor();
    this.sensor.onreading = throttle(this._onLightChange.bind(this), loopInterval);
    this.sensor.onerror = (event) => this.log(event.error.message, 'warn');

  }

  _onLightChange({ value }) {
    value > this.thresholdOption ? this.switchToLightMode() : this.switchToDarkMode();
  }
}
