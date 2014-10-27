(function() {
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
}).call(this), function() {
    var a, b;
    a = function() {
        function a() {}
        return a.prototype.draw = function(a, b) {
            return $(a).text(JSON.stringify(b));
        }, a;
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a), 
    "undefined" != typeof window && null !== window && (b = new a(), window.JCD = window.JCD || {}, 
    window.JCD.draw = b.draw);
}.call(this);