function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function n() {
        e(this, n);
    }
    return r(n, [ {
        key: "compare",
        value: function(e, r) {
            e = e.split("."), r = r.split(".");
            for (var n = Math.max(e.length, r.length); e.length < n; ) e.push("0");
            for (;r.length < n; ) r.push("0");
            for (var t = 0; t < n; t++) {
                var a = parseInt(e[t]), o = parseInt(r[t]);
                if (a > o) return 1;
                if (a < o) return -1;
            }
            return 0;
        }
    } ]), n;
}();

exports.default = new n();