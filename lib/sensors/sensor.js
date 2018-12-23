'use babel';

/**
 * To define a new sensor use following template and create it in `sensors` folder:
 *
 * ```js
 * import Sensor from './sensor';
 *
 * export default class extends Sensor {
 *    get sensorOptionName() {
 *      return 'yourSensorConfigOptionName';
 *    }
 *
 *    activate() {
 *      // activate the sensor
 *    }
 *
 *    deactivate() {
 *      // deactivate the sensor
 *    }
 * }
 * ```
 *
 * Next go to `dark-mode/sensors/index.js` and export a new sensor:
 * ```js
 * import MySuperSensor from './my-super-sensor'
 *
 * export [
 *  AmbientLightSensor,
 *  MySuperSensor
 * ]
 *
 * ```
 */

import { CompositeDisposable } from 'atom';

export default class {
  constructor(darkMode) {
    this.darkMode = darkMode;
    this.subscriptions = new CompositeDisposable();
    this._registerCallbacks();
  }

  /**
   * @public
   * @override
   * Sensor option name
   */
  get sensorOptionName() {
    return 'autoMode';
  }

  /**
   * @public
   * @protected
   * Returns a config status if a sensor is enabled or not
   * @return {Boolean} sensor config status
   */
  get isEnabled() {
    return atom.config.get(`dark-mode.${this.sensorOptionName}`);
  }

  /**
   * @public
   * @protected
   * @return {Boolean} auto mode config status
   */
  get isAutoMode() {
    return atom.config.get('dark-mode.autoMode');
  }

  /**
   * @public
   * @protected
   * Status if the sensor is currently activated or not
   * @return {Boolean} sensor status
   */
  get isActive() {
    return this._isActive || false;
  }

  /**
   * @public
   * @override
   * This method should activate the sensor (turn on)
   */
  activate() {}

  /**
   * @public
   * @override
   * This method should deactivate the sensor (turn off)
   */
  deactivate() {}

  /**
   * @public
   */
  switchToLightMode() {
    this.darkMode.switchToLightMode();
  }

  /**
   * @public
   */
  switchToDarkMode() {
    this.darkMode.switchToDarkMode();
  }

  /**
   * @public
   */
  log(message, severity = 'info') {
    return console[severity](`DarkMode: [${this.sensorOptionName}] | ${message}`);
  }

  /**
   * @private
   * @override
   */
  activateSensor() {
    if (this.isAutoMode && this.isEnabled && !this.isActive) {
      this.activate();
      this._isActive = true;
      this.log('Sensor has been activated');
    }

    return this.isActive;
  }

  /**
   * @private
   */
  deactivateSensor() {
    if (this.isActive) {
      this.deactivate();
      this._isActive = false;
      this.log('Sensor has been deactivated');
    }

    return !this.isActive;
  }

  /**
   * @private
   */
  disposeCallbacks() {
    this.subscriptions.dispose();
  }

  _registerCallbacks() {
    this.subscriptions.add(atom.config.onDidChange(`dark-mode.${this.sensorOptionName}`, ({ newValue }) => {
      newValue ? this.activateSensor() : this.deactivateSensor();
    }));
  }
}
