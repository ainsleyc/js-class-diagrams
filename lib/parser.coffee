if require?
  peg = require('pegjs')
  _   = require('underscore')

class Parser
  constructor: (@grammar) ->
    @parser = peg.buildParser(grammar)

  parse: (text) ->
    @parser.parse(text)

if module?.exports?
  module.exports = Parser
else if window?
  window.JCD.Parser = Parser
