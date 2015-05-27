import {Manifest} from './lib/manifest';
import {Plugin} from './lib/plugin';

class JsCombine extends Plugin {

  constructor() {
    super('gulp-js-combine');
    this.manifest = new Manifest();
  }

  configure(options) {
    this.options = options ? options : {};
    this.option('output', 'combined.js');
  }

  handle_string(file, value, callback) {
    this.manifest.push(file.path, value);
    callback();
  }

  handle_close(target, callback) {
    this.file(target, this.options['output'], './', './', this.manifest.emit());
    callback();
  }
}

export default new JsCombine().handler();
