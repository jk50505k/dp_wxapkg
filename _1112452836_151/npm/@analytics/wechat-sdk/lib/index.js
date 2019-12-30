function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == yt(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : yt(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : yt(t);
    })(e);
}

function e(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function n(e) {
    return t(e);
}

function r(t, e) {
    return n(t) === e;
}

function i(t) {
    return r(t, "number");
}

function a(t) {
    return t && r(t, "string");
}

function o(t) {
    return t && "[object Object]" === wt.call(t);
}

function s() {
    return new Date() - 0;
}

function c(t) {
    if (!t) return !1;
    var e = t.length;
    return !!Ct(t) || !!(t && i(e) && 0 <= e) && (!o(t) || !(1 < e) || e - 1 in t);
}

function u(t, e, n) {
    if (t) {
        var r, i, a;
        if (c(t)) for (i = 0, a = t.length; i < a && !1 !== e.call(n, t[i], i, t); i++) ; else for (r in t) if (Tt.call(t, r) && !1 === e.call(n, t[r], r, t)) break;
    }
}

function f(t, e, n) {
    var r, i = !0 === t;
    return i || (n = e, e = t), e && o(e) || (e = {}), n && o(n) || (n = {}), u(n, function(t, a) {
        i && o(n[a]) ? (r = o(e[a]) ? e[a] = e[a] || {} : e[a] = {}, f(i, r, n[a])) : e[a] = n[a];
    }), e;
}

function l(t, e, n) {
    var r = [];
    return c(t) && u(t, function(t) {
        r.push(e ? e.call(n, t) : t);
    }, n), r;
}

function v() {
    return 65535 * Math.random();
}

function d() {
    return Math.ceil(v()).toString(16);
}

function h() {
    l(arguments).unshift("[LX SDK]");
}

function g() {
    l(arguments).unshift("[LX SDK]");
}

function p() {
    return s().toString(16) + "-" + d() + "-" + d();
}

function m(t, e) {
    try {
        pt.setStorageSync(St + t, e);
    } catch (t) {
        h("setCache error :", t);
    }
}

function y(t) {
    try {
        return pt.getStorageSync(St + t);
    } catch (t) {
        return h("getCache error :", t), xt;
    }
}

function _(t) {
    try {
        pt.removeStorageSync(St + t);
    } catch (t) {
        h("removeCache error: ", t);
    }
}

function x(t) {
    var e = Math;
    return e.ceil(e.min(1e3 * (.5 + e.random()) * e.pow(2, t), 15e3));
}

function b(t, e) {
    var r = /^((\d+\.)+\d+).*$/;
    if ("string" === n(t) && "string" === n(e) && r.test(t) && r.test(e)) {
        for (var i = t.replace(r, "$1").split("."), a = e.replace(r, "$1").split("."), o = 0, s = Math.max(i.length, a.length); o < s; o++) {
            i[o] && a[o] || (!i[o] && i || !a[o] && a).push("0");
            var c = i[o].toString().length, u = a[o].toString().length;
            if (c !== u) {
                var f = u < c ? a : i;
                f[o] = Array(Math.abs(c - u) + 1).join("0") + f[o].toString();
            }
        }
        var l = parseInt(i.join("")), v = parseInt(a.join(""));
        return l === v ? 0 : v < l ? 1 : -1;
    }
}

function w(t) {
    var e, n, r, i, a, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = 0, c = 0, u = "", f = [];
    if (!t) return t;
    for (t = T(t); e = (a = t.charCodeAt(s++) << 16 | t.charCodeAt(s++) << 8 | t.charCodeAt(s++)) >> 18 & 63, 
    n = a >> 12 & 63, r = a >> 6 & 63, i = 63 & a, f[c++] = o.charAt(e) + o.charAt(n) + o.charAt(r) + o.charAt(i), 
    s < t.length; ) ;
    switch (u = f.join(""), t.length % 3) {
      case 1:
        u = u.slice(0, -2) + "==";
        break;

      case 2:
        u = u.slice(0, -1) + "=";
    }
    return u;
}

function T(t) {
    var e, n, r, i, a = "";
    for (e = n = 0, r = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, 
    i = 0; i < r; i++) {
        var o = t.charCodeAt(i), s = null;
        o < 128 ? n++ : s = 127 < o && o < 2048 ? String.fromCharCode(o >> 6 | 192, 63 & o | 128) : String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, 63 & o | 128), 
        null !== s && (e < n && (a += t.substring(e, n)), a += s, e = n = i + 1);
    }
    return e < n && (a += t.substring(e, t.length)), a;
}

function S() {
    if ("undefined" == typeof mmp || "undefined" == typeof requirePrivate) return !1;
    var t = requirePrivate("lx");
    return t && t.requireUpdate;
}

function C() {
    return new Promise(function(t) {
        var e = !1;
        setTimeout(function() {
            e || t({});
        }, 100), wx.getLxEnvironment({
            success: function() {
                var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, r = n.env, i = n.tag;
                e = !0, t(r ? {
                    nativeEnv: r,
                    nativeTag: i,
                    type: "old"
                } : {});
            }
        });
    });
}

