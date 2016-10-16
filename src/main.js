const electronConnect = require('electron-connect');

class ElectronConnectReplacementWebpackPlugin {

  constructor(pluginOptions, electronOptions) {
    this._pluginOptions = pluginOptions ? pluginOptions : {};
    this._electronOptions = electronOptions ? electronOptions : {};

    this.apply = this.apply.bind(this);
    this.done = this.done.bind(this);
  }

  apply(compiler) {
    if (this._server === undefined) {
      this._server = electronConnect.server.create(this._electronOptions);
    }

    // Start browser process
    this._server.start();

    compiler.plugin('done', this.done);
  }

  done() {
    console.log('[ECR]: Enabled');
    // Reload renderer process
    this._server.reload();
  }
}

export default ElectronConnectReplacementWebpackPlugin;