
class DiagramView extends Backbone.View

  initialize: (params) ->
    
    @classCollection = params.classCollection
    @relationCollection = params.relationCollection

    @_registerEvents()

  _registerEvents: () =>
    @listenTo(@classCollection, 'reset', @_onClassReset)
    @listenTo(@relationCollection, 'reset', @_onRelationReset)

  _onClassReset: () =>
    console.log("CLASS RESET!")

  _onRelationReset: () =>
    console.log("RELATION RESET!")

window.JCD.DiagramView = DiagramView
