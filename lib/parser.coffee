
class Parser
  constructor: (@grammar) ->
    @parser = PEG.buildParser(grammar)

  parse: (text) ->
    @parser.parse(text)

window.JCD.Parser = Parser
