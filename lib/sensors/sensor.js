'use babel';

/**
 * To define a new sensor use following template and create it in `sensors` folder:
 *
 * ```js
 * import Sensor from './sensor';
 *
 * export default class extends Sensor {
 *    constructor() {
 *      super(...arguments);
 *      this.sensorOptionName = 'yourSensorConfigOptionName';
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
 * Next go to `dark-mode/lib/dark-mode.js` and add a new sensor to the `sensor` const.
 * ```js
 * import MySuperSensor from './sensors/my-super-sensor.js'
 *
 * const sensors = [
 *  AmbientLightSensor,
 *  MySuperSensor
 * ]
 * ```
 */

import { CompositeDisposable } from 'atom';

export default class {
  constructor(darkMode) {
    this.darkMode = darkMode;
    this.subscriptions = new CompositeDisposable();
    this.sensorOptionName = 'autoMode';
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
   * @private
   * @override
   */
  activateSensor() {
    if (this.isAutoMode && this.isEnabled && !this.isActive) {
      this.activate();
      this._registerCallbacks();
      this._isActive = true;
    }

    return this.isActive;
  }

  /**
   * @private
   */
  deactivateSensor() {
    if (this.isActive) {
      this.subscriptions.dispose();
      this.deactivate();
      this._isActive = false;
    }

    return !this.isActive;
  }

  _registerCallbacks() {
    this.subscriptions.add(atom.config.onDidChange(`dark-mode.${this.sensorOptionName}`, ({newValue}) => {
      newValue ? this.activateSensor() : this.deactivateSensor();
    }));
  }
}
