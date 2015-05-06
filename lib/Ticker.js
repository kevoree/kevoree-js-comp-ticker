var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {Ticker}
 */
var Ticker = AbstractComponent.extend({
    toString: 'Ticker',

    dic_random: { optional: true, defaultValue: false },
    dic_period: { optional: true, defaultValue: 3000, datatype: 'long' },

    construct: function () {
        this.value = null;
        this.count = 0;
        this.updateUI = function () { /* noop */ };
    },

    start: function (done) {
        clearInterval(this.tickId);
        this.tickId = setInterval(function () {
            this.value = new Date().getTime();
            if (this.dictionary.getBoolean('random', false)) {
                this.value = parseInt(Math.random()*100);
            }
            this.out_tick(this.value);
            this.count++;
            this.updateUI();
        }.bind(this), this.dictionary.getNumber('period', 3000));
        done();
    },

    stop: function (done) {
        clearInterval(this.tickId);
        done();
    },

    update: function (done) {
        this.stop(function () {
            this.start(done);
        }.bind(this));
    },

    /**
     * Output port "tick"
     */
    out_tick: function () {},

    uiController: function () {
        return ['$scope', '$interval', 'instance', function ($scope, $timeout, instance) {
            $scope.name = instance.getName();
            $scope.value = instance.value || '<no tick yet>';
            $scope.count = instance.count;

            instance.updateUI = function () {
                $timeout(function () {
                    $scope.value = instance.value;
                    $scope.count = instance.count;
                });
            };
        }];
    }
});

module.exports = Ticker;