function k() {
    return S() ? Promise.all([ Ht("getEnv"), Ht("getTag") ]).then(function(t) {
        var e = t[0], n = t[1];
        return e ? Promise.resolve({
            nativeEnv: e,
            nativeTag: n
        }) : wx.getLxEnvironment ? C() : Promise.resolve({});
    }) : wx.getLxEnvironment ? C() : Promise.resolve({});
}

function P(t) {
    try {
        var e = pt.getSystemInfoSync(), n = "MicroMessenger" + mt + "A (" + e.model + "; " + e.system + "; " + e.pixelRatio + "dpr; language/" + e.language + ") " + e.platform + "/" + e.version + " NetType/";
        Zt.ct = e.platform.toLowerCase(), Zt.os = e.system, Zt.sc = e.screenWidth + "*" + e.screenHeight, 
        Zt.ua = n, Yt = e;
    } catch (e) {
        Zt.ua = Zt.ct = Zt.os = Zt.sc = "";
    }
    return new Promise(function(e) {
        var n = y("wxid"), r = y("wxunionid");
        n && (Zt.wxid = n), r && (Zt.wxunionid = r), k().then(function(n) {
            var r = n.nativeEnv, i = n.nativeTag;
            "old" === n.type ? u(r || {}, function(e, n) {
                t.set(n, e);
            }) : r && L(r), i && Gt({
                lx: t
            }, i), e(Zt);
        });
    }).then(function() {
        var t = kt.hasBuiltRTTEnv ? Zt[Kt] : Zt;
        return new Promise(function(e) {
            try {
                pt.getNetworkType({
                    success: function(n) {
                        t.net = n.networkType.toUpperCase(), t.ua = t.ua.replace(/(NetType\/).*/, "$1" + n.networkType.toUpperCase()), 
                        e(t);
                    },
                    fail: function() {
                        e(t);
                    }
                });
            } catch (n) {
                e(t);
            }
        });
    });
}

function q(t, e) {
    delete (kt.hasBuiltRTTEnv ? Zt[Kt] : Zt)[t], e && delete Zt[t];
}

function A(t, e, n) {
    var r = kt.hasBuiltRTTEnv ? Zt[Kt] : Zt;
    r[t] !== e && (-1 < te.indexOf(t) || (Wt === t && (e = "data_sdk_" + e, Zt[t] = e), 
    "wxid" !== t && "wxunionid" !== t || m(t, e), "msid" === t && Zt.scene && q("scene"), 
    r[t] = e, n && n({})));
}

function O(t, e) {
    var n = kt.hasBuiltRTTEnv ? Zt[Kt] : Zt;
    return n = e ? Zt : n, t ? n[t] : n;
}

function I(t) {
    if (kt.hasBuiltRTTEnv && Zt[Kt] && o(t)) {
        var e = Zt[Kt][Wt];
        for (var n in t) t[n] && (Zt[n] = t[n]);
        Zt[Wt] = e;
    }
}

function L(t) {
    if (!kt.hasBuiltRTTEnv) {
        var e = {}, n = Zt[Wt];
        for (var r in t = t || {}, Zt) e[r] = Zt[r], zt.includes(r) && (t[r] = Zt[r]), delete Zt[r];
        for (var i in Zt[Kt] = e, t) t[i] && (Zt[i] = t[i]);
        Zt[Wt] = n, kt.hasBuiltRTTEnv = !0;
    }
}

function M() {
    var t = [], e = s();
    return t.push(e.toString(16)), t.push(d()), t.push(d()), t.push(d()), t.join("-");
}

function E(t, e) {
    e ? ce[t] = e : delete ce[t];
}

function j(t) {
    return t ? ce[t] : ce;
}

function D(t, e, n) {
    if (e === jt) {
        if (n <= ue) return n++, void setTimeout(function() {
            J(t, pe, e, n);
        }, x(n));
        pe = [], clearTimeout(ye), ye = null, F(t, jt);
    } else {
        if (n <= ue) return n++, void setTimeout(function() {
            J(t, ve, e, n);
        }, x(n));
        e === qt && (_(de), clearTimeout(ye), ye = null), ve = [], le = null, G() && F(t);
    }
}

function N(t, e) {
    ue < e || setTimeout(function() {
        B({
            data: t,
            success: function() {},
            fail: function() {
                N(t, ++e);
            }
        });
    }, 2e3);
}

function V(t) {
    var e = [];
    return U(t).forEach(function(t) {
        var n = JSON.stringify(t), r = encodeURIComponent(w(n));
        if (Bt > r.length) e.push(new Promise(function(t) {
            B({
                data: r,
                success: function() {
                    t();
                },
                fail: function() {
                    N(r, 1), t();
                }
            });
        })); else {
            var i = t[0], a = i.evs, o = a.length;
            if (1 < o) {
                for (var s = [], c = 0; c < o / 2; c++) s.push(a.pop());
                e = (e = e.concat(V([ Object.assign(i, {
                    evs: s
                }) ]))).concat(V(t));
            } else {
                var u = i.evs[0];
                z("report.js", "wx-get-fail", "body too long " + u.cid + "  bid:" + u.bid);
            }
        }
    }), e;
}

function B(t) {
    var e = t.data, n = t.success, r = t.fail, i = "https://wreport.meituan.net?d=".concat(e, "&t=1&rnd=").concat(Math.random());
    pt.request({
        method: "GET",
        url: i,
        success: function(t) {
            var e = t.statusCode;
            e < 400 ? n && n() : r && r(e);
        },
        fail: function() {
            r && r(0);
        }
    });
}

