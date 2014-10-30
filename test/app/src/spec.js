mocha.ui('bdd');
mocha.reporter('html');
expect = chai.expect;

var classGrammar = null
$.get('assets/grammars/class_grammar.pegjs', function (data) {
  classGrammar = data;
  if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
  else { mocha.run(); }
});

