peg = require('pegjs')
_   = require('underscore')

class Parser
  constructor: (@grammar) ->
    @parser = peg.buildParser(grammar)

  parse: (text) ->
    @parser.parse(text)

if typeof module?.exports isnt 'undefined'
  module.exports = Parser
