'use babel';

export default class {
  constructor(startTime, stopTime, onLight = () => {}, onDark = () => {}) {
    this.startTime = startTime;
    this.stopTime = stopTime;
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
    this.startTicker()
  }

  _deactivate() {
    this.clearTicker()
  }

  startTicker() {
    this.check()
    var nextTick = this.refreshInterval - (Date.now() % 60000)
    this.tick = setTimeout (() =>  { this.startTicker() }, nextTick)
  }

  clearTicker() {
    if (this.tick)
      clearTimeout(this.tick)
  }

  check() {
    if (!this.Moment)
      this.Moment = require('moment')

    var moment = this.Moment().format('HH:mm')

    if ((moment > this.startTime) || (moment < this.stopTime)) {
      this.onDark()
    } else {
      this.onLight()
    }
  }
}
