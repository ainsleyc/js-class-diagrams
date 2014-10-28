(function() {
    var a, b = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    };
    a = function() {
        function a() {
            this._format = b(this._format, this);
        }
        return a.prototype.DEFAULT_FONT_SIZE = 10, a.prototype.DEFAULT_PADDING = 10, a.prototype.SCALING_FACTOR = 4, 
        a.prototype.draw = function(a, b, c) {
            var d, e, f, g, h, i, j, k;
            return null == c && (c = {}), e = c.font || this.DEFAULT_FONT_SIZE, g = c.padding || this.DEFAULT_PADDING, 
            d = this._format(b), d = this._getDimentions(d, e, g), i = d3.select(a).append("svg").attr("height", d.height).attr("rx", 10).attr("ry", 10).attr("class", "class-block"), 
            f = i.selectAll("g").data(d).enter().append("g"), h = f.append("rect").attr("height", function(a) {
                return a.height;
            }).attr("y", function(a) {
                return a.offset;
            }).attr("class", "value-block"), j = f.selectAll("text").data(function(a) {
                return a.labels;
            }).enter().append("text").attr("y", function(a) {
                return a.offset + 2 * g;
            }).attr("x", function() {
                return g;
            }).text(function(a) {
                return a.label;
            }), k = 0, j.each(function() {
                return k = Math.max(k, this.getBBox().width);
            }), k += 2 * g, i.attr("width", k), h.attr("width", k), i.select("text").attr("text-anchor", "middle").attr("x", k / 2);
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
            return c;
        }, a.prototype._getMethods = function(a) {
            var b, c, d, e;
            for (c = [], d = 0, e = a.length; e > d; d++) b = a[d], c.push({
                label: "" + b.vis + " " + b.name
            });
            return c;
        }, a.prototype._getDimentions = function(a, b, c) {
            var d, e, f, g, h, i, j, k, l;
            for (g = 0, h = 0, j = a.length; j > h; h++) {
                for (d = a[h], d.height = this.SCALING_FACTOR * (d.labels.length * b + c), d.offset = g, 
                l = d.labels, e = i = 0, k = l.length; k > i; e = ++i) f = l[e], f.offset = g + 16 * e;
                g += d.height;
            }
            return a.height = g, a;
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