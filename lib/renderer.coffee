
class Renderer

  DEFAULT_LEVEL_PADDING: 40

  draw: (el, json) =>
    $el = $(el)
    svg = d3.select(el).append('svg')
      .attr('height', $el.height())
      .attr('width', $el.width())
    
    for klass in json.classes
      JCD.ClassBlock.draw(svg, klass)

    @_rearrange(svg, json)

  _rearrange: (el, json) =>
    @_rearrangeByClass(el, json)

  _rearrangeByClass: (svg, json) =>
    levels = @_inheritanceLevels(json)
    width = svg.attr('width')
    height = svg.attr('height')
    levelPadding = @DEFAULT_LEVEL_PADDING
    y = 0
    for lvl, j in levels
      maxY = 0
      for key, i in lvl
        x = ((width/1.5) / (lvl.length+1)) * (i+1)
        block = svg.select("##{key}")
        if block?
          maxY = Math.max(maxY, block.attr('height'))
          block
            .attr('x', x - block.attr('width') / 2)
            .attr('y', y + ((j+1)*levelPadding))
      y += maxY

  _inheritanceLevels: (json) ->
    levels = []
    relations = {}

    for cRel in json.classRelations
      if not relations[cRel.to]?
        relations[cRel.to] = { from: 0, to: 0}
      relations[cRel.to].to += 1
      if not relations[cRel.from]?
        relations[cRel.from] = { from: 0, to: 0}
      relations[cRel.from].from += 1

    lvl1 = []
    for klass, rels of relations
      if rels.from is 0
        lvl1.push(klass)
        delete(relations[klass])
    levels.push(lvl1)

    prev = 0
    while prev isnt Object.keys(relations).length
      prev = Object.keys(relations).length
      nextLvl = []
      for key in levels[levels.length-1]
        for cRel in json.classRelations
          if cRel.to is key
            nextLvl.push(cRel.from)
            delete(relations[cRel.from])
      if nextLvl.length > 0
        levels.push(nextLvl)

    return levels

if typeof module?.exports isnt 'undefined'
  module.exports = Renderer

if window?
  renderer = new Renderer()
  window.JCD = window.JCD || {}
  window.JCD.draw = renderer.draw
