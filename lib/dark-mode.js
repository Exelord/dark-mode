'use babel';

import Config from './config';
import { CompositeDisposable } from 'atom';

import AmbientLightSensor from './sensors/ambient-light';
import SystemThemeSensor from './sensors/system-theme';

const notificationsOptions = { icon: 'light-bulb' };

const sensors = [
  AmbientLightSensor,
  SystemThemeSensor
];

export default {
  _sensors: [],

  config: Config,
  subscriptions: null,

  get sensors() {
    return this._sensors || this._initializeSensors();
  },

  get lightTheme() {
    return atom.config.get('dark-mode.lightProfile');
  },

  get darkTheme() {
    return atom.config.get('dark-mode.darkProfile');
  },

  get currentTheme() {
    return atom.config.get('core.themes').join(' ');
  },

  get contrastTheme() {
    return (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);
  },

  get autoModeOption() {
    return atom.config.get('dark-mode.autoMode');
  },

  activate() {
    this.subscriptions = new CompositeDisposable();

    this._registerCommands();
    this._registerCallbacks();
    this._setSensorsState(this.autoModeOption);
    this._startupNotification();
  },

  deactivate() {
    this._setSensorsState(false);
    this.subscriptions.dispose();
  },

  switchToLightMode() {
    if (this.currentTheme != this.lightTheme) {
      this._changeTheme(this.lightTheme);
      atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
    }
  },

  switchToDarkMode() {
    if (this.currentTheme != this.darkTheme) {
      this._changeTheme(this.darkTheme);
      atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
    }
  },

  _registerCommands() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dark-mode:toggle': () => this._toggle(),
      'dark-mode:Turn On Auto Mode': () => atom.config.set('dark-mode.autoMode', true),
      'dark-mode:Turn Off Auto Mode': () => atom.config.set('dark-mode.autoMode', false)
    }));
  },

  _registerCallbacks() {
    this.subscriptions.add(atom.config.onDidChange('dark-mode.autoMode', ({newValue}) => {
      this._setSensorsState(newValue);
      atom.notifications.addInfo(`Dark Mode: Automatic mode is ${newValue ? 'ON' : 'OFF'}`, notificationsOptions);
    }));
  },

  _initializeSensors() {
    return this._sensors = sensors.map((sensor) => new sensor(this));
  },

  _setSensorsState(state) {
    this.sensors.forEach((sensor) => state ? sensor.activateSensor()() : sensor.deactivateSensor())
  },

  _toggle() {
    atom.config.set('dark-mode.autoMode', false);
    return this._changeTheme(this.contrastTheme);
  },

  _changeTheme(theme = '') {
    atom.config.set('core.themes', theme.split(' '));
  },

  _startupNotification() {
    atom.notifications.addInfo(`Dark Mode: Automatic mode is ${this.autoModeOption ? 'ON' : 'OFF'}`, {
      icon: 'light-bulb',
      buttons: [{
        text: this.autoModeOption ? 'Disable' : 'Enable',
        onDidClick() {
          atom.config.set('dark-mode.autoMode', !this.autoModeOption);
        }
      }]
    });
  }
};