function R(t) {
    var e = t.url, n = t.data, r = t.success, i = t.fail;
    pt.request({
        method: "POST",
        url: e,
        data: n,
        success: function(t) {
            var e = t.statusCode;
            e < 400 ? r && r() : i(e);
        },
        fail: function() {
            i(0);
        }
    });
}

function U(t) {
    for (var e = 0, n = []; t[e]; ) !function(t) {
        for (var e = t.evs, r = Object.assign(Object.assign({}, t), {
            evs: null
        }), i = 0, a = e.length, o = encodeURIComponent(JSON.stringify(r)).length, s = encodeURIComponent(JSON.stringify(e[i])).length, c = Math.floor((Rt - o) / s), u = []; e[i]; ) {
            if (u.push(e[i]), i + 1 === a || 0 < i && i % c == 0) {
                var f = [ Object.assign(r, {
                    evs: u
                }) ];
                n.push(f), u = [];
            }
            i++;
        }
    }(t[e]), e++;
    return n;
}

function J(t, e, n, r) {
    if (ve = [].concat(e), Ct(ve) && e.length) if (we()) {
        var i = V(ve);
        Promise.all(i).then(function() {
            ge = [], Q(), X(t, n);
        }).catch(function() {
            X(t, n);
        });
    } else {
        var a = JSON.stringify(ve);
        R({
            url: t,
            data: a,
            success: function() {
                X(t, n);
            },
            fail: function() {
                D(t, n, r || 0), z("report.js", "wx-request-fail", "report fail");
            }
        }), ge = [], Q();
    }
}

function X(t, e) {
    if (e === jt) return clearTimeout(ye), ye = null, pe = [], void F(t, jt);
    e === qt && (clearTimeout(ye), ye = null, _(de)), le = null, G() && F(t);
}

function $(t, e) {
    if (he || (he = y(de) || []) && he.length && (le = !0, J(t, ge = he)), e) {
        var n = ge[ge.length - 1], r = e.nm;
        switch (n.evs.push(e), r) {
          case Ot:
          case qt:
            n.evs = n.evs.concat(K()), ge = ge.concat(pe), pe = [], r === qt && m(de, ge), le && (clearTimeout(le), 
            le = null), J(t, ge, r);
            break;

          case Mt:
          case Et:
            le && (clearTimeout(le), le = null), le = !0, J(t, ge, Ot);
            break;

          default:
            le || F(t);
        }
    }
}

function F(t, e) {
    e !== jt ? le = setTimeout(function() {
        if (!G()) return clearTimeout(le), void (le = null);
        J(t, ge);
    }, fe) : ye = setTimeout(function() {
        var e = K();
        if (e.length) {
            var n = O(null, !0), r = [ Object.assign({
                evs: e
            }, n) ];
            pe = pe.concat(r);
        }
        pe.length ? J(t, pe, jt) : (clearTimeout(ye), ye = null);
    }, 5e3);
}

function W(t, e) {
    if ((e = o(e) ? e : {}).mvlId && e.evs) {
        var n = e.mvlId, r = e.evs.val_lab ? e.evs.val_lab : {};
        r._tm = e.evs.tm, r._seq = e.evs.seq, me[n] ? me[n].val_lab.mv_list.push(r) : (e.evs.val_lab = {
            mv_list: [ r ]
        }, me[n] = e.evs);
    }
    ye || F(t, jt);
}

function K() {
    var t = [];
    return u(me, function(e) {
        t.push(e);
    }), me = {}, t;
}

function G() {
    return !!ge.length && ge[0] && ge[0].evs && ge[0].evs.length;
}

function Q() {
    var t = f(!0, {}, O(null, !0));
    t.evs = [], ge.length && 0 === (ge[ge.length - 1].evs || []).length ? ge[ge.length - 1] = t : ge.push(t);
}

function H(t, e) {
    if ("domainReport" === e.catMode) _e.url = "https://catfront.dianping.com/api/log?v=1"; else if (t && "nginxReport" === e.catMode) {
        var n = t.match(/^(https:\/\/)[^\/]+/);
        n && (_e.url = n[0] + "/lx-cat");
    }
}

function z(t, e, n, r) {
    if (_e.url) try {
        var i = getCurrentPages(), a = "app.js";
        i.length && (a = i[i.length - 1].__route__);
        var o = [ {
            project: "wx-lx-sdk",
            pageUrl: a,
            resourceUrl: t,
            category: r ? "jsError" : "ajaxError",
            sec_category: e || "",
            level: "error",
            unionId: O("lxcuid"),
            timestamp: s(),
            content: "" + n || ""
        } ];
        pt.request({
            method: "POST",
            url: _e.url,
            data: "c=".concat(encodeURIComponent(JSON.stringify(o))),
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function() {},
            fail: function(t) {
                h("cat report error:", t);
            }
        });
    } catch (t) {
        h("reportError error:", t);
    }
}

