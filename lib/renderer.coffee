
class Renderer

  DEFAULT_LEVEL_PADDING: 40

  blocks: []
  relations: {}

  draw: (el, json) =>
    $el = $(el)
    svg = d3.select(el).append('svg')
      .attr('height', $el.height())
      .attr('width', $el.width())
    
    @_drawBlocks(svg, json)
    @_rearrange(svg, json)
    @_drawRelations(svg, json)

  _drawBlocks: (svg, json) =>
    for klass in json.classes
      block = new JCD.ClassBlock
      block.draw(svg, klass)
      @blocks.push(block)

  _rearrange: (svg, json) =>
    levels = @_getLevels(json)
    width = svg.attr('width')
    height = svg.attr('height')
    levelPadding = @DEFAULT_LEVEL_PADDING
    y = 0
    for lvl, j in levels
      maxY = 0
      for key, i in lvl
        x = (width / (lvl.length+1)) * (i+1)
        block = svg.select("##{key}")
        # TBD this existence check is not working
        if block?
          maxY = Math.max(maxY, block.attr('height'))
          block
            .attr('x', x - block.attr('width') / 2)
            .attr('y', y + ((j+1)*levelPadding))
      y += maxY

  _drawRelations: (svg, json) =>
    console.log()

  _getLevels: (json) ->
    levels = []
    relations = {}

    for rel in json.relations
      if not relations[rel.to]?
        relations[rel.to] = { from: 0, to: 0 }
      relations[rel.to].to += 1
      if not relations[rel.from]?
        relations[rel.from] = { from: 0, to: 0 }
      relations[rel.from].from += 1

    lvl1 = []
    for klass, rels of relations
      if rels.from is 0
        lvl1.push(klass)
        delete(relations[klass])
    levels.push(lvl1)

    prev = 0
    usedKeys = {}
    while prev isnt Object.keys(relations).length
      prev = Object.keys(relations).length
      nextLvl = []
      for key in levels[levels.length-1]
        for rel in json.relations
          if rel.to is key and not usedKeys[rel.from]
            usedKeys[rel.from] = true
            nextLvl.push(rel.from)
            delete(relations[rel.from])
      if nextLvl.length > 0
        levels.push(nextLvl)

    return levels

window?.JCD.Renderer = Renderer
