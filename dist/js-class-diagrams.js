(function() {
    "undefined" != typeof window && null !== window && (window.JCD = {});
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
                for (j = i[f], k = 0, e = p = 0, r = j.length; r > p; e = ++p) g = j[e], m = l / (j.length + 1) * (e + 1), 
                c = a.select("#" + g), null != c && (k = Math.max(k, c.attr("height")), c.attr("x", m - c.attr("width") / 2).attr("y", n + (f + 1) * h));
                s.push(n += k);
            }
            return s;
        }, a.prototype._drawRelations = function() {
            return console.log();
        }, a.prototype._getLevels = function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
            for (d = [], i = {}, r = a.relations, l = 0, o = r.length; o > l; l++) h = r[l], 
            null == i[h.to] && (i[h.to] = {
                from: 0,
                to: 0
            }), i[h.to].to += 1, null == i[h.from] && (i[h.from] = {
                from: 0,
                to: 0
            }), i[h.from].from += 1;
            e = [];
            for (c in i) j = i[c], 0 === j.from && (e.push(c), delete i[c]);
            for (d.push(e), g = 0, k = {}; g !== Object.keys(i).length; ) {
                for (g = Object.keys(i).length, f = [], s = d[d.length - 1], m = 0, p = s.length; p > m; m++) for (b = s[m], 
                t = a.relations, n = 0, q = t.length; q > n; n++) h = t[n], h.to !== b || k[h.from] || (k[h.from] = !0, 
                f.push(h.from), delete i[h.from]);
                f.length > 0 && d.push(f);
            }
            return d;
        }, a;
    }(), "undefined" != typeof window && null !== window && (window.JCD.Renderer = a);
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
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Model), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.AttributeModel = a);
}.call(this), function() {
    var a, b = {}.hasOwnProperty, c = function(a, c) {
        function d() {
            this.constructor = a;
        }
        for (var e in c) b.call(c, e) && (a[e] = c[e]);
        return d.prototype = c.prototype, a.prototype = new d(), a.__super__ = c.prototype, 
        a;
    };
    a = function(a) {
        function b(a) {
            this.attributeCollection = new JCD.AttributeCollection(), this.methodCollection = new JCD.MethodCollection(), 
            null != a.name && (this.nameModel = new JCD.NameModel({
                name: a.name
            })), null != a.attributes && this.attributeCollection.reset(a.attributes), null != a.methods && this.methodCollection.reset(a.methods);
        }
        return c(b, a), b;
    }(Backbone.Model), "undefined" != typeof window && null !== window && (window.JCD.ClassModel = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Model), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.MethodModel = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Model), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.NameModel = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Model), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.RelationModel = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Model), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.SpecModel = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.AggregationView = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.AssociationView = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.AttributeView = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports.BlockView = a : "undefined" != typeof window && null !== window && (window.JCD.BlockView = a);
}.call(this), function() {
    var a, b, c, d = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, e = {}.hasOwnProperty, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) e.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return this._resize = d(this._resize, this), this._format = d(this._format, this), 
            this._move = d(this._move, this), this._getDrag = d(this._getDrag, this), this.draw = d(this.draw, this), 
            c = b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype.DEFAULT_FONT_SIZE = 10, b.prototype.DEFAULT_PADDING = 12, 
        b.prototype.DEFAULT_TEXT_MARGIN = 10, b.prototype.SCALING_FACTOR = 4, b.prototype.draw = function(a, b, c) {
            var d, e, f, g, h;
            return null == c && (c = {}), d = this._format(b), g = a.append("svg").attr("id", d[0].labels[0].label).attr("class", "class-block").call(this._getDrag()), 
            e = g.selectAll("g").data(d).enter().append("g"), f = e.append("rect").attr("class", "value-block"), 
            h = e.selectAll("text").data(function(a) {
                return a.labels;
            }).enter().append("text").text(function(a) {
                return a.label;
            }), this._resize(g, c), this.svg = g, this.svg;
        }, b.prototype._getDrag = function() {
            var a, b = this;
            return a = new d3.behavior.drag().origin(function() {
                return {
                    x: b.svg.attr("x"),
                    y: b.svg.attr("y")
                };
            }).on("drag", this._move);
        }, b.prototype._move = function() {
            return this.svg.attr("x", d3.event.x).attr("y", d3.event.y);
        }, b.prototype._format = function(a) {
            var b;
            return b = [], null != a.name && b.push({
                labels: this._getName(a.name)
            }), null != a.attributes && b.push({
                labels: this._getAttributes(a.attributes)
            }), null != a.methods && b.push({
                labels: this._getMethods(a.methods)
            }), b;
        }, b.prototype._getName = function(a) {
            return [ {
                label: a
            } ];
        }, b.prototype._getAttributes = function(a) {
            var b, c, d, e;
            for (c = [], d = 0, e = a.length; e > d; d++) b = a[d], c.push({
                label: "" + b.vis + " " + b.name + " (" + b.type + ")"
            });
            return 0 === c.length && c.push({
                label: ""
            }), c;
        }, b.prototype._getMethods = function(a) {
            var b, c, d, e;
            for (c = [], d = 0, e = a.length; e > d; d++) b = a[d], c.push({
                label: "" + b.vis + " " + b.name
            });
            return 0 === c.length && c.push({
                label: ""
            }), c;
        }, b.prototype._resize = function(a, b) {
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
        }, b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.ClassView = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.CompositionView = a);
}.call(this), function() {
    var a, b, c = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    a = function(a) {
        function d() {
            return this._onRelationReset = c(this._onRelationReset, this), this._onClassReset = c(this._onClassReset, this), 
            this._registerEvents = c(this._registerEvents, this), b = d.__super__.constructor.apply(this, arguments);
        }
        return e(d, a), d.prototype.initialize = function(a) {
            return this.classCollection = a.classCollection, this.relationCollection = a.relationCollection, 
            this._registerEvents();
        }, d.prototype._registerEvents = function() {
            return this.listenTo(this.classCollection, "reset", this._onClassReset), this.listenTo(this.relationCollection, "reset", this._onRelationReset);
        }, d.prototype._onClassReset = function() {
            return console.log("CLASS RESET!");
        }, d.prototype._onRelationReset = function() {
            return console.log("RELATION RESET!");
        }, d;
    }(Backbone.View), window.JCD.DiagramView = a;
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.GeneralizationView = a);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.MethodView = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.NameView = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.RealizationView = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.RelationView = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.View), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.SpecView = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (b = {}), 
    a = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Collection), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = a : "undefined" != typeof window && null !== window && (window.JCD.AttributeCollection = a);
}.call(this), function() {
    var a, b, c = {}.hasOwnProperty, d = function(a, b) {
        function d() {
            this.constructor = a;
        }
        for (var e in b) c.call(b, e) && (a[e] = b[e]);
        return d.prototype = b.prototype, a.prototype = new d(), a.__super__ = b.prototype, 
        a;
    };
    a = function(a) {
        function c() {
            return b = c.__super__.constructor.apply(this, arguments);
        }
        return d(c, a), c.prototype.model = JCD.ClassModel, c;
    }(Backbone.Collection), window.JCD.ClassCollection = a;
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Collection), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.MethodCollection = b);
}.call(this), function() {
    var a, b, c, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (a = {}), 
    b = function(a) {
        function b() {
            return c = b.__super__.constructor.apply(this, arguments);
        }
        return e(b, a), b;
    }(Backbone.Collection), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = b : "undefined" != typeof window && null !== window && (window.JCD.RelationCollection = b);
}.call(this), function() {
    var a, b, c = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, d = {}.hasOwnProperty, e = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var e in b) d.call(b, e) && (a[e] = b[e]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    };
    a = function(a) {
        function d() {
            return this.load = c(this.load, this), this.draw = c(this.draw, this), b = d.__super__.constructor.apply(this, arguments);
        }
        return e(d, a), d.prototype.initialize = function(a) {
            return null != a.display && (this.displayEl = a.display), null != a.spec && (this.specEl = a.spec), 
            this.renderer = new JCD.Renderer(), this.classCollection = new JCD.ClassCollection(), 
            this.relationCollection = new JCD.RelationCollection(), this.specModel = new JCD.SpecModel(), 
            this.diagramView = new JCD.DiagramView({
                el: this.displayEl,
                classCollection: this.classCollection,
                relationCollection: this.relationCollection
            });
        }, d.prototype.draw = function(a) {
            return this.renderer.draw(this.displayEl, a);
        }, d.prototype.load = function(a) {
            return this.classCollection.reset(a.classes);
        }, d;
    }(Backbone.View), "undefined" != typeof window && null !== window && (window.JCD.factory = function(b) {
        return new a(b);
    });
}.call(this);