
class JCD

  constructor: (@el) ->
    @renderer = new JCD.Renderer()
    # @parser = new JCD.Parser()

  draw: (json) ->
    @renderer.draw(@el, json)

if module?.exports?
  module.exports = JCD
  JCD.Renderer = require('renderer')
  JCD.Parser = require('parser')
else if window?
  window.JCD = JCD
