function bootstrap(foo) {
  console.log(foo);

  // Inject content
  document.write('<style>' + foo['class1.css'] + '</style>');
  document.write(foo['class1.html']);

  // Load a class from a js file
  var one = eval(`(function() { ${foo['class1.js']}; return One; })()`);
  var instance = new one();
  console.log(instance);
};
