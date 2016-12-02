'use strict';

var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {Ticker}
 */
module.exports = AbstractComponent.extend({
  toString: 'Ticker',
  tdef_version: 1,

  dic_random: { optional: true, defaultValue: false },
  dic_period: { optional: true, defaultValue: 3000, datatype: 'long' },

  start: function onStart(done) {
    clearInterval(this.tickId);
    this.tickId = setInterval(function intervalHandler() {
      var value;
      if (this.dictionary.getBoolean('random', false)) {
        value = parseInt(Math.random() * 100, 10);
      } else {
        value = Date.now();
      }
      this.out_tick(value);
    }.bind(this), this.dictionary.getNumber('period', 3000));
    done();
  },

  stop: function onStop(done) {
    clearInterval(this.tickId);
    done();
  },

  update: function onUpdate(done) {
    this.stop(function stopHandler() {
      this.start(done);
    }.bind(this));
  },

  /**
   * Output port "tick"
   */
  out_tick: function onTick() {}
});
