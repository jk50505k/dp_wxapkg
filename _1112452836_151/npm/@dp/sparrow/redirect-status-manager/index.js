function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

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
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function n() {
        e(this, n), this.hasRedirected = !1;
    }
    return t(n, [ {
        key: "setRedirectStatus",
        value: function(e) {
            this.hasRedirected = e;
        }
    }, {
        key: "getRedirectStatus",
        value: function() {
            return this.hasRedirected;
        }
    }, {
        key: "initRedirectStatus",
        value: function() {
            this.hasRedirected = !1;
        }
    } ]), n;
}(), r = new n();

r.RedirectStatusManger = n, exports.default = r;