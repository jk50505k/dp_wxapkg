function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.$import = exports.$require = exports.getImportHandlerFn = exports.evalModuleFn = exports.evalWxsFn = exports.evalData = exports.getData = exports.getDataFromStorage = exports.getDataFromCacheSync = exports.getDataFromCache = exports.getDataFromUrl = exports.cleanMemData = exports.cacheDataToMemFn = exports.depData = exports.getUrlFromNameFn = void 0;

var r = function() {
    function e(e, r) {
        var t = [], o = !0, n = !1, a = void 0;
        try {
            for (var u, s = e[Symbol.iterator](); !(o = (u = s.next()).done) && (t.push(u.value), 
            !r || t.length !== r); o = !0) ;
        } catch (e) {
            n = !0, a = e;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (n) throw a;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = e(require("./config")), o = require("../../mt-weapp-utils/lib/func.js"), n = require("../../mt-weapp-request/lib/request.js"), a = require("../../mt-weapp-request/lib/cache.js"), u = e(a), s = e(require("../../mt-weapp-utils/lib/pipe.js")), c = e(require("../../mt-weapp-request/lib/retry.js")), i = require("./error"), p = require("../../mt-weapp-jsvm/lib/index.js"), l = require("./constants"), f = require("./log"), m = (0, 
n.getRequest)(function(e) {
    return t.default.request(e);
}, {
    throwError: !0
}, (0, s.default)(c.default, u.default)), x = exports.getUrlFromNameFn = function(e) {
    return function(t, o, n) {
        var a = t.split("|"), u = r(a, 3), s = u[0], c = u[1], i = u[2], p = c || o || e.project, l = null == i ? n || e.env || "" : 0 === i.indexOf("pro") ? "" : i;
        return {
            name: s,
            project: p,
            env: l,
            url: "https://portal-portm.meituan.com/weapp/dynamic/v6/" + p + "/" + s + (l ? "/" + l : "")
        };
    };
}, d = exports.depData = new Map(), h = exports.cacheDataToMemFn = function(e) {
    return function(r, t) {
        d.set(t.url, r);
        var o = r.dep, n = r.prefetch;
        o && Object.keys(o).forEach(function(r) {
            d.set(x(e)(r, t.project, t.env).url, o[r]);
        }), n && setTimeout(function() {
            n.names.forEach(function(r) {
                return w(e)(x(e)(r, t.project, t.env));
            });
        }, n.delay || 0);
    };
}, v = (exports.cleanMemData = function(e) {
    d.delete(e);
}, exports.getDataFromUrl = (0, o.cached)((0, f.log)("[Async][Request]", function(e, r, t) {
    var n = e.url, u = m({
        url: n,
        cache: a.CacheType.defer
    }).then(function(r) {
        if (v.cache.delete(n), r) {
            var a = r.data, u = r.header;
            if (!a) throw new Error("Caster data error: " + n);
            h(t)(a, e);
            var s = function(e) {
                a.cache === l.CACHE_OPTION.NEVER ? e.cacheKey && wx.removeStorage({
                    key: e.cacheKey
                }) : e.setCache && e.setCache();
            };
            if (r.freshCache && r.fromStorage) {
                var c = function() {
                    return r.freshCache().catch(o.noop).then(function(r) {
                        var o = r && r.data;
                        return o && o.hash && (s(r), o.hash !== a.hash && h(t)(o, e)), o || a;
                    });
                }, i = u.Date || u.date;
                if (i && Date.now() - Number(new Date(i)) > (a.expire || 2592e5)) return c();
                setTimeout(c, 2e3);
            } else s(r), a.isCold = !0;
            return a;
        }
    });
    return r ? u.catch(function(e) {
        v.cache.delete(n), (0, i.getErrorHandler)(l.ErrorTypes.request, r)(e);
    }) : u;
}), function(e) {
    return e.url;
})), g = exports.getDataFromCache = (0, f.log)("[Async][Mem]", function(e) {
    var r = d.get(e.url);
    return r.isCold = !1, Promise.resolve(r);
}), y = (exports.getDataFromCacheSync = (0, f.log)("[Sync][Mem]", function(e) {
    return d.get(e.url);
}), exports.getDataFromStorage = (0, f.log)("[Sync][Storage]", function(e) {
    var r = e.url;
    if (d.has(r)) return d.get(r);
    var t = wx.getStorageSync((0, a.getCacheKey)("", r, null));
    return t ? t.data : void 0;
})), w = exports.getData = function(e) {
    return function(r, t) {
        return (d.has(r.url) ? g : v)(r, t, e).then(function(e) {
            return t && (t.hash = e.hash, t.isCold = e.isCold), e;
        });
    };
}, j = exports.evalData = function(e, r, t) {
    var o = e.jscode, n = e.json, a = e.dom, u = e.style;
    return (0, p.injectIntoScope)(r, n), a && t && (t[l.TPL] = a), u && (t[l.WXSS] = u), 
    o && (0, p.getVm)().runInScope(r, o, {
        ThrowVariableNotDefinedException: !1,
        onError: function(e) {
            (0, i.getErrorHandler)(l.ErrorTypes.jsvm, t)(e);
        }
    }), r;
}, q = function(e) {
    return function(r, t) {
        var o = {
            exports: {}
        }, n = (0, p.getVm)(), a = (0, p.getScope)({
            module: o,
            $require: function(r) {
                return E(e)({
                    src: r
                }, t);
            },
            exports: o.exports,
            getRegExp: function(e, r) {
                return new RegExp(e, r);
            }
        });
        return n.runInScope(a, r, {
            ThrowVariableNotDefinedException: !1,
            onError: function(e) {
                (0, i.getErrorHandler)(l.ErrorTypes.jsvm, t)(e);
            }
        }), a;
    };
}, D = {}, E = exports.evalWxsFn = function(e) {
    return function(r, t) {
        var o = r.module, n = r.src, a = r.code;
        if (!n && o && a) return t.wxs[o] || (t.wxs[o] = q(e)(a, t).module.value.exports), 
        t.wxs[o];
        var u = x(e)(n, t.__meta && t.__meta.project, t.__meta && t.__meta.env);
        if (!D[u.url]) {
            var s = y(u);
            s.wxs_mod && (D[u.url] = q(e)(s.wxs_mod, t).module.value.exports);
        }
        return D[u.url];
    };
}, F = exports.evalModuleFn = function e(r) {
    return function(t) {
        return function(o) {
            var n = o.jscode || o, a = {
                exports: t.exports || {},
                __info: t
            }, u = M(r)(t.meta, !1), s = M(r)(t.meta, !0);
            return u.extMods = s.extMods = t.extMods, j({
                jscode: n
            }, (0, p.getScope)(Object.assign({
                module: a,
                $import: u,
                $require: s,
                $eval: e(r)(t),
                exports: a.exports
            }, r.injections, t.extMods)), t).module.value.exports;
        };
    };
}, S = {}, M = exports.getImportHandlerFn = function(e) {
    return function(r, t) {
        r = r || {};
        var o = function(t) {
            return x(e)(t, r.project, r.env);
        }, n = t ? function(r, t) {
            var a = o(r), u = a.url;
            if (S[u]) return S[u].exports;
            var s = {
                name: r,
                meta: a,
                extMods: n.extMods,
                exports: {}
            }, c = y(a);
            return c || (0, i.getErrorHandler)(l.ErrorTypes.request, s)(new Error("You should cache it before $require it!"), t), 
            S[u] = s, S[u].exports = F(e)(s)(c);
        } : function(r) {
            var t = o(r), a = t.url;
            if (S[a]) return Promise.resolve(S[a].prom || S[a].exports);
            var u = S[a] = {
                name: r,
                meta: t,
                extMods: n.extMods,
                exports: {}
            };
            return S[a].prom = w(e)(t, u).then(function(r) {
                return S[a].prom = null, S[a].exports = F(e)(u)(r);
            });
        };
        return n.cache = S, n.getUrl = o, n.refreshCache = function(r) {
            return v(o(r), {}, e);
        }, n;
    };
};

exports.$require = M(t.default)(void 0, !0), exports.$import = M(t.default)();