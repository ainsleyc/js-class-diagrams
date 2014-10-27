(function() {
    var a, b, c;
    b = require("pegjs"), c = require("underscore"), a = function() {
        function a(a) {
            this.grammar = a, this.parser = b.buildParser(a);
        }
        return a.prototype.parse = function(a) {
            return this.parser.parse(a);
        }, a;
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a);
}).call(this), function() {
    var a;
    a = function() {
        function a() {}
        return a;
    }(), "undefined" != typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = a);
}.call(this);