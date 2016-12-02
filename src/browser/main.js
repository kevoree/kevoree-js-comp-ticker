/* globals KevoreeModuleLoader */

var pkg = require('../../package.json');
var Ticker = require('./TickerUI');

KevoreeModuleLoader.register(pkg.name, pkg.version, Ticker);
