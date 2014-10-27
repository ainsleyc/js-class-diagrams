
class Renderer

  draw: (el, json) ->
    $(el).text(JSON.stringify(json))

if typeof module?.exports isnt 'undefined'
  module.exports = Renderer

if window?
  renderer = new Renderer()
  window.JCD = window.JCD || {}
  window.JCD.draw = renderer.draw