function Y(t, e) {
    try {
        [ Ut, Jt, Ft ].forEach(function(n) {
            var r = e[n], i = function(t, e) {
                r && r.apply(t, e);
            };
            n === Ft && (e[n] = function() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                i(this, e);
            }), n === Ut && (e[n] = function(e) {
                t._config.hasAs = !1, t._config.hasAq = !1;
                var n = e || {}, r = n.query, a = void 0 === r ? {} : r, o = n.scene;
                o && t.set("scene", o), a.lch && t.setLch(a.lch), e && t.setUTM(e), t.start(e ? {
                    custom: e
                } : null), t._config.hasAs = !0;
                for (var s = arguments.length, c = new Array(1 < s ? s - 1 : 0), u = 1; u < s; u++) c[u - 1] = arguments[u];
                i(this, [ e ].concat(c));
            }), n === Jt && (e[n] = function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                i(this, n), t._config.hasAq ? g("PD（页面离开）灵犀集成自动上报，请注释灵犀 quit 接口调用！") : t.quit();
            });
        });
    } catch (t) {
        z("index.js", "lx-api-error", t.message, !0), h(t.message);
    }
    return e;
}

function Z(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
    try {
        var n = function(e) {
            e = Y(t, e), Te(e);
        };
        return e && Te && (App = n), n.OriginApp = Te, n;
    } catch (e) {
        z("index.js", "lx-api-error", e.message, !0), h(e.message);
    }
}

function et(t, e) {
    try {
        var n = e._lx_cid;
        a(n) && t.setCurrentCid(n), [ Xt, Ut, Jt, $t ].forEach(function(n) {
            var r = e[n], i = function(t, e) {
                r && r.apply(t, e);
            };
            switch (n) {
              case Ut:
                e[Ut] = function() {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    t._config.hasPv = !1, t._config.hasPd = !1;
                    var a = this;
                    k().then(function(t) {
                        var e = t.nativeEnv;
                        t.nativeTag, t.type, e && (I(e), Q()), ke.setCurrentCtx(a), ke.push({
                            ctx: a
                        }), i(a, n);
                    });
                };
                break;

              case Jt:
                e[Jt] = function() {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    i(this, n), t._config.hasPv && !t._config.hasPd ? t.pageDisappear({}, !0) : g("PD（页面离开）灵犀集成自动上报，请注释灵犀 pageDisappear 接口调用！");
                };
                break;

              case Xt:
                e[Xt] = function() {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    i(this, n), t._config.hasPv && !t._config.hasPd ? t.pageDisappear({}, !0) : g("PD（页面离开）灵犀集成自动上报，请注释灵犀 pageDisappear 接口调用！"), 
                    ke.back(this);
                };
                break;

              case $t:
                e[$t] = function() {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    0 < n.length && "{}" !== JSON.stringify(n[0]) && (t._config.query = n[0]), i(this, n);
                };
            }
        });
    } catch (t) {
        z("index.js", "lx-api-error", t.message, !0), h(t.message);
    }
    return e;
}

function nt(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
    try {
        var n = function(e) {
            e = et(t, e), Pe(e);
        };
        return e && Pe && (Page = n), n.OriginPage = Pe, n;
    } catch (e) {
        z("index.js", "lx-api-error", e.message, !0), h(e.message);
    }
}

function rt(t) {
    t = t || y("quickOptions"), o(Ie = t.quickReport || {}) && (Ct(Ie.envInfo) && u(Ie.envInfo, function(t) {
        -1 === qe.indexOf(t) && qe.push(t);
    }), Ct(Ie.evsInfo) && u(Ie.evsInfo, function(t) {
        -1 === Ae.indexOf(t) && Ae.push(t);
    })), setInterval(function() {
        ct(Oe, 1), Oe = [];
    }, 500);
}

function it(t) {
    if (o(Ie)) switch (Ct(Ie.envInfo) && (qe = qe.concat(Ie.envInfo)), Ct(Ie.evsInfo) && (Ae = Ae.concat(Ie.evsInfo)), 
    t.nm) {
      case Pt:
        Ie.hasAS && ot(t);
        break;

      case qt:
        Ie.hasAQ && ot(t);
        break;

      case At:
      case Ot:
        Ct(Ie[At]) && -1 < Ie[At].indexOf(t.val_cid) && ot(t);
        break;

      case Lt:
        at(Ie[Lt], t);
        break;

      case It:
        at(Ie[It], t);
        break;

      case Mt:
        at(Ie[Mt], t);
        break;

      case Et:
        at(Ie[Et], t);
    }
}

function at(t, e) {
    Ct(t) && -1 < t.indexOf(e.val_bid) && ot(e);
}

function ot(t) {
    var e = {};
    u(Ae, function(n) {
        e["evs." + n] = t[n] || "";
    });
    var n = O();
    u(qe, function(t) {
        e[t] = n[t] || "";
    }), Oe.push(e), 30 === Oe.length && (ct(Oe, 1), Oe = []);
}

function st(t, e) {
    e <= 3 && (e++, setTimeout(function() {
        ct(t, e);
    }, x(e)));
}

function ct(t, e) {
    0 !== t.length && pt.request({
        method: "POST",
        url: Vt,
        data: t,
        success: function(n) {
            n.statusCode < 400 || st(t, e);
        },
        fail: function() {
            st(t, e);
        }
    });
}

function ut(t, e) {
    t ? A(Me, e) : q(Me), Q();
}

function ft() {
    return new Promise(function(t) {
        ne ? t(ne) : Ee().then(function(e) {
            e ? (ut(!0, ne = e), je(), t(ne)) : t(!1);
        });
    });
}

