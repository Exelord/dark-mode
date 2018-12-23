'use babel';

import Sensor from './sensor';
import SunCalc from 'suncalc';

export default class extends Sensor {
  constructor() {
    super(...arguments);
    this.positionTimes = {};
  }

  get sensorOptionName() {
    return 'sunSensor';
  }

  get dayAt() {
    return this.positionTimes.sunriseEnd;
  }

  get nightAt() {
    return this.positionTimes.dusk;
  }

  get currentPhase() {
    return new Date() < this.nightAt ? 'day' : 'night';
  }

  get nextChangeAt() {
    return this.currentPhase == 'day' ? this.nightAt : this.dayAt;
  }

  async activate() {
    await this._fetchSunTimes();

    if (this.positionTimes) {
      this._setCurrentPhaseTheme();
      this.timesTimeout = this._callAt(this.nextChangeAt, () => this.activate());
    } else {
      this.log('Could not calculate sun positions', 'warn');
    }
  }

  deactivate() {
    clearTimeout(this.timesTimeout);
  }

  _fetchSunTimes() {
    return fetch('http://ip-api.com/json?fields=lat,lon')
      .then((response) => response.json())
      .then(({ lat, lon }) => this.positionTimes = SunCalc.getTimes(new Date(), lat, lon));
  }

  _setCurrentPhaseTheme() {
    this.currentPhase == 'day' ? this.switchToLightMode() : this.switchToDarkMode();
  }

  _callAt(date, callback = () => {}) {
    let now = new Date();

    if (date && date > now) {
      let delay = date - now;
      this.log(`Theme change has been schedule at: ${date}`);
      return setTimeout(callback, delay);
    }
  }
}
