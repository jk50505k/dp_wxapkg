function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (null == e) return {};
    var r, n, o = i(e, t);
    if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
    }
    return o;
}

function i(e, t) {
    if (null == e) return {};
    var r, n, i = {}, o = Object.keys(e);
    for (n = 0; n < o.length; n++) r = o[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
    return i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VDOM = void 0;

var o = function() {
    function e(e, t) {
        var r = [], n = !0, i = !1, o = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            i = !0, o = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw o;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = function() {
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
}(), c = require("../../mt-weapp-jsvm/lib/index.js"), l = require("../../wxss-inline/lib/index.js"), u = require("./constants"), f = require("./importer"), h = /scroll\-view|swiper|movable\-view|cover-view|cover\-image/g, p = /^(snapshot|case|caseData|context|class|style|id|captureCatch|captureBind|bind|catch|data)/i;

exports.VDOM = function() {
    function i(e, t) {
        r(this, i), this.ctxPool = {}, this.wxsIntpl = {}, this.evMap = {}, this.coreProps = {}, 
        this.compInstance = e, this.coreViews = {}, this.renderId = 0, this.config = t.config, 
        this.tags = t.tags, this.evs = t.evs;
    }
    return s(i, [ {
        key: "setMeta",
        value: function(e) {
            this.meta = e, this.cross = e.project != this.config.project || e.env != this.config.env;
        }
    }, {
        key: "initWxs",
        value: function() {
            var e = this;
            Object.keys(this.wxs).forEach(function(r) {
                var n = (0, f.evalWxsFn)(e.config)({
                    module: r,
                    code: e.wxs[r]
                }, e.compInstance);
                (0, c.injectIntoScope)(e.scope, t({}, r, n));
            });
        }
    }, {
        key: "calc",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.scope, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.style;
            if (this.scope = t, this.renderId++, e) {
                var n = e.tag, i = e.attr, o = e.template, a = void 0 === o ? {} : o, s = e.wxs, c = void 0 === s ? {} : s;
                if (this.wxTpl = a, this.wxs = c, this.wxs && this.initWxs(), r && r.length > 0 && (i.wxss = r), 
                this.vnodes = [ n, i, this.inlineChildren(this.compInstance[u.COMP_INDEX] + "_0", e.children, t), "0" ], 
                r && r.length > 0) this.styleMap = (0, l.inlineWxss)(r, this.vnodes[2]); else {
                    this.styleMap = function(e) {
                        var t = {};
                        return function e(r) {
                            r[2] && r[2].forEach(function(r) {
                                r[2] && (t[r[3]] = r[1].style, e(r));
                            });
                        }(e), t;
                    }(this.vnodes);
                }
                this.trimNode(this.vnodes, 1, 1, null);
            }
        }
    }, {
        key: "inlineChildren",
        value: function(r, i, o, s, l) {
            var u = this, h = function(e, t) {
                if (e && "exp" === e.type) {
                    var r = e.value.map(function(e) {
                        if ("ast" === e.type) try {
                            return (0, c.getVm)().runInScope(t || o, e.value, {
                                ThrowVariableNotDefinedException: !1,
                                onError: function() {}
                            });
                        } catch (e) {
                            return null;
                        }
                        return e.value;
                    });
                    return r.length > 1 ? r.join("") : r[0];
                }
                return e;
            }, v = [];
            if (i && i.length) {
                var d = !1;
                i.forEach(function(i, m) {
                    if (i.tag) {
                        var y = i.attr, x = i.tag, w = Object.assign({}, s), b = {}, g = y.wxIf, j = y.wxElif, I = y.wxElse, k = y.wxFor, O = y.wxKey, S = n(y, [ "wxIf", "wxElif", "wxElse", "wxFor", "wxKey" ]), E = h(k);
                        if (k && !E) return;
                        var P = Object.keys(S), _ = function(e, r, n, i) {
                            if (P.forEach(function(t) {
                                (/^data.+/.test(t) ? n : e)[t] = h(y[t], r);
                            }), "wx-dynamic" === x) {
                                if (e.case && u.cross) {
                                    var o = e.case.split("|");
                                    1 === o.length && (o[1] = u.meta.project, o[2] = u.meta.env, e.case = o.join("|"));
                                }
                                P.forEach(function(r) {
                                    var n = void 0;
                                    p.test(r) ? (n = r.match(/(bind|catch):?(.+)/)) && (u.evMap[i + n[2]] = y[r]) : (Object.assign(e.context = e.context || {}, t({}, r, e[r])), 
                                    delete e[r]);
                                });
                            }
                            e.hidden && (e.style = (e.style || "") + "display:none;"), e.core && delete e.core;
                        };
                        switch (Object.prototype.toString.call(E)) {
                          case "[object String]":
                            E = E.split("");
                            break;

                          case "[object Number]":
                            E = [].concat(e(Array(E).keys()));
                            break;

                          case "[object Object]":
                            E = Object.keys(E).map(function(e) {
                                return E[e];
                            });
                        }
                        if (void 0 === k) {
                            if (g) {
                                if (!(d = h(g))) return void v.push([ "b" ]);
                            } else {
                                var C = j || I;
                                if (d) {
                                    if (C) return void v.push([ "b" ]);
                                } else if (j && !(d = h(C))) return void v.push([ "b" ]);
                            }
                            var T = r + "-" + m;
                            switch (_(b, null, w, T), u.ctxPool[T] = w, x) {
                              case "wx-import":
                                u.getImportTemplate(i.attr.src);
                                break;

                              case "wx-wxs":
                                var M = i.attr.module;
                                if (M) {
                                    var F = (0, f.evalWxsFn)(u.config)({
                                        src: i.attr.src,
                                        module: M,
                                        code: u.wxs[M]
                                    }, u.compInstance);
                                    (0, c.injectIntoScope)(u.scope, t({}, M, F));
                                }
                                break;

                              case "wx-template":
                                if (i.attr.is) {
                                    v = v.concat(u.injectTemplateChild(i, T, b, w, l, o));
                                    break;
                                }

                              default:
                                var A = [ x, b, [], T, O || "", l ];
                                u.markPropContext(A), A[2] = u.inlineChildren(T, i.children, o, w, A), v.push(A);
                            }
                        } else if (Array.isArray(E)) {
                            var N = S.wxForItem, D = S.wxForIndex;
                            E.forEach(function(e, n) {
                                if (null != e) {
                                    var p = {}, d = new c.Scope("function", o);
                                    if (d.var(N || "item", e), d.var(D || "index", n), !g || h(g, d)) {
                                        var y = "object" === (void 0 === e ? "undefined" : a(e)), w = Object.assign({}, s), b = r + "[" + m + "-" + n + "]";
                                        switch (y ? (e._wxfor_index_ = n, _(p, d, e, b)) : _(p, d, w, b), u.ctxPool[b] = y ? e : w, 
                                        x) {
                                          case "wx-import":
                                            u.getImportTemplate(i.attr.src);
                                            break;

                                          case "wx-wxs":
                                            var j = i.attr.module;
                                            if (j) {
                                                var I = (0, f.evalWxsFn)(u.config)({
                                                    src: i.attr.src,
                                                    module: j,
                                                    code: u.wxs[j]
                                                }, u.compInstance);
                                                (0, c.injectIntoScope)(u.scope, t({}, j, I));
                                            }
                                            break;

                                          case "wx-template":
                                            if (i.attr.is) {
                                                v = v.concat(u.injectTemplateChild(i, b, p, u.ctxPool[b], l, d));
                                                break;
                                            }

                                          default:
                                            var k = [ x, p, [], b, u.ctxPool[b][O] || "", l ];
                                            u.markPropContext(k), k[2] = u.inlineChildren(b, i.children, d, u.ctxPool[b], k), 
                                            v.push(k);
                                        }
                                    } else v.push([ "b" ]);
                                }
                            });
                        }
                    } else {
                        var W = h(i);
                        null != W && v.push([ "s", W ]);
                    }
                });
            }
            return v;
        }
    }, {
        key: "traverseTemplate",
        value: function(e) {
            var t = this;
            !function e(r) {
                "string" != typeof r && r.children && r.children.forEach(function(r) {
                    "string" != typeof r && ("wx-import" === r.tag && r.attr.src && t.getImportTemplate(r.attr.src), 
                    e(r));
                });
            }(e);
        }
    }, {
        key: "getImportTemplate",
        value: function(e) {
            var t = this, r = this.meta, n = (0, f.getUrlFromNameFn)(this.config)(e, r && r.project, r && r.env), i = (0, 
            f.getDataFromCacheSync)(n), o = i && i.dom && i.dom.template, a = i && i.dom;
            o && (this.traverseTemplate(a), Object.assign(this.wxTpl, o), i.dom.wxs && Object.keys(o).forEach(function(r) {
                t.wxsIntpl[r] = [ e + "_" + r, i.dom.wxs ];
            }));
        }
    }, {
        key: "injectTemplateChild",
        value: function(e, r, n, i, o, a) {
            var s = this, l = e.attr.is, u = this.wxTpl[l].children, h = new c.Scope("function", a), p = this.wxsIntpl[l];
            return p && Object.keys(p[1]).forEach(function(e) {
                var r = (0, f.evalWxsFn)(s.config)({
                    module: p[0],
                    code: p[1][e]
                }, s.compInstance);
                (0, c.injectIntoScope)(h, t({}, e, r));
            }), n.data && (0, c.injectIntoScope)(h, n.data), this.inlineChildren(r, u, h, i, o);
        }
    }, {
        key: "markPropContext",
        value: function(e) {
            e[0] && "wx-dynamic" === e[0] && e[1] && e[1].context && (this.coreProps[e[3]] = e[1].context, 
            e[1].context = {
                __s__: e[3],
                __idx__: this.compInstance[u.COMP_INDEX]
            });
        }
    }, {
        key: "trimNode",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = this, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, a = this.tags[e[0]];
            if (e.splice(5, 1), a && (e[0] = a[0] || "other", e[2])) {
                var s = e[1];
                if (a[1]) {
                    var c = o(a[1], 2), l = c[0], u = c[1], f = {};
                    for (var p in s) {
                        var v = this.evs[p] || u[p];
                        v ? (f[v] = "d", f[p] = s[p]) : (v = l[p]) ? f[v] = s[p] : f[p] = s[p];
                    }
                    e[1] = f;
                } else for (var d in s) {
                    var m = this.evs[d];
                    m && (s[m] = "d");
                }
                if (this.oldStyleMap && this.oldStyleMap[e[3]] !== this.styleMap[e[3]] && (e[1].rid = s.rid = this.renderId), 
                e[0] !== this.tags["wx-body"][0]) if (n > 15) if (e[0] === this.tags["wx-view"][0]) n = t = 1, 
                e[1].core = !0, i = e; else {
                    if (null == i || t > 15) throw new Error("必须在当前节点插入view, dom: " + JSON.stringify(e) + "！");
                    i[1].core = !0, n = ++t;
                } else e[0] === this.tags["wx-view"][0] ? e[1].id ? (n = t = 1, e[1].core = !0, 
                i = e) : (e[1].core = !1, t = 1, n++, i = e) : h.test(e[0]) && i && t <= 15 ? (i[1].core = !0, 
                n = ++t) : (t++, n++);
                e[2].forEach(function(e) {
                    r.trimNode(e, t, n, i);
                });
            }
        }
    } ]), i;
}();