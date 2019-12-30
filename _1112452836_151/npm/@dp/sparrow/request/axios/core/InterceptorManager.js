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
        e(this, t), this.handlers = [];
    }
    return n(t, [ {
        key: "use",
        value: function(e, n) {
            return void 0 === n && (n = function(e) {
                Promise.reject(e);
            }), this.handlers.push({
                fulfilled: e,
                rejected: n
            }), this.handlers.length - 1;
        }
    }, {
        key: "eject",
        value: function(e) {
            this.handlers[e] && (this.handlers[e] = null);
        }
    }, {
        key: "forEach",
        value: function(e) {
            this.handlers.map(function(n) {
                null !== n && e(n);
            });
        }
    } ]), t;
}();

exports.default = t;