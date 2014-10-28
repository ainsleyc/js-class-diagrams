
class Renderer

  draw: (el, json) ->
    for klass in json.classes
      JCD.ClassBlock.draw(el, klass)

if typeof module?.exports isnt 'undefined'
  module.exports = Renderer

if window?
  renderer = new Renderer()
  window.JCD = window.JCD || {}
  window.JCD.draw = renderer.draw