function lt() {
    P(this).then(function() {
        ht({
            keepNTag: !0
        }), $e = 1, vt("init"), $e = 2, vt("set"), $e = 3, Q(), $e = 4, vt("data"), $e = 5;
        try {
            se && se(f(!0, {}, O(null, !0)));
        } catch (t) {}
    }), this._opts = {}, this._config = {}, re = p();
}

function vt(t) {
    an = !0, "init" === t && oe && (fn.init.apply(fn, oe), oe = xt), "set" === t && (u(rn, function(t) {
        var e = t.type, n = t.args;
        fn[e] && fn[e].apply(fn, n);
    }), rn = []), "data" === t && (u(nn, function(t) {
        var e = t.type, n = t.args;
        fn[e] && fn[e].apply(fn, n);
    }), nn = []), an = !1;
}

function dt(t, e) {
    var n = y(De);
    n || (n = []), n.length >= Ne && n.shift(), e ? n.push({
        seq: t.seq,
        category: O().category,
        cid: e.val_cid,
        bid: t.val_bid,
        val_lab: t.val_lab || {}
    }) : n.push({
        seq: t.seq,
        category: O().category,
        cid: Ke,
        bid: t.val_bid,
        val_lab: t.val_lab || {}
    }), m(De, n);
}

function ht(t) {
    var e = t || {}, n = e.keepTagSF, r = e.keepNTag;
    Xe = 1, A("msid", M()), q("utm"), q("lch"), Qe = xt, !n && _(De), !n && ke.clear(r);
}

function gt(t, e, n, r, i, o) {
    i = i || {};
    try {
        Be < s() - Je && (ht({
            keepTagSF: !0
        }), Q()), Je = s();
        var c = {
            nm: t,
            tm: s(),
            nt: _t ? Nt : Dt,
            seq: Xe++,
            isauto: Ve,
            req_id: e
        };
        if (c = f((c = f(c || {}, Ye)) || {}, ze), ze = {}, a(i.cid)) c.val_cid = i.cid; else if (Ke) c.val_cid = Ke; else {
            var u = getCurrentPages();
            u && u.length && (c.val_cid = u[u.length - 1].__route__);
        }
        if (n && (JSON.stringify(n).length >= Re && (n = Ue), c.val_lab = n), Ge && (c.val_ref = Ge), 
        r && (c.val_bid = r), (t === qt || 1 < on && ie) && (c.refer_req_id = ie), o && (c = f(c || {}, o), 
        o.refer_req_id || delete c.refer_req_id, o.val_ref || delete c.val_ref), t === It && i && !0 === i.sf ? (E("use_sfrom", 1), 
        dt(c, o)) : E("use_sfrom"), t === At || t === Mt || t === Et) {
            var l = y(De);
            l && (c.s_from = l);
        }
        return c.lx_inner_data = j(), c;
    } catch (t) {
        z("index.js", "lx-api-error", t.message, !0), h(t.message);
    }
}

var pt, mt, yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _t = !1;

"undefined" !== ("undefined" == typeof mmp ? "undefined" : t(mmp)) ? (pt = mmp, 
mt = "MT", _t = !0) : mt = "undefined" !== ("undefined" == typeof swan ? "undefined" : t(swan)) ? (pt = swan, 
"Baidu") : "undefined" !== ("undefined" == typeof tt ? "undefined" : t(tt)) ? (pt = tt, 
"TouTiao") : (pt = wx, "WX");

var xt = void 0, bt = Object.prototype, wt = bt.toString, Tt = bt.hasOwnProperty, St = "_lx_sdk_", Ct = Array.isArray || function(t) {
    return "[object Array]" === wt.call(t);
}, kt = {
    hasBuiltRTTEnv: !1
}, Pt = "AS", qt = "AQ", At = "PV", Ot = "PD", It = "MC", Lt = "ME", Mt = "BO", Et = "BP", jt = "MVL", Dt = 3, Nt = 4, Vt = "https://hreport.meituan.com", Bt = 7943, Rt = Bt - 1e3, Ut = "onShow", Jt = "onHide", Xt = "onUnload", $t = "onLoad", Ft = "onLaunch", Wt = "category", Kt = "rtt_env", Gt = function(t, e) {
    var n = t.lx, r = t.ctx;
    o(e) && u(e, function(t, e) {
        n.setTagWithCtx(r, e, t, !0);
    });
}, Qt = {
    hasMMPInternalLX: S(),
    getNativeData: function(t) {
        return /^(getEnv|getTag)$/.test(t) ? new Promise(function(e) {
            Qt.hasMMPInternalLX ? (Qt.internalLX = Qt.internalLX || requirePrivate("lx"), Qt.internalLX.requireUpdate({
                method: t
            }, function(t) {
                var n = t["mmp.status"], r = t.code;
                if ("success" !== n || 200 !== r) return e();
                e(t.data);
            })) : e();
        }) : Promise.resolve();
    }
}, Ht = Qt.getNativeData, zt = [ "category", "_lx_validcode" ], Yt = {}, Zt = {
    sdk_ver: "2.3.2",
    ch: "weixin",
    lch: "wx",
    rtt: "mp"
}, te = [ "sdk_ver", "lxcuid" ];

