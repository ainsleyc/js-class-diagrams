(function() {
  var Renderer, expect, fs;

  fs = require('fs');

  expect = require('chai').expect;

  Renderer = require('../../lib/renderer');

  xdescribe('Renderer', function() {
    return describe('block 1', function() {
      return it('should have a test', function() {
        return expect(1).to.equal(1);
      });
    });
  });

}).call(this);
