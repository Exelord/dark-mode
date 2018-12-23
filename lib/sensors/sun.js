'use babel';

import Sensor from './sensor';
import SunCalc from 'suncalc';
import schedule from 'node-schedule';

export default class extends Sensor {
  constructor() {
    super(...arguments);
  }

  get sensorOptionName() {
    return 'sunSensor';
  }

  get currentPhase() {
    let now = new Date();
    let { nightAt, dayAt } = this;

    return now >= dayAt && now < nightAt ? 'day' : 'night';
  }

  async activate() {
    await this._fetchSunTimes();

    if (this.dayAt && this.nightAt) {
      let changeAt = this.currentPhase == 'day' ? this.nightAt : this.dayAt;

      this._setCurrentPhaseTheme();
      this.scheduler = this._callAt(changeAt, () => this.activate());
    } else {
      this.log('Could not calculate sun positions', 'warn');
    }
  }

  deactivate() {
    this.scheduler.cancel();
  }

  _fetchSunTimes() {
    return fetch('http://ip-api.com/json?fields=lat,lon')
      .then((response) => response.json())
      .then(({ lat, lon }) => {
        let day = 1000 * 60 * 60 * 24;
        let now = new Date();
        let tomorrow = new Date(now.getTime() + day);
        let yesterday = new Date(now.getTime() - day);

        let todayTimes = this._calculateTimes(now, lat, lon);

        this.dayAt = now >= todayTimes.nightAt ? this._calculateTimes(tomorrow, lat, lon).dayAt : todayTimes.dayAt;
        this.nightAt = now < todayTimes.dayAt ? this._calculateTimes(yesterday, lat, lon).nightAt : todayTimes.nightAt;
      });
  }

  _calculateTimes(date, lat, long) {
    let times = SunCalc.getTimes(date, lat, long);

    return {
      nightAt: times.dusk,
      dayAt: times.sunriseEnd
    };
  }

  _setCurrentPhaseTheme() {
    this.currentPhase == 'day' ? this.switchToLightMode() : this.switchToDarkMode();
  }

  _callAt(date, callback = () => {}) {
    let now = new Date();

    if (date && date > now) {
      this.log(`Theme change has been schedule at: ${date}`);
      return schedule.scheduleJob(date, callback);
    }
  }
}
