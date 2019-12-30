function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var u = t[n];
            u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), 
            Object.defineProperty(e, u.key, u);
        }
    }
    return function(t, n, u) {
        return n && e(t.prototype, n), u && e(t, u), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = t(require("../url/index")), i = t(require("../pageutil/index")), a = t(require("../event/index")), r = t(require("../geo/index")), o = t(require("../login/index")), c = t(require("../../../@analytics/wechat-sdk/lib/index.js")), s = function() {
    function t() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        e(this, t), this.utm_source = "", this.minaVersion = "", this.scene = "", this.lng = "", 
        this.lat = "";
    }
    return n(t, [ {
        key: "init",
        value: function(e) {
            var t = e.appnm, n = e.category, u = e.rtnm, i = this._objectWithoutProperties(e, [ "appnm", "category" ]);
            if (c.default.init("https://report.meituan.com", {
                appnm: t,
                category: n,
                rtnm: u
            }), i) for (var a in i) i.hasOwnProperty(a) && (this[a] = i[a]);
        }
    }, {
        key: "start",
        value: function(e) {
            c.default.start(this._getLxCommon(e));
        }
    }, {
        key: "quit",
        value: function() {
            c.default.quit();
        }
    }, {
        key: "set",
        value: function(e, t) {
            c.default.set(e, t);
        }
    }, {
        key: "_set",
        value: function(e, t) {
            c.default.set(e, t);
        }
    }, {
        key: "setEnv",
        value: function() {
            var e = this, t = o.default.getOpenIdCacheSync(), n = r.default.getCitySync();
            t ? this._set("wxid", t) : o.default.getOpenId().then(function(t) {
                t && t.openId && e._set("wxid", t.openId);
            }), n && n.cityId && this._set("cityid", n.cityId), a.default.on("_openId_", function(t) {
                t && e._set("wxid", t);
            }), o.default.getDPUser().then(function(t) {
                t && t.userId ? e._set("uid", t.userId) : a.default.on("_userId_", function(t) {
                    t && e._set("uid", t);
                });
            }), a.default.on("_unionId_", function(t) {
                t && e._set("wxunionid", t);
            }), a.default.on("cityChange", function(t) {
                t && t.cityId && e._set("cityid", t.cityId);
            });
        }
    }, {
        key: "_setScene",
        value: function(e) {
            e && (this.scene = e, c.default.set("scene", e));
        }
    }, {
        key: "get",
        value: function(e) {
            return c.default.get(e);
        }
    }, {
        key: "getUTM",
        value: function() {
            return c.default.get("utm");
        }
    }, {
        key: "setUTM",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = {};
            e && e.scene && this._setScene(e.scene), n = Object.assign({}, this._parseUTM(e, t), e), 
            c.default.setUTM(n);
        }
    }, {
        key: "getSharePath",
        value: function(e) {
            var t = void 0, n = void 0, i = {};
            if (e) {
                var a = u.default.parse(e), r = a.uri, o = a.query, c = a.hash;
                try {
                    var s = this.getUTM();
                    s && s.utm_source ? (t = s.utm_source, n = s.utm_term, t == this.utm_source && n || (n = t, 
                    t = this.utm_source), i = {
                        utm_source: t,
                        utm_term: n || t
                    }) : i = {
                        utm_source: this.utm_source
                    }, o = Object.assign({}, o, i);
                } catch (e) {
                    console.log("get shareUTM error:", e);
                }
                return u.default.stringify(r, o, c);
            }
        }
    }, {
        key: "getLxData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = r.default.getLocationSync();
            this.lng = t && t.longitude, this.lat = t && t.latitude;
            var n = {
                minaVersion: this.minaVersion,
                scene: this.scene
            };
            e.from && (n.from = e.from);
            try {
                n.openId = wx.getStorageSync("openid");
                var u = wx.getStorageSync("city");
                u && u.city && u.city.cityId && (n.cityId = u.city.cityId);
            } catch (e) {
                console.log("lxdata get error");
            }
            return n;
        }
    }, {
        key: "collectParamsToWeb",
        value: function(e) {
            return c.default.collectParamsToWeb(e);
        }
    }, {
        key: "setCanaryReleaseVersion",
        value: function(e) {
            c.default.setCanaryReleaseVersion(e);
        }
    }, {
        key: "getLxCUID",
        value: function() {
            return c.default.get("lxcuid") || "";
        }
    }, {
        key: "_getUtmFromWxSearch",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (t && e) return t[e + ""] || "";
        }
    }, {
        key: "_parseUTM",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = {
                utm_source: this.utm_source
            }, i = e.query;
            try {
                if (i && i.q) {
                    var a = decodeURIComponent(i.q), r = u.default.parse(a).query;
                    r && (r.utm_source || r.u_s) && (r.utm_source = r.utm_source || r.u_s, i = r);
                }
            } catch (e) {}
            var o = e.scene;
            if (1034 == o && (n.utm_source = "wxpay_order"), 1019 == o && (n.utm_source = "wx_wallet"), 
            i && i.serviceType) {
                var c = this._getUtmFromWxSearch(i.serviceType, t);
                c && (n.utm_source = c);
            }
            return [ "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content" ].map(function(e) {
                i && i[e] && (n[e] = i[e]);
            }), n;
        }
    }, {
        key: "pageView",
        value: function(e, t) {
            var n = this, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = {}, s = "", l = "";
            try {
                var d = i.default.getCurrentPage();
                r = d.options, (s = d.route) && (l = u.default.stringify(s, r));
            } catch (e) {
                console.log(e);
            }
            var f = Object.assign({}, this._getLxCommon(t), r, a);
            l && (f.url = l), f = this.checkUuid(f);
            var h = o.default.getOpenIdCacheSync();
            h ? (this._set("wxid", h), c.default.presetGeolocation(this.lng, this.lat).pageView(e, f)) : o.default.getOpenId().then(function(t) {
                t && t.openId && n._set("wxid", t.openId), c.default.presetGeolocation(n.lng, n.lat).pageView(e, f);
            });
        }
    }, {
        key: "pageDisappear",
        value: function(e) {
            c.default.pageDisappear(e);
        }
    }, {
        key: "moduleView",
        value: function(e, t) {
            var n = this._getLxCommon(t);
            n = this.checkUuid(n), c.default.presetGeolocation(this.lng, this.lat).moduleView(e, n);
        }
    }, {
        key: "moduleEdit",
        value: function(e, t) {
            var n = this._getLxCommon(t);
            c.default.moduleEdit(e, n);
        }
    }, {
        key: "moduleClick",
        value: function(e, t) {
            var n = this._getLxCommon(t);
            n = this.checkUuid(n), c.default.moduleClick(e, n);
        }
    }, {
        key: "order",
        value: function(e, t, n) {
            var u = this._getLxCommon(n);
            c.default.order(e, t, u);
        }
    }, {
        key: "pay",
        value: function(e, t, n) {
            var u = this._getLxCommon(n);
            c.default.pay(e, t, u);
        }
    }, {
        key: "setLch",
        value: function(e) {
            return c.default.setLch(e);
        }
    }, {
        key: "setTagWithCtx",
        value: function(e, t, n) {
            return c.default.setTagWithCtx(e, t, n);
        }
    }, {
        key: "setTag",
        value: function(e, t) {
            return c.default.setTag(e, t);
        }
    }, {
        key: "clearTag",
        value: function(e) {
            return c.default.clearTag(e);
        }
    }, {
        key: "_getLxCommon",
        value: function(e) {
            var t = this.getLxData();
            return e && "[object Object]" === Object.prototype.toString.call(e) && (t = Object.assign({}, t, e)), 
            t;
        }
    }, {
        key: "_objectWithoutProperties",
        value: function(e, t) {
            var n = {};
            for (var u in e) t.indexOf(u) >= 0 || Object.prototype.hasOwnProperty.call(e, u) && (n[u] = e[u]);
            return n;
        }
    }, {
        key: "checkUuid",
        value: function(e) {
            var t = e, n = t.custom, u = t && (t.shopid || t.shopId || t.poi_id);
            return u && (t = Object.assign({}, e, {
                shopuuid: u
            })), n && (t.custom = this.checkUuid(n)), t || null;
        }
    } ]), t;
}(), l = new s();

l.LXMina = s, exports.default = l;