import path from 'path';

/** A manifest of all processed content */
export class Manifest {

  /** The set of content items, by name */
  constructor() {
    this.contents = {};
    this.options = {};
    this.bootstrap = null;
  }

  /** Configure options for this */
  configure(options) {
    this.options = options;
    if (this.options.root) {
      this.options.root = path.resolve(this.options.root) + '/';
    }
  }

  /**
   * Push content into the manfiest
   * If any root is configured, remove it from the given name value.
   * If the bootstrap is passed, do not add to content, and save.
   */
  push(name, value) {
    if (this.options.root) {
      if (name.indexOf(this.options.root) == 0) {
        var len = this.options.root.length;
        name = name.substring(len, name.length);
      }
    }
    if (name && this.options.bootstrap && (name == this.options.bootstrap)) {
      this.bootstrap = value;
    }
    else {
      this.contents[name] = value;
    }
  }

  /**
   * Emit a single javascript block
   * If any bootstrap is specified, run it on the result.
   */
  emit() {
    var json = JSON.stringify(this.contents);
    var output = `(function() { return ${json}; })()`;
    if (this.bootstrap) {
      var boot = JSON.stringify(this.bootstrap);
      output = `(function() { var bootstrap = eval(${boot}); return bootstrap(${output}) })();`;
    }
    else {
      output = output + ';';
    }
    return output;
  }
}
