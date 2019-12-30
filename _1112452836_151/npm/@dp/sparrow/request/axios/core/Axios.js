function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = function() {
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

var n = t(require("./InterceptorManager")), o = t(require("./dispatchRequest")), u = t(require("./mergeConfig")), i = t(require("./hookManager")), s = function() {
    function t(r) {
        e(this, t), this.defaults = r, this.interceptors = {
            request: new n.default(),
            response: new n.default()
        }, this.hookManager = new i.default(), this.request = this.request.bind(this);
    }
    return r(t, [ {
        key: "request",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.request, r = t;
            (r = (0, u.default)(this.defaults.config, r)).method = r.method ? r.method.toUpperCase() : "GET", 
            e.request = r, e.hookManager = this.hookManager;
            var n = [ o.default, void 0 ], i = Promise.resolve(e);
            for (this.interceptors.request.forEach(function(e) {
                n.unshift(e.fulfilled, e.rejected);
            }), this.interceptors.response.forEach(function(e) {
                n.push(e.fulfilled, e.rejected);
            }); n.length; ) i = i.then(n.shift(), n.shift());
            return i;
        }
    } ]), t;
}();

exports.default = s;