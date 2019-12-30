function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function t() {
        e(this, t), this.caches = {};
    }
    return n(t, [ {
        key: "add",
        value: function(e, n) {
            e && (this.caches[e] = n);
        }
    }, {
        key: "get",
        value: function(e) {
            return this.caches[e];
        }
    }, {
        key: "remove",
        value: function(e) {
            this.caches[e] = void 0;
        }
    } ]), t;
}();

exports.default = new t();