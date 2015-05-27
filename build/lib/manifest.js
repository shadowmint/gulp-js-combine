/** A manifest of all processed content */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Manifest = (function () {

  /** The set of content items, by name */

  function Manifest() {
    _classCallCheck(this, Manifest);

    this._contents = {};
  }

  _createClass(Manifest, [{
    key: 'push',

    /** Push content into the manfiest */
    value: function push(name, value) {
      this._contents[name] = value;
    }
  }, {
    key: 'emit',

    /** Emit a single javascript block */
    value: function emit() {
      var json = JSON.stringify(this._contents);
      return '(function() { return ' + json + '})()';
    }
  }]);

  return Manifest;
})();

exports.Manifest = Manifest;