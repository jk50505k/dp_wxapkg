function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../wxp/index")), o = function() {
    function o() {
        e(this, o), this.info = void 0, this.promise = void 0;
    }
    return n(o, [ {
        key: "get",
        value: function() {
            var e = this;
            return this.promise ? this.promise : (this.promise = new Promise(function(n) {
                e.info ? n(e.info) : Promise.all([ t.default.getSystemInfo(), t.default.getNetworkType() ]).then(function(t) {
                    var o = t[0] || {}, r = t[1] || {};
                    if (o && r) {
                        var i = o.version, s = o.brand, a = o.model, f = o.platform, u = o.SDKVersion, l = o.system, c = r.networkType, p = "";
                        try {
                            p = l.split(" ")[1];
                        } catch (e) {}
                        var d = {
                            version: i,
                            SDKVersion: u,
                            brand: s,
                            model: a,
                            platform: f.indexOf("ios") > -1 ? "iOS" : "Android",
                            system: l,
                            networkType: c,
                            platformVersion: p
                        };
                        ~f.indexOf("windows") && (p = l.replace(/[^0-9]/gi, ""), d.platform = "windows", 
                        d.platformVersion = p), e.info = d;
                        try {
                            wx.onNetworkStatusChange(function(n) {
                                e.info && n && (e.info.networkType = n.networkType);
                            });
                        } catch (e) {}
                        n(d);
                    }
                }).catch(function() {
                    e.promise = void 0, n();
                });
            }), this.promise);
        }
    } ]), o;
}();

exports.default = new o();