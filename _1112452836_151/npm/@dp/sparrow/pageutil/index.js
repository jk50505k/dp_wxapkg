function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function r() {
        e(this, r);
    }
    return t(r, [ {
        key: "getCurrentPage",
        value: function() {
            var e = {};
            if ("function" == typeof getCurrentPages) {
                var t = getCurrentPages();
                e = t[t.length - 1];
            }
            return e;
        }
    }, {
        key: "getPageRoutes",
        value: function() {
            var e = {};
            if ("function" == typeof getCurrentPages) {
                var t = getCurrentPages();
                if (t && t.length) {
                    var r = "", n = [];
                    t.forEach(function(e, t) {
                        r += t + 1 + ":" + e.route + "; ", n.push(e.route);
                    }), e = {
                        text: r,
                        routes: n
                    };
                }
            }
            return e;
        }
    } ]), r;
}();

exports.default = new r();