/** A manifest of all processed content */
export class Manifest {

  /** The set of content items, by name */
  constructor() {
    this._contents = {};
  }

  /** Push content into the manfiest */
  push(name, value) {
    this._contents[name] = value;
  }

  /** Emit a single javascript block */
  emit() {
    var json = JSON.stringify(this._contents);
    return '(function() { return ' + json + '})()';
  }
}