Zt.lxcuid = function(t) {
    function e(t, e) {
        var n, r = 0;
        for (n = 0; n < e.length; n++) r |= c[n] << 8 * n;
        return t ^ r;
    }
    var n = y("lxcuid");
    if (n) return n;
    var r, i, a = function() {
        for (var t = 1 * new Date(), e = 0; t === 1 * new Date() && e < 200; ) e++;
        return t.toString(16) + e.toString(16);
    }, o = +(Math.random() + "").slice(2), s = t.ua || "", c = [], u = 0;
    for (r = 0; r < s.length; r++) i = s.charCodeAt(r), c.unshift(255 & i), 4 <= c.length && (u = e(u, c), 
    c = []);
    0 < c.length && (u = e(u, c)), s = u;
    var f = 0;
    t.sc && (f = +(f = t.sc.split("*"))[0] * +f[1]);
    var l = [ a(), o, s, f, a() ].map(function(t) {
        return t.toString(16);
    }).join("-");
    return m("lxcuid", l), l;
}(Zt);

var ee, ne, re, ie, ae, oe, se, ce = {}, ue = 3, fe = 500, le = null, ve = [], de = "lx_send_cache_data", he = xt, ge = [], pe = [], me = {}, ye = null, _e = {}, xe = !1, be = !1, we = function() {
    if (be || "MT" !== mt || !Yt.mmpSDKVersion || "ios" !== Yt.platform.toLowerCase()) return be = !0, 
    xe;
    be = !0;
    var t = b(Yt.mmpSDKVersion, "1.0.2");
    return xe = Yt.mmpSDKVersion && t < 0;
}, Te = App, Se = [], Ce = [], ke = {
    _cachedTags: xt,
    _dirty: !1,
    ctx: xt,
    setCurrentCtx: function(t) {
        this.ctx = t;
    },
    push: function(t) {
        var n = t.ctx, r = t.key, i = t.val, a = t.isFromMMP;
        n = n || this.ctx;
        var s, c, u = Se.findIndex(function(t) {
            return t.ctx === n;
        });
        if (0 <= u && (s = Se[u]), s) {
            if (!r || !i) return;
            if (c = s.tag || {}, o(i)) for (var f in c[r] = c[r] || {}, i) c[r][f] = i[f];
            s.tag = c;
        } else r && i && (c = e({}, r, i)), s = {
            ctx: n,
            tag: c
        }, Se.push(s), a && Ce.push({
            tag: e({}, r, i)
        });
        this._dirty = !0, c && _t && wx.setLxTag && wx.setLxTag({
            data: {
                key: r,
                value: i
            },
            success: function() {}
        });
    },
    back: function(t) {
        var e = Se.findIndex(function(e) {
            return e.ctx === t;
        }) - 1;
        0 <= e && (this._dirty = !0, Se.splice(e, Se.length - e));
    },
    get: function(t) {
        var e = this.getAll();
        return a(t) ? e[t] : e;
    },
    getAll: function() {
        var t;
        if (this._dirty) if (Se.length) {
            var e = {}, n = !1;
            u(Se, function(t) {
                var r = t.tag;
                r && (e = f(n = !0, e, r));
            }), t = this._cachedTags = n ? e : xt;
        } else t = this._cachedTags = xt; else t = this._cachedTags;
        return t;
    },
    clear: function(t) {
        Se = t ? JSON.parse(JSON.stringify(Ce)) : [];
    }
}, Pe = Page, qe = [ "uid", "uuid", "union_id", "sdk_ver", "msid", "ct", "os", "appnm", "app", "category", "utm" ], Ae = [ "val_bid", "val_cid", "lng", "lat", "val_lab", "req_id", "nm", "val_ref", "seq", "tm" ], Oe = [], Ie = {}, Le = /^\<\!\-\-ImpactLXValidation\=\[(\d{6,12})\]\-\-LXValidationEnd\>$/, Me = "_lx_validcode", Ee = function() {
    return new Promise(function(t) {
        wx.getClipboardData({
            success: function(e) {
                var n = e.data;
                t(Le.test(n) ? n.replace(Le, "$1") : !1);
            }
        });
    });
}, je = function() {
    clearInterval(ee), ee = setInterval(function() {
        Ee().then(function(t) {
            t || (clearInterval(ee), ne = null, ut(!1));
        });
    }, 1e3);
}, De = "lx_cache_sf", Ne = 500, Ve = 7, Be = 18e5, Re = 5e3, Ue = {
    overlen_cutoff: 1
}, Je = Date.now(), Xe = 1, $e = 0, Fe = Date.now(), We = xt, Ke = xt, Ge = xt, Qe = xt, He = xt, ze = {}, Ye = {}, Ze = !0, tn = !1, en = !1, nn = [], rn = [], an = !1, on = 0, sn = lt.prototype;

