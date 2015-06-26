(function(foo) {
  console.log(foo);
  document.write(foo['class1.html']);
  document.write('<style>' + foo['class1.css'] + '</style>');
  document.write('<script>' + foo['class1.js'] + '</script>');
});
