'use babel';

import Sensor from './sensor';
import { systemPreferences } from 'electron';

export default class extends Sensor {
  get sensorOptionName() {
    return 'systemThemeSensor';
  }

  activate() {
    if (systemPreferences) {
      this.setCurrentSystemTheme();
      this.subscriptionId = systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
        this.setCurrentSystemTheme();
      });
    } else {
      this.log('Sensor is not supported on this system!', 'warn');
    }
  }

  setCurrentSystemTheme() {
    if (systemPreferences) {
      systemPreferences.isDarkMode() ? this.switchToDarkMode() : this.switchToLightMode();
    }
  }

  deactivate() {
    if (this.subscriptionId && systemPreferences) {
      systemPreferences.unsubscribeNotification(this.subscriptionId);
    }
  }
}