sn.init = function(t, e, n) {
    if ($e < 1) oe = [ t, e, n ]; else {
        var r = this, i = r._opts;
        if (!i.reportUrl) {
            r._config = n = f(r._config || {}, n), n.catMode && H(t, n), i.reportUrl = t;
            var o = e.appnm, s = e.category;
            o || h("没有设置应用标识（appnm） !"), s || (e.category = o), e.appnm = o, u(e || {}, function(t, e) {
                if (!a(e) || xt === t) return i[e];
                r.set(e, t), i[e] = t;
            }), tn && ft();
        }
    }
}, sn.onLoad = function(t) {
    se = t;
}, sn.setLch = function(t) {
    if ($e < 2) return rn.push({
        type: "setLch",
        args: [ t ]
    });
    He && He === t || (He = t, !an && ht(), this.set("lch", t));
}, sn.setUTM = function(t) {
    if ($e < 2) return rn.push({
        type: "setUTM",
        args: [ t ]
    });
    if (t) {
        var e = t || {}, n = e.query || {}, r = e.referrerInfo || {}, i = [ "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign" ], o = {};
        if ("clear" === e && !an) return ht(), void Q();
        if (n && u(i, function(t) {
            a(n[t]) && (o[t] = n[t]);
        }), r.extraData) {
            var s = r.extraData;
            if (a(s)) try {
                s = JSON.parse(s);
            } catch (t) {
                s = {}, z("index.js", "lx-api-error", t.message, !0), h(t.message);
            }
            u(i, function(t) {
                a(s[t]) && (o[t] = s[t]);
            });
        }
        u(i, function(t) {
            a(e[t]) && (o[t] = e[t]);
        });
        var c = parseInt(e.scene);
        o.utm_source || isNaN(c) || 1037 !== c && 1038 !== c || e.referrerInfo && e.referrerInfo.appId && (o.utm_source = e.referrerInfo.appId, 
        o.utm_medium = "otherApp"), 0 < Object.keys(o).length ? (o.utm_source && Qe !== o.utm_source && (!an && ht(), 
        Qe = o.utm_source), this.set("utm", o)) : g("没有设置utm(站外来源)!");
    }
}, sn.set = function(t, e) {
    if ($e < 2) return rn.push({
        type: "set",
        args: [ t, e ]
    });
    a(t) && 0 !== t.replace(/(^\s*)|(\s*$)/g, "").length && A(t, e, !an && Q);
}, sn.get = function(t) {
    return O(t);
}, sn.setTagWithCtx = function(t, e, n, r) {
    if (e) {
        var i = this;
        a(e) ? ke.push({
            ctx: t,
            key: e,
            val: n,
            isFromMMP: r
        }) : o(e) && u(e, function(t, e) {
            i.setTagWithCtx(xt, e, t, r);
        });
    }
}, sn.clearTag = function(t) {
    if ($e < 2) return rn.push({
        type: "clearTag",
        args: [ t ]
    });
    t ? ke.back(t) : ke.clear();
}, sn.setTag = function(t, e) {
    if ($e < 2) return rn.push({
        type: "setTag",
        args: [ t, e ]
    });
    this.setTagWithCtx(xt, t, e);
}, sn.getTag = function(t) {
    var e = ke.getAll();
    return a(t) ? e[t] : e;
}, sn.start = function(t) {
    if (!this._config.hasAs || an) {
        if ($e < 4) return nn.push({
            type: "start",
            args: [ t ]
        });
        t = o(t) ? t : xt, Fe = Date.now(), ae = p(), re = null, en || (Ke = xt);
        var e = gt(Pt, ae, t);
        e.isauto = 6, this.send(e);
    } else g("AS（应用启动）灵犀集成自动上报，请注释灵犀 start 接口调用！");
}, sn.quit = function(t) {
    if ($e < 4) return nn.push({
        type: "quit",
        args: [ t ]
    });
    t = o(t) ? t : {}, t = f({
        duration: "" + (Date.now() - Fe)
    }, t), this._config.hasAq = !0;
    var e = gt(qt, ae, t);
    e.isauto = 6, this.send(e);
}, sn.debug = function(t, e) {
    tn = !!t;
    var n = (e = e || {}).code && e.code.toString() || "";
    tn ? /^\d{6,8}$/.test(n) && ut(!0, n) : ut(!1);
}, sn.pageView = function(t, e, n) {
    if ($e < 4) return nn.push({
        type: "pageView",
        args: [ t, e, n ]
    });
    var r;
    on++, e = o(e) ? e : {}, this._config.query && (e.custom ? e.custom.__lxsdk_query = JSON.stringify(this._config.query) : e.custom = {
        __lxsdk_query: JSON.stringify(this._config.query)
    }), this._config.query = "", re = p(), Ke ? 1 < on && Ke && Ke !== t && (Ge = Ke) : Ze || (Ge = t), 
    this._config.hasPv = !0, n && a(n.category) ? (this._config.defaultCategory = this._opts.category, 
    this.set("category", n.category)) : this._config.defaultCategory = "", We = Date.now(), 
    Ke = t, r = gt(At, re, e), this.send(r), Ze = !1, ie = re;
}, sn.pageDisappear = function(t, e) {
    if ($e < 4) return nn.push({
        type: "pageDisappear",
        args: [ t, e ]
    });
    if (this._config.hasPv && re) {
        t = o(t) ? t : {}, We && (t = f({
            duration: "" + (Date.now() - We)
        }, t)), this._config.hasPd = !0;
        var n = gt(Ot, re, t);
        e && (n.isauto = 6), this.send(n), We = xt, this._config.defaultCategory && this.set("category", this._config.defaultCategory);
    } else g("该页面没有上报PV(页面展示)事件，请确认!");
}, sn.moduleView = function(t, e, n) {
    if ($e < 4) return nn.push({
        type: "moduleView",
        args: [ t, e, n ]
    });
    var r = gt("MV", re, e, t, n);
    this.send(r);
}, sn.systemCheck = function(t, e) {
    if ($e < 4) return nn.push({
        type: "systemCheck",
        args: [ t, e ]
    });
    var n = gt("SC", re, e, t);
    this.send(n);
}, sn.moduleClick = function(t, e, n) {
    if ($e < 4) return nn.push({
        type: "moduleClick",
        args: [ t, e, n ]
    });
    var r = gt(It, re, e, t, n);
    this.send(r);
}, sn.moduleEdit = function(t, e, n) {
    if ($e < 4) return nn.push({
        type: "moduleEdit",
        args: [ t, e, n ]
    });
    var r = gt(Lt, re, e, t, n);
    this.send(r);
}, sn.order = function(t, e, n, r) {
    if ($e < 4) return nn.push({
        type: "order",
        args: [ t, e, n, r ]
    });
    n = f(n || {}, {
        order_id: e
    });
    var i = gt(Mt, re, n, t, r);
    this.send(i), ke.clear();
}, sn.pay = function(t, e, n, r) {
    if ($e < 4) return nn.push({
        type: "pay",
        args: [ t, e, n, r ]
    });
    n = f(n || {}, {
        order_id: e
    });
    var i = gt(Et, re, n, t, r);
    this.send(i);
}, sn.send = function(t) {
    var e = this._opts.reportUrl;
    if (e) if ("MVL" === t.nm) W(e, {
        mvlId: t.val_bid + t.req_id + O("category"),
        evs: t
    }); else {
        this._config.quickReportOptions && it(t);
        var n = ke.getAll();
        n && (t.tag = n), $(e, t);
    } else h("Must config reportUrl!");
}, sn.presetGeolocation = function(t, e) {
    var n = parseFloat(t), r = parseFloat(e);
    return n && (ze.lng = n), r && (ze.lat = r), this;
}, sn.resetGeolocation = function(t, e) {
    var n = parseFloat(t), r = parseFloat(e);
    n && (Ye.lng = n), r && (Ye.lat = r);
}, sn.getValidationState = function() {
    return ft().then(function(t) {
        var e = !1;
        return t && 6 <= t.toString().length && (e = !0), {
            validating: e,
            code: t
        };
    });
};

