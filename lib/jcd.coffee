
class JCDView extends Backbone.View

  initialize: (params) ->

    if params.display? then @displayEl = params.display
    if params.spec? then @specEl = params.spec

    @renderer = new JCD.Renderer()
    # @parser = new JCD.Parser()
    @classCollection = new JCD.ClassCollection()
    @relationCollection = new JCD.RelationCollection()
    @specModel = new JCD.SpecModel()
    @diagramView = new JCD.DiagramView(
      el: @displayEl      
      classCollection: @classCollection
      relationCollection: @relationCollection
    )

  draw: (json) =>
    @renderer.draw(@displayEl, json)

  load: (json) =>
    @classCollection.reset(json.classes)

window?.JCD.factory = (params) ->
  return new JCDView(params)
