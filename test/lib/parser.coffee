fs     = require 'fs'
expect = require('chai').expect
Parser = require '../../lib/parser'

describe 'Parser', ->

  describe 'Basic Tests', ->
    grammar = fs.readFileSync('lib/grammars/class_grammar.pegjs').toString()
    parser  = new Parser(grammar)

    it 'should get class name correctly', ->
      test_string = "class Stuff end"
      output      = parser.parse(test_string)
      expect(output.className).to.equal('Stuff')

    it 'should get correct number of variables correctly', ->
      test_string = "class Stuff thing: String otherthing: Array end"
      output      = parser.parse(test_string)
      expect(output.variables.length).to.equal(2)


