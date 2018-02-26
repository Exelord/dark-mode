'use babel';

import Config from './config';
import { CompositeDisposable } from 'atom';
import AmbientLight from './ambient-light';

let notificationsOptions = { icon: 'light-bulb' };

export default {
  config: Config,
  subscriptions: null,

  get lightTheme() {
    return atom.config.get('dark-mode.lightProfile');
  },

  get darkTheme() {
    return atom.config.get('dark-mode.darkProfile');
  },

  get currentTheme() {
    return atom.config.get('core.themes').join(' ');
  },

  get state() {
    return atom.config.get('dark-mode.ambientLight');
  },

  get threshold() {
    return atom.config.get('dark-mode.ambientLightThreshold');
  },

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.registerCommands();
    this.registerCallbacks();
    this.ambientLight = new AmbientLight(this.threshold, this.onLight.bind(this), this.onDark.bind(this));
    this.ambientLight.active = this.state;

    this._startupNotification();
  },

  deactivate() {
    this.ambientLight.active = false;
    this.subscriptions.dispose();
  },

  registerCommands() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dark-mode:toggle': () => this.toggle(),
      'dark-mode:Turn On Auto Mode': () => atom.config.set('dark-mode.ambientLight', true),
      'dark-mode:Turn Off Auto Mode': () => atom.config.set('dark-mode.ambientLight', false)
    }));
  },

  registerCallbacks() {
    this.subscriptions.add(atom.config.onDidChange('dark-mode.ambientLight', ({newValue}) => {
      this.ambientLight.active = newValue;
      atom.notifications.addInfo(`Dark Mode: Automatic mode is ${newValue ? 'ON' : 'OFF'}`, notificationsOptions);
    }));

    this.subscriptions.add(atom.config.onDidChange('dark-mode.ambientLightThreshold', ({newValue}) => {
      this.ambientLight.threshold = newValue;
    }));
  },

  toggle() {
    let next = (this.currentTheme == this.darkTheme ? this.lightTheme : this.darkTheme);

    atom.config.set('dark-mode.ambientLight', false);
    return this._changeTheme(next);
  },

  onLight() {
    if (this.currentTheme != this.lightTheme) {
      this._changeTheme(this.lightTheme);
      atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
    }
  },

  onDark() {
    if (this.currentTheme != this.darkTheme) {
      this._changeTheme(this.darkTheme);
      atom.notifications.addSuccess('Dark Mode: Theme has been changed automatically', notificationsOptions);
    }
  },

  _changeTheme(theme = '') {
    atom.config.set('core.themes', theme.split(' '));
  },

  _startupNotification() {
    atom.notifications.addInfo(`Dark Mode: Automatic mode is ${this.state ? 'ON' : 'OFF'}`, {
      icon: 'light-bulb',
      buttons: [{
        text: this.state ? 'Disable' : 'Enable',
        onDidClick() {
          atom.config.set('dark-mode.ambientLight', !this.state);
        }
      }]
    });
  }
};