var cn = function() {
    var t = {};
    return Ke && (t.val_cid = Ke), Ge && (t.val_ref = Ge), re && (t.req_id = re), 1 < on && ie && (t.refer_req_id = ie), 
    t;
};

sn.sendEvsAsyncBefore = cn, sn.sendEvsAsycBefore = cn;

var un = function(t, e) {
    if (!o(e) || !o(t)) return !1;
    var n;
    switch ("" + e.nm.toUpperCase()) {
      case "MC":
        n = gt(It, re, e.valLab, e.valBid, e.options, t);
        break;

      case "MV":
        n = gt("MV", re, e.valLab, e.valBid, xt, t);
        break;

      case "ME":
        n = gt(Lt, re, e.valLab, e.valBid, xt, t);
        break;

      case "BO":
        e.valLab = f(e.valLab || {}, {
            order_id: e.orderId
        }), n = gt(Mt, re, e.valLab, e.valBid, xt, t);
        break;

      case "BP":
        e.valLab = f(e.valLab || {}, {
            order_id: e.orderId
        }), n = gt(Et, re, e.valLab, e.valBid, xt, t);
        break;

      default:
        return;
    }
    this.send(n);
};

sn.sendEvsAsyncAfter = un, sn.sendEvsAsycAfter = un, sn.moduleViewList = function(t, e) {
    if ($e < 4) return nn.push({
        type: "moduleViewList",
        args: [ t, e ]
    });
    if (t && a(t)) {
        var n = gt("MVL", re, e, t);
        this.send(n);
    }
}, sn.appLifeCycleInterceptor = function() {
    var t = this;
    return function(e) {
        return Y(t, e);
    };
}, sn.pageLifeCycleInterceptor = function() {
    var t = this;
    return function(e) {
        return et(t, e);
    };
}, sn.overrideApp = function(t) {
    return Z(this, t);
}, sn.overridePage = function(t) {
    return nt(this, t);
}, sn.setCanaryReleaseVersion = function(t) {
    t && this.set("canary_release", t + "");
}, sn.collectParamsToWeb = function(t) {
    var e = [ "s:".concat(O("msid")), "l:".concat(O("lxcuid")), "a:".concat(O("appnm")) ];
    if (o(t) && !0 === t.hasOpenid || !0 === t) {
        var n = O("wxid") || "";
        e.push("w:".concat(n));
    }
    var r = (t || {}).withEnvKeys || [];
    return Ct(r) && 0 < r.length && u(r, function(t) {
        t && a(O(t)) && (/^(appnm|lxcuid|msid|wxid)$/i.test(t) || e.push("".concat(t, ":").concat(w(O(t)))));
    }), e.join(";");
}, sn.updateQuickConfig = function(t) {
    o(t) && (this._config.quickReportOptions = t || null, m("quickOptions", t || {}), 
    rt(this._config.quickReportOptions));
};

var fn = new lt();

sn.setCurrentCid = function(t) {
    Ke = t, en = !0;
}, module.exports = fn;