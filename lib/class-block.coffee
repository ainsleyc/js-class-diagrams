
class ClassBlock

  DEFAULT_FONT_SIZE: 10
  DEFAULT_PADDING: 12
  DEFAULT_TEXT_MARGIN: 10

  SCALING_FACTOR: 4

  draw: (svgEl, klass, options = {}) ->
    data = @_format(klass)
    svg = svgEl.append("svg")
      .attr('id', data[0].labels[0].label)
      .attr('class', 'class-block')
    g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
    rect = g.append('rect')
      .attr('class', 'value-block')
    text = g.selectAll("text")
      .data((d) -> return d.labels)
      .enter()
      .append('text')
      .text((d) -> return d.label)

    @_resize(svg, options)

    return svg

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
    if result.length is 0
      result.push({ label: "" })
    return result

  _getMethods: (methods) ->
    result = []
    for method in methods
      result.push({ label: "#{method.vis} #{method.name}" })
    if result.length is 0
      result.push({ label: "" })
    return result

  _resize: (svg, options = {}) =>
    font = options.font || @DEFAULT_FONT_SIZE
    padding = options.padding || @DEFAULT_PADDING
    textMargin = options.textMargin || @DEFAULT_TEXT_MARGIN

    width = 0
    height = 0
    offset = 0
    svgHeight = 0

    svg.selectAll('g').each((d) ->
      d3.select(@).selectAll('text').each((d, i) ->
        box = @getBBox()
        width = Math.max(width, box.width)
        height = box.height
        d3.select(@)
          .attr('y', offset + padding + textMargin + (i * height))
          .attr('x', padding)
      )
      rectHeight = d.labels.length * height + (padding * 2)
      svgHeight += rectHeight
      d3.select(@).select('rect')
        .attr('height', rectHeight)
        .attr('y', offset)
      offset += rectHeight
    )

    width = width + (padding * 2)
    svg.attr('width', width)
    svg.attr('height', svgHeight)
    svg.selectAll('rect')
      .attr('width', width)

    svg.select('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)

if typeof module?.exports isnt 'undefined'
  module.exports = ClassBlock

if window?
  window.JCD = window.JCD || {}
  window.JCD.ClassBlock = new ClassBlock
