(function() { 'use strict';

function bootstrap(foo) {
  console.log(foo);

  // Inject content
  document.write('<style>' + foo['class1.css'] + '</style>');
  document.write(foo['class1.html']);

  // Load a class from a js file
  var one = eval('(function() { ' + foo['class1.js'] + '; return One; })()');
  var instance = new one();
  console.log(instance);
};; return bootstrap({"class1.css":".class1 h1 {\n  color: #f00; }\n","class1.html":"<div class=\"class1\"><h1> \nHi</h1></div>","class1.js":"'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar One = function One() {\n  _classCallCheck(this, One);\n\n  this.foo = 'bar';\n};"}); })();