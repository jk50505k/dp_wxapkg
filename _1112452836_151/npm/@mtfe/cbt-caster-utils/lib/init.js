function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function r(e, t) {
    var r = Object.keys(e);
    return Object.getOwnPropertySymbols && r.push.apply(r, Object.getOwnPropertySymbols(e)), 
    t && (r = r.filter(function(t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), r;
}

function n(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? r(n, !0).forEach(function(t) {
            i(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(n).forEach(function(t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
    }
    return e;
}

function i(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getDynamicCompOpt = exports.debounce = exports.bindPage = exports.initCompCtx = exports.nextTick = exports.pageMissLifes = exports.compLifes = void 0;

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("../../mt-weapp-jsvm/lib/index.js"), s = require("./constants"), c = require("../../mt-weapp-vuex/lib/index.js"), p = require("./importer"), u = require("./diff"), l = require("./error"), f = require("./vdom"), d = require("../../mt-weapp-polling/lib/index.js"), h = require("../../mt-weapp-utils/lib/func.js"), v = require("./merge"), _ = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./config")), g = require("./reporter"), m = {}, y = {}, b = 0, O = exports.compLifes = [ "created", "attached", "ready", "moved" ], D = exports.pageMissLifes = [ "onLoad", "onShow" ], E = exports.nextTick = wx.nextTick || setTimeout;

_.default.optimizer && setTimeout(function() {
    (0, p.$import)(_.default.optimizer);
}, 5e3);

var P = exports.initCompCtx = function(e) {
    void 0 === e[s.COMP_INDEX] && (e[s.COMP_INDEX] = b++, m[e[s.COMP_INDEX]] = {}, y[e[s.COMP_INDEX]] = null);
}, x = exports.bindPage = function(e) {
    if (!e[s.PAGE]) {
        var t = getCurrentPages(), r = t.length;
        if (r) {
            var n = e[s.PAGE] = t[r - 1];
            n.isIndex = 1 === r, n[s.STORE] || (n[s.STORE] = new c.Store());
        }
    }
    return e[s.PAGE];
}, C = exports.debounce = function(e, r, n) {
    var i = null, a = [];
    return function(o, s) {
        i && (clearTimeout(i), i = null), a = a.concat(s), i = setTimeout(function() {
            var r = [].concat(t(a));
            a.length = 0, e(o, function() {
                r.forEach(function(e) {
                    e.call(n);
                });
            }), i = null;
        }, r);
    };
}, S = new d.Polling(1e4), j = [], M = function() {
    var e = [].concat(j);
    j.length = 0, (_.default.reporter || g.defaultReport)(e);
};

wx.onAppHide && wx.onAppHide(M), S.register(M);

exports.getDynamicCompOpt = function() {
    function r(e, t) {
        e && !t && this.init();
    }
    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _.default, d = arguments[1], g = {
        options: {
            multipleSlots: !0
        },
        properties: {
            case: {
                type: String,
                observer: r
            },
            caseData: {
                type: Object,
                observer: r
            },
            snapshot: {
                type: Object,
                observer: function(e) {
                    var t = this;
                    e && setTimeout(function() {
                        if (!t[s.V_DOM]) {
                            var r = e.config, n = e.context;
                            r && t.setData({
                                config: r
                            }), n && (t[s.SCOPE] = n);
                        }
                    }, e.delay || 0);
                }
            },
            context: {
                type: null,
                observer: function(e, t) {
                    "string" != typeof e && null != e && e.__s__ ? (this.__idx__ && this.__s__ || (this.__idx__ = e.__idx__, 
                    this.__s__ = e.__s__), m[e.__idx__] && this.setContext(m[e.__idx__][e.__s__], t)) : this.setContext(e, t);
                }
            },
            config: {
                type: null
            },
            mode: {
                type: String
            },
            coreView: {
                type: null,
                observer: function(e) {
                    var t = this;
                    e[1] && e[1][s.COMP_INDEX] && y[e[1][s.COMP_INDEX].comp][e[3]] && (e = y[e[1][s.COMP_INDEX].comp][e[3]]);
                    var r = (0, u.diff)(e, this.data.config, "config");
                    Object.keys(r).length && this.setData(r), E(function() {
                        t.triggerEvent("life", {
                            instance: t
                        });
                    });
                }
            }
        },
        methods: {
            setContext: function(e, t) {
                "string" == typeof e ? e !== t && (e = JSON.parse(e || "{}"), this.setProps(e)) : null != e && this.setProps(e);
            },
            propsCheck: function(e) {
                var t = this, r = this.$properties, n = function() {};
                return r ? Object.keys(r).reduce(function(n, i) {
                    var o = e[i], c = r[i], p = c && c.value, u = void 0 === c ? "undefined" : a(c);
                    if ("function" === u) void 0 !== o && null !== o && o.constructor !== c && (e[i] = c(o)); else if (c && "object" === u && void 0 !== o && (c.type && "function" == typeof c.type && null !== o && o.constructor !== c.type && (o = e[i] = c.type(o)), 
                    c.value = o, c.observer && o !== p)) {
                        var l = t[s.SCOPE].__get__ ? t[s.SCOPE].__get__("this") : t[s.SCOPE], f = a(c.observer);
                        return function() {
                            n(), "string" === f ? l[c.observer] && l[c.observer].call(l, o, p) : "function" === f && c.observer.call(l, o, p);
                        };
                    }
                    return n;
                }, n) : n;
            },
            setProps: function(e) {
                try {
                    if (this[s.SCOPE]) {
                        var t = this.propsCheck(e);
                        this[s.SCOPE].setData.value(e), t && t();
                    } else this._props = Object.assign({}, this._props, e);
                } catch (e) {
                    (0, l.getErrorHandler)(s.ErrorTypes.context, this, "You should set component context as an object!!!")(e);
                }
            },
            casterEvent: function(e) {
                var t = e.detail, r = t.name, n = t.data, i = t.sel;
                e.detail = n;
                var a = this[s.V_DOM];
                if (a) {
                    var o = a.evMap[i + r];
                    o && this.onBind({
                        detail: {
                            name: o,
                            event: e,
                            dataset: {}
                        }
                    });
                } else this.triggerEvent("bind", {
                    name: r,
                    event: e,
                    sel: i,
                    dataset: {}
                });
            },
            d: function(e) {
                var t = e.currentTarget, r = e.target, n = e.type, i = (t || r).dataset, a = i.attr, o = a && (a["catch" + n] || a["bind" + n]);
                o && this.onBind({
                    detail: {
                        name: o,
                        event: e,
                        dataset: i,
                        isCatch: !!a["catch" + n]
                    }
                });
            },
            onBind: function(e) {
                var t = this, r = e.detail, n = this.$$context;
                if (!this.properties.snapshot || this.$$vdom || n) if (n) {
                    var i = n.__get__ ? n.__get__("this") : n, a = r.name, o = r.event, c = r.dataset, p = r.isCatch, u = r.sel;
                    try {
                        var f = o.target.dataset.selector, d = i[a] || n[a] || this[s.V_DOM].evMap[u + a] && i[this[s.V_DOM].evMap[u + a]], h = this.$$currentEvent;
                        if (h && o) {
                            if (h.timeStamp == o.timeStamp && h.type == o.type && h.stop) return;
                            h.timeStamp === o.timeStamp && h.type === o.type || (this.$$currentEvent = {
                                timeStamp: o.timeStamp,
                                type: o.type,
                                stop: !1,
                                selector: f
                            });
                        }
                        if (p && o && (this.$$currentEvent = {
                            timeStamp: o.timeStamp,
                            type: o.type,
                            stop: !0,
                            selector: f
                        }), d) {
                            var v = c.selector;
                            this.bindDataset(v, c), f === c.selector ? o.target.dataset = c : this.bindDataset(f, o.target.dataset);
                            var _ = o.detail;
                            _ && _.target && _.target.dataset && _.target.dataset.selector && this.bindDataset(_.target.dataset.selector, _.target.dataset), 
                            d.value ? d.value.call(i, o, c) : d.call(i, o, c);
                        }
                    } catch (e) {
                        (0, l.getErrorHandler)(s.ErrorTypes.callback, this, "eventName: " + a + ";")(e);
                    }
                } else this.triggerEvent("bind", r); else this.$cached_actions || (this.$cached_actions = []), 
                this.$cached_actions.push(function() {
                    t.onBind({
                        detail: r
                    });
                });
            },
            bindDataset: function(e, t) {
                var r = t.param = this[s.V_DOM] && this[s.V_DOM].ctxPool[e] || t.ctx;
                return r && Object.keys(r).forEach(function(e) {
                    if (0 === e.indexOf("data")) {
                        var n = e.slice(4);
                        t.attr[e] = t[n[0].toLowerCase() + n.slice(1)] = r[e];
                    }
                }), t;
            },
            onLifeCycle: function(e) {
                var t = e.detail, r = t.instance, n = r.id;
                n && (this.children ? this.children[n] = r : this.triggerEvent("life", t));
            },
            init: function() {
                var r = this;
                P(this), this.childProps = {}, this.children = {}, this.wxs = {};
                var c, _, g, b, E, S = this.properties.caseData, M = this, w = Date.now(), $ = {}, I = function(e) {
                    M.name = g = e.replace(/:/g, "|");
                };
                I(this.properties.case || S && S.name);
                var T = function() {
                    if (S) return (0, p.cacheDataToMemFn)(i)(S, {
                        url: g
                    }), Promise.resolve(S);
                    var e = (0, p.getUrlFromNameFn)(i)(g);
                    return M.__meta = e, q.setMeta(e), (0, p.getData)(i)(e, M);
                }, k = M.$cached_actions || [], q = new f.VDOM(M, n({}, d, {
                    config: i
                })), N = function(e, t, r) {
                    var n = Date.now();
                    $.ready = n - w, $.calc = r - t, $.setdata = n - r, j.push({
                        meta: M.__meta,
                        perf: $,
                        hash: M.hash
                    }), (N = function(e, t) {
                        if (i.debug && t) {
                            var r = Date.now() - t;
                            console.log("Dynamic comp [" + g + "] setData completely, spend: " + r + " ms");
                        }
                        e && e.length && e.forEach(function(e) {
                            e && e.call(_);
                        });
                    })(e, t);
                }, V = function() {
                    var e = Date.now();
                    q.calc(M[s.TPL], b || c, M[s.WXSS]);
                    var r = [];
                    y[M[s.COMP_INDEX]] && Object.keys(q.coreViews).map(function(e) {
                        var t = (0, u.diff)(q.coreViews[e], y[M[s.COMP_INDEX]][e], "config");
                        !Object.keys(t).length && r.push(e);
                    }), m[M[s.COMP_INDEX]] = q.coreProps, y[M[s.COMP_INDEX]] = q.coreViews;
                    var n = [].concat(t(k));
                    k.length = 0;
                    var i = Date.now(), a = function() {
                        return N(n, e, i);
                    }, o = M.data && M.data.config;
                    if (o) {
                        var p = (0, u.diff)(q.vnodes, o, "config", r);
                        Object.keys(p).length ? E(p, function() {
                            q.oldStyleMap = q.styleMap, a.call(_);
                        }) : a();
                    } else M.setData({
                        config: q.vnodes
                    }, a), q.oldStyleMap = q.styleMap;
                }, X = (0, h.throttle)(function() {
                    X = V, E = C(M.setData.bind(M), 0, _), V();
                }, 0), A = function(e, t) {
                    (0, v.mergeObj)(_.data || (_.data = {}), e), _.properties = _.data, b ? (0, o.injectIntoScope)(b, _.data) : (0, 
                    o.injectIntoScope)(c, Object.assign({
                        data: _.data
                    }, _.data)), t && k.push(t), X(), M[s.V_DOM] = q;
                }, R = M.$reload = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : g, t = void 0;
                    if ("string" != typeof e) t = Promise.resolve(e); else {
                        I(e);
                        var r = (0, p.getUrlFromNameFn)(i)(e);
                        (0, p.cleanMemData)(r.url), t = (0, p.getData)(i)(r, e === g && M);
                    }
                    return _ ? t.then(function(e) {
                        M[s.V_DOM] = null, M.setData({
                            config: null
                        }), (0, p.evalData)(e, c, M), M[s.V_DOM] || A();
                    }) : (S = null, F());
                }, F = function() {
                    return T().then(function(t) {
                        if (t) {
                            var n = Date.now();
                            $.load = n - w;
                            var u = x(M), l = u[s.STORE], f = Object.create(l);
                            f.register = function(e) {
                                l.register.call(l, e, M);
                            };
                            !function() {
                                var t, n = getApp(), l = function(e) {
                                    Object.assign(_, e), (0, o.injectIntoScope)(c, e), b = r[s.VIEW_SCOPE] = new o.Scope("function", c), 
                                    (0, o.injectIntoScope)(b, e.data);
                                };
                                e(t = {
                                    require: i.pageRequire && i.pageRequire[u.route] || d.require,
                                    app: n,
                                    $app: n,
                                    page: u,
                                    $page: u
                                }, s.STORE, f), e(t, "comp", M), e(t, "$comp", M), e(t, "$reload", R), e(t, "$eval", (0, 
                                p.evalModuleFn)(i)({})), e(t, "createIntersectionObserver", M.createIntersectionObserver.bind(M)), 
                                e(t, "selectComponent", function(e) {
                                    var t = M.selectComponent(e);
                                    if (t && t[s.SCOPE]) return t[s.SCOPE].__get__("this");
                                }), e(t, "$import", (0, p.getImportHandlerFn)(i)(M.__meta)), e(t, "$require", (0, 
                                p.getImportHandlerFn)(i)(M.__meta, !0)), e(t, "triggerEvent", function(e, t, r) {
                                    M.triggerEvent("casterevproxy", {
                                        name: e,
                                        data: t,
                                        sel: M.__s__
                                    }, r), M.__idx__ && m[M.__idx__] && M.setContext(m[M.__idx__][M.__s__]);
                                }), e(t, "Component", function(e) {
                                    var t = e.data, n = e.lifetimes, i = void 0 === n ? e : n, o = e.properties, s = {};
                                    M.$properties = o, o && Object.keys(o).forEach(function(e) {
                                        var t = o[e];
                                        "object" === (void 0 === t ? "undefined" : a(t)) && t && t.value && (s[e] = t.value);
                                    });
                                    var c = M._props && r.propsCheck(M._props);
                                    Object.assign(s, M._props, t);
                                    var p = Object.assign({
                                        data: s
                                    }, e.methods);
                                    O.forEach(function(e) {
                                        var t = i[e];
                                        t && (M[e] = p[e] = t.bind(_));
                                    }), l(p), _.properties = _.data, k.push(_.ready), _.created && _.created.call(_), 
                                    c && c(), _.attached && _.attached.call(_);
                                }), e(t, "Page", function(e) {
                                    var t = {
                                        data: e.data
                                    };
                                    Object.keys(e).forEach(function(r) {
                                        var n = e[r];
                                        "function" == typeof n ? u[r] = t[r] = n.bind(_) : t[r] = n;
                                    }), u.$rootComp = M, l(t), _.onReady && (k.push(_.onReady), u.onReady = function() {}), 
                                    D.forEach(function(e) {
                                        _[e] && _[e].call(_, u.options);
                                    });
                                }), e(t, "setData", A), _ = t, Object.assign(_, i.injections, M._props, r[s.SCOPE]), 
                                (c = r[s.SCOPE] = (0, o.getScope)(_)).const("this", _);
                            }(), (0, p.evalData)(t, c, M), $.eval = Date.now() - n, M[s.V_DOM] || r.properties.snapshot || _.setData();
                        }
                    }).catch(function(e) {
                        e.caught || (0, l.getErrorHandler)(s.ErrorTypes.unknow, M)(e);
                    });
                };
                F();
            }
        }
    };
    return g.detached = function() {
        void 0 !== this[s.COMP_INDEX] && (m[this[s.COMP_INDEX]] = null), this[c.storeKey] && this[c.storeKey].clean(this), 
        this.detached && this.detached();
    }, g.moved = function() {
        this.moved && this.moved();
    }, g;
};