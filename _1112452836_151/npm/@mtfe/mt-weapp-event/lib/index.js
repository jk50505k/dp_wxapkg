function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = exports.Event = function() {
    function n() {
        e(this, n), this._store = new Map();
    }
    return t(n, [ {
        key: "on",
        value: function(e, t) {
            "function" == typeof t && (this._store.has(e) ? this._store.get(e).push(t) : this._store.set(e, [ t ]));
        }
    }, {
        key: "emit",
        value: function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            if (this._store.has(e)) {
                var o = this._store.get(e);
                return Array.isArray(o) ? o.map(function(e) {
                    return e.apply(null, n);
                }) : void 0;
            }
        }
    }, {
        key: "off",
        value: function(e, t) {
            var n = this._store.get(e);
            if (n && n.length) {
                var r = n.indexOf(t);
                n.splice(r, 1);
            }
        }
    } ]), n;
}();

exports.default = new n();