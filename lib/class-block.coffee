
class ClassBlock

  DEFAULT_FONT_SIZE: 10
  DEFAULT_PADDING: 10

  SCALING_FACTOR: 4

  draw: (el, klass, options = {}) ->
    font = options.font || @DEFAULT_FONT_SIZE
    padding = options.padding || @DEFAULT_PADDING
    data = @_format(klass)
    data = @_getDimentions(data, font, padding)
    svg = d3.select(el).append("svg")
      .attr('height', data.height)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('class', 'class-block')
    g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
    rect = g.append('rect')
      .attr('height', (d) -> return d.height)
      .attr('y', (d) -> return d.offset)
      .attr('class', 'value-block')
    text = g.selectAll("text")
      .data((d) -> return d.labels)
      .enter()
      .append('text')
      .attr('y', (d) -> return d.offset + (padding * 2))
      .attr('x', (d) -> return padding)
      .text((d) -> return d.label)

    width = 0
    text.each((d, i) ->
      width = Math.max(width, @getBBox().width)
    )
    width = width + (padding * 2)
    svg.attr('width', width)
    rect.attr('width', width)

    svg.select('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)

  _format: (klass) =>
    result = []
    if klass.name?
      result.push({ labels: @_getName(klass.name) })
    if klass.attributes?
      result.push({ labels: @_getAttributes(klass.attributes) })
    if klass.methods?
      result.push({ labels: @_getMethods(klass.methods) })
    return result

  _getName: (name) ->
    return([{ label: name }])

  _getAttributes: (attrs) ->
    result = []
    for attr in attrs
      result.push({ label: "#{attr.vis} #{attr.name} (#{attr.type})" })
    return result

  _getMethods: (methods) ->
    result = []
    for method in methods
      result.push({ label: "#{method.vis} #{method.name}" })
    return result

  _getDimentions: (data, font, padding) ->
    totalHeight = 0
    for block in data
      block.height = @SCALING_FACTOR * (block.labels.length * font + padding)
      block.offset = totalHeight
      for sub, i in block.labels
        sub.offset = totalHeight + (i * 16)
      totalHeight += block.height
    data.height = totalHeight
    return data

if typeof module?.exports isnt 'undefined'
  module.exports = ClassBlock

if window?
  window.JCD = window.JCD || {}
  window.JCD.ClassBlock = new ClassBlock
