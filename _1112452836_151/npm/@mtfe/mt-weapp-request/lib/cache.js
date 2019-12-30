Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCacheKey = exports.CacheType = void 0, exports.default = function(e) {
    var o = this, n = (0, r.wxPromisify)("getStorage", wx), c = {}, s = function(e) {
        return c[e.key] = e.data;
    };
    return function(r) {
        var u = r.cache, i = r.delay, d = void 0 === i ? 1e3 : i, h = r.cacheKey;
        if (u) {
            var f, p = void 0;
            p = "string" == typeof h ? h : (h || a)(o.config.env, r.url, r.data);
            var m = function() {
                var e = f, r = e.data, a = e.header, o = e.statusCode;
                200 === o && (u === t.mem ? s : wx.setStorage)({
                    key: p,
                    data: {
                        data: r,
                        header: a,
                        statusCode: o,
                        errMsg: f.errMsg
                    }
                });
            }, g = function(e) {
                (f = e).cacheKey = p, f.setCache = m;
            }, y = function a() {
                var n = f && (f.header.ETag || f.header.etag);
                return n && (r.header = r.header || {}, r.header["If-None-Match"] = n), e.call(o, r).then(function(e) {
                    return 304 === e.statusCode ? Object.assign(f.header, e.header) : (g(e), u === t.defer ? f.freshCache = a : m()), 
                    f;
                });
            };
            return (u === t.mem ? Promise.resolve(c[p]) : n({
                key: p
            }).catch(function(e) {
                console.log("[mt-weapp-request]: fail to fetch " + r.url + " cached, reason: " + e.errMsg + "!");
            }).then(function(e) {
                return e && e.data;
            })).then(function(e) {
                if (e) switch (g(e), u) {
                  case t.defer:
                    return f.freshCache = y, f.fromStorage = !0, f;

                  case t.store:
                    return setTimeout(y, d), f;

                  default:
                    return y();
                }
                return y();
            });
        }
        return e(r);
    };
};

var e = require("./common"), r = require("../../mt-weapp-utils/lib/wx-promisify.js"), t = exports.CacheType = void 0;

!function(e) {
    e.defer = "defer", e.mem = "mem", e.store = "store", e.check = "check";
}(t || (exports.CacheType = t = {}));

var a = exports.getCacheKey = function(r, t, a) {
    return "mtweapp_api_" + ((0, e.isProd)(r) ? "" : r + "_") + t + (0, e.getBodyStr)(a);
};