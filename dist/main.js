'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var electronConnect = require('electron-connect');

var ElectronConnectReplacementWebpackPlugin = function () {
  function ElectronConnectReplacementWebpackPlugin(pluginOptions, electronOptions) {
    _classCallCheck(this, ElectronConnectReplacementWebpackPlugin);

    this._pluginOptions = pluginOptions ? pluginOptions : {};
    this._electronOptions = electronOptions ? electronOptions : {};

    this.apply = this.apply.bind(this);
    this.done = this.done.bind(this);
  }

  _createClass(ElectronConnectReplacementWebpackPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      if (this._server === undefined) {
        this._server = electronConnect.server.create(this._electronOptions);
      }

      // Start browser process
      this._server.start();

      compiler.plugin('done', this.done);
    }
  }, {
    key: 'done',
    value: function done() {
      console.log('[ECR]: Enabled');
      // Reload renderer process
      this._server.reload();
    }
  }]);

  return ElectronConnectReplacementWebpackPlugin;
}();

exports.default = ElectronConnectReplacementWebpackPlugin;