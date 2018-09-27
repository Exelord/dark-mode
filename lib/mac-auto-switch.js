'use babel';

const { systemPreferences } = require('electron');

export default class {
  constructor(onLight = () => {}, onDark = () => {}) {
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
    if (!systemPreferences) { return; }
    this._sub = systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
      if (systemPreferences.isDarkMode()) {
        this.onDark();
      } else {
        this.onLight();
      }
    })
  }

  _deactivate() {
    if (!systemPreferences) { return; }
    systemPreferences.unsubscribeNotification(this._sub);
  }
}
