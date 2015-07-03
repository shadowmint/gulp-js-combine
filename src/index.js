import {Manifest} from './lib/manifest';
import {Plugin} from './lib/plugin';

class JsCombine extends Plugin {

  constructor() {
    super('gulp-js-combine');
    this.manifest = new Manifest();
  }

  configure(options) {
    this.options = options ? options : {};
    this.option('root', './');            // The prefix to remove from file names
    this.option('bootstrap', false);      // The bootstrap script to run
    this.option('bootsym', 'bootstrap');  // The bootstrap symbol to invoke
    this.option('output', 'combined.js'); // The output filename
    this.option('export', false);         // Generate an output variable with the given name
    this.manifest.configure(this.options);
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
