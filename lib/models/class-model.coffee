
class ClassModel extends Backbone.Model

  constructor: (attrs) ->
    @attributeCollection = new JCD.AttributeCollection()
    @methodCollection = new JCD.MethodCollection()
    if attrs.name?
      @nameModel = new JCD.NameModel({ name: attrs.name })
    if attrs.attributes?
      @attributeCollection.reset(attrs.attributes)
    if attrs.methods?
      @methodCollection.reset(attrs.methods)

window?.JCD.ClassModel = ClassModel
