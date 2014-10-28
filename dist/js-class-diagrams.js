(function() {
    var a, b = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    };
    a = function() {
        function a() {
            this._resize = b(this._resize, this), this._format = b(this._format, this);
        }
        return a.prototype.DEFAULT_FONT_SIZE = 10, a.prototype.DEFAULT_PADDING = 12, a.prototype.DEFAULT_TEXT_MARGIN = 10, 
        a.prototype.SCALING_FACTOR = 4, a.prototype.draw = function(a, b, c) {
            var d, e, f, g, h;
            return null == c && (c = {}), d = this._format(b), g = d3.select(a).append("svg").attr("id", d[0].labels[0].label).attr("class", "class-block"), 
            e = g.selectAll("g").data(d).enter().append("g"), f = e.append("rect").attr("class", "value-block"), 
            h = e.selectAll("text").data(function(a) {
                return a.labels;
            }).enter().append("text").text(function(a) {
                return a.label;
            }), this._resize(g, c), g;
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
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a), 
    "undefined" != typeof window && null !== window && (window.JCD = window.JCD || {}, 
    window.JCD.ClassBlock = new a());
}).call(this), function() {
    var a, b, c;
    "undefined" != typeof require && null !== require && (b = require("pegjs"), c = require("underscore")), 
    a = function() {
        function a(a) {
            this.grammar = a, this.parser = b.buildParser(a);
        }
        return a.prototype.parse = function(a) {
            return this.parser.parse(a);
        }, a;
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a);
}.call(this), function() {
    var a, b;
    a = function() {
        function a() {}
        return a.prototype.draw = function(a, b) {
            var c, d, e, f, g;
            for (f = b.classes, g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(JCD.ClassBlock.draw(a, c));
            return g;
        }, a;
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a), 
    "undefined" != typeof window && null !== window && (b = new a(), window.JCD = window.JCD || {}, 
    window.JCD.draw = b.draw);
}.call(this);