fs = require 'fs'
expect = require('chai').expect
Renderer = require '../../lib/renderer'

xdescribe 'Renderer', ->

  describe 'block 1', ->

    it 'should have a test', ->
      expect(1).to.equal(1)
