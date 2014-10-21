fs = require 'fs'
expect = require('chai').expect
Parser = require '../../lib/parser'

describe 'Parser', ->

  describe 'block 1', ->

    it 'should have a test', ->
      expect(1).to.equal(1)
