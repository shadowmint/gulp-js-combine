(function() { var bootstrap = eval("'use strict';\n\n(function (foo) {\n  console.log(foo);\n  document.write(foo['class1.html']);\n  document.write('<style>' + foo['class1.css'] + '</style>');\n  document.write('<script>' + foo['class1.js'] + '</script>');\n});"); return bootstrap((function() { return {"class1.css":".class1 h1 {\n  color: #f00; }\n","class1.html":"<div class=\"class1\"><h1> \nHi</h1></div>","class1.js":"'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar One = function One() {\n  _classCallCheck(this, One);\n\n  this.foo = 'bar';\n};"}; })()) })();