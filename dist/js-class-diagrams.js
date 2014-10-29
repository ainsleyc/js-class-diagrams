(function() {
    var a;
    a = function() {
        function a(b) {
            this.el = b, this.renderer = new a.Renderer();
        }
        return a.prototype.draw = function(a) {
            return this.renderer.draw(this.el, a);
        }, a;
    }(), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? (module.exports = a, 
    a.Renderer = require("renderer"), a.Parser = require("parser")) : "undefined" != typeof window && null !== window && (window.JCD = a);
}).call(this), function() {
    var a, b = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    };
    a = function() {
        function a() {
            this._resize = b(this._resize, this), this._format = b(this._format, this), this._move = b(this._move, this), 
            this._getDrag = b(this._getDrag, this), this.draw = b(this.draw, this);
        }
        return a.prototype.DEFAULT_FONT_SIZE = 10, a.prototype.DEFAULT_PADDING = 12, a.prototype.DEFAULT_TEXT_MARGIN = 10, 
        a.prototype.SCALING_FACTOR = 4, a.prototype.draw = function(a, b, c) {
            var d, e, f, g, h;
            return null == c && (c = {}), d = this._format(b), g = a.append("svg").attr("id", d[0].labels[0].label).attr("class", "class-block").call(this._getDrag()), 
            e = g.selectAll("g").data(d).enter().append("g"), f = e.append("rect").attr("class", "value-block"), 
            h = e.selectAll("text").data(function(a) {
                return a.labels;
            }).enter().append("text").text(function(a) {
                return a.label;
            }), this._resize(g, c), this.svg = g, this.svg;
        }, a.prototype._getDrag = function() {
            var a, b = this;
            return a = new d3.behavior.drag().origin(function() {
                return {
                    x: b.svg.attr("x"),
                    y: b.svg.attr("y")
                };
            }).on("drag", this._move);
        }, a.prototype._move = function() {
            return this.svg.attr("x", d3.event.x).attr("y", d3.event.y);
        }, a.prototype._format = function(a) {
            var b;
            return b = [], null != a.name && b.push({
                labels: this._getName(a.name)
            }), null != a.attributes && b.push({
                labels: this._getAttributes(a.attributes)
            }), null != a.methods && b.push({
                labels: this._getMethods(a.methods)
            }), b;
        }, a.prototype._getName = function(a) {
            return [ {
                label: a
            } ];
        }, a.prototype._getAttributes = function(a) {
            var b, c, d, e;
            for (c = [], d = 0, e = a.length; e > d; d++) b = a[d], c.push({
                label: "" + b.vis + " " + b.name + " (" + b.type + ")"
            });
            return 0 === c.length && c.push({
                label: ""
            }), c;
        }, a.prototype._getMethods = function(a) {
            var b, c, d, e;
            for (c = [], d = 0, e = a.length; e > d; d++) b = a[d], c.push({
                label: "" + b.vis + " " + b.name
            });
            return 0 === c.length && c.push({
                label: ""
            }), c;
        }, a.prototype._resize = function(a, b) {
            var c, d, e, f, g, h, i;
            return null == b && (b = {}), c = b.font || this.DEFAULT_FONT_SIZE, f = b.padding || this.DEFAULT_PADDING, 
            h = b.textMargin || this.DEFAULT_TEXT_MARGIN, i = 0, d = 0, e = 0, g = 0, a.selectAll("g").each(function(a) {
                var b;
                return d3.select(this).selectAll("text").each(function(a, b) {
                    var c;
                    return c = this.getBBox(), i = Math.max(i, c.width), d = c.height, d3.select(this).attr("y", e + f + h + b * d).attr("x", f);
                }), b = a.labels.length * d + 2 * f, g += b, d3.select(this).select("rect").attr("height", b).attr("y", e), 
                e += b;
            }), i += 2 * f, a.attr("width", i), a.attr("height", g), a.selectAll("rect").attr("width", i), 
            a.select("text").attr("text-anchor", "middle").attr("x", i / 2);
        }, a;
    }(), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.ClassBlock = a);
}.call(this), function() {
    var a, b = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    };
    a = function() {
        function a() {
            this._drawRelations = b(this._drawRelations, this), this._rearrange = b(this._rearrange, this), 
            this._drawBlocks = b(this._drawBlocks, this), this.draw = b(this.draw, this);
        }
        return a.prototype.DEFAULT_LEVEL_PADDING = 40, a.prototype.blocks = [], a.prototype.relations = {}, 
        a.prototype.draw = function(a, b) {
            var c, d;
            return c = $(a), d = d3.select(a).append("svg").attr("height", c.height()).attr("width", c.width()), 
            this._drawBlocks(d, b), this._rearrange(d, b), this._drawRelations(d, b);
        }, a.prototype._drawBlocks = function(a, b) {
            var c, d, e, f, g, h;
            for (g = b.classes, h = [], e = 0, f = g.length; f > e; e++) d = g[e], c = new JCD.ClassBlock(), 
            c.draw(a, d), h.push(this.blocks.push(c));
            return h;
        }, a.prototype._rearrange = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            for (i = this._getLevels(b), l = a.attr("width"), d = a.attr("height"), h = this.DEFAULT_LEVEL_PADDING, 
            n = 0, s = [], f = o = 0, q = i.length; q > o; f = ++o) {
                for (j = i[f], k = 0, e = p = 0, r = j.length; r > p; e = ++p) g = j[e], m = l / 1.5 / (j.length + 1) * (e + 1), 
                c = a.select("#" + g), null != c && (k = Math.max(k, c.attr("height")), c.attr("x", m - c.attr("width") / 2).attr("y", n + (f + 1) * h));
                s.push(n += k);
            }
            return s;
        }, a.prototype._drawRelations = function() {
            return console.log();
        }, a.prototype._getLevels = function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            for (d = [], i = {}, q = a.relations, k = 0, n = q.length; n > k; k++) h = q[k], 
            null == i[h.to] && (i[h.to] = {
                from: 0,
                to: 0
            }), i[h.to].to += 1, null == i[h.from] && (i[h.from] = {
                from: 0,
                to: 0
            }), i[h.from].from += 1;
            e = [];
            for (c in i) j = i[c], 0 === j.from && (e.push(c), delete i[c]);
            for (d.push(e), g = 0; g !== Object.keys(i).length; ) {
                for (g = Object.keys(i).length, f = [], r = d[d.length - 1], l = 0, o = r.length; o > l; l++) for (b = r[l], 
                s = a.relations, m = 0, p = s.length; p > m; m++) h = s[m], h.to === b && (f.push(h.from), 
                delete i[h.from]);
                f.length > 0 && d.push(f);
            }
            return d;
        }, a;
    }(), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.Renderer = a);
}.call(this), function() {
    var a, b, c;
    "undefined" != typeof require && null !== require && (b = require("pegjs"), c = require("underscore")), 
    a = function() {
        function a(a) {
            this.grammar = a, this.parser = b.buildParser(a);
        }
        return a.prototype.parse = function(a) {
            return this.parser.parse(a);
        }, a;
    }(), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.Parser = a);
}.call(this);