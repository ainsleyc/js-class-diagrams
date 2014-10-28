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
        return a.prototype.DEFAULT_FONT_SIZE = 10, a.prototype.DEFAULT_PADDING = 4, a.prototype.SCALING_FACTOR = 4, 
        a.prototype.draw = function(a, b, c) {
            var d, e, f, g, h, i, j;
            return null == c && (c = {}), e = c.font || this.DEFAULT_FONT_SIZE, g = c.padding || this.DEFAULT_PADDING, 
            d = this._format(b), d = this._getDimentions(d, e, g), i = d3.select(a).append("svg").attr("width", d.width).attr("height", d.height).attr("rx", 10).attr("ry", 10).attr("class", "class-block"), 
            f = i.selectAll("g").data(d).enter().append("g"), h = f.append("rect").attr("width", d.width).attr("height", function(a) {
                return a.height;
            }).attr("y", function(a) {
                return a.offset;
            }).attr("class", "value-block"), j = f.selectAll("text").data(function(a) {
                return a.labels;
            }).enter().append("text").attr("y", function(a) {
                return a.offset + 14;
            }).text(function(a) {
                return a.label;
            });
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
            var d, e, f, g, h, i, j, k, l, m;
            for (f = 0, h = 0, i = 0, k = a.length; k > i; i++) {
                for (d = a[i], d.height = this.SCALING_FACTOR * (d.labels.length * b + c), d.offset = h, 
                m = d.labels, e = j = 0, l = m.length; l > j; e = ++j) g = m[e], g.offset = h + 16 * e, 
                f = Math.max(f, g.label.length);
                h += d.height;
            }
            return a.width = this.SCALING_FACTOR * (f + c), a.height = h, a;
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