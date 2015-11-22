'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _libManifest = require('./lib/manifest');

var _gulpToolsLibPlugin = require('gulp-tools/lib/plugin');

var JsCombine = (function (_Plugin) {
  _inherits(JsCombine, _Plugin);

  function JsCombine() {
    _classCallCheck(this, JsCombine);

    _get(Object.getPrototypeOf(JsCombine.prototype), 'constructor', this).call(this, 'gulp-js-combine');
    this.manifest = new _libManifest.Manifest();
  }

  _createClass(JsCombine, [{
    key: 'configure',
    value: function configure(options) {
      var ok = function ok(v) {
        return true;
      };
      this.options = options ? options : {};
      this.option('root', './'); // The prefix to remove from file names
      this.option('bootstrap', false, ok); // The bootstrap script to run
      this.option('bootsym', 'bootstrap'); // The bootstrap symbol to invoke
      this.option('output', 'combined.js'); // The output filename
      this.option('export', false, ok); // Generate an output variable with the given name
      this.manifest.configure(this.options);
    }
  }, {
    key: 'handle_string',
    value: function handle_string(file, value, callback) {
      this.manifest.push(file.path, value);
      callback();
    }
  }, {
    key: 'handle_close',
    value: function handle_close(target, callback) {
      this.file(target, this.options['output'], './', './', this.manifest.emit());
      callback();
    }
  }]);

  return JsCombine;
})(_gulpToolsLibPlugin.Plugin);

exports['default'] = new JsCombine().handler();
module.exports = exports['default'];