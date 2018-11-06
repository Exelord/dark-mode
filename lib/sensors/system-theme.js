'use babel';

import Sensor from './sensor';
import { systemPreferences } from 'electron';

export default class extends Sensor {
  constructor() {
    super(...arguments);
    this.sensorOptionName = 'systemThemeSensor';
  }

  activate() {
    if (systemPreferences) {
      this.subscriptionId = systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
        systemPreferences.isDarkMode() ? this.switchToDarkMode() : this.switchToLightMode();
      })
    } else {
      console.warn('DarkMode:', '"SystemThemeSensor" is not supported on this system!');
    }
  }

  deactivate() {
    if (this.subscriptionId) {
      systemPreferences.unsubscribeNotification(this.subscriptionId);
    }
  }
}
