function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, o = require("../../../npm/@dp/sparrow/index.js"), a = t(require("../../../npm/@dp/adu_track/index.js")), i = require("../../../npm/@dp/owl-wxapp/es6/index.js"), s = t(require("../../../npm/@mtfe/wxapp-rohr/dist/rohr.js")), n = t(require("./shopcache")), r = require("../../../config/index"), d = require("../../../config/business"), h = require("../../../utils/compose"), p = require("../../../utils/extend"), c = require("../../../utils/url_stringify"), u = require("../../../utils/lx_wrap"), l = require("../../../utils/scene"), f = require("../../../utils/url").rewrite, g = require("../../../components/midas/midas.outlet"), m = require("../../../public/logan"), S = require("../../../common/nav"), I = "pages/detail/detail", v = void 0, w = {
    pageBid: "c_1ilqz4n8",
    shareBid: "b_1w9q56h1"
}, y = [ "shop-branch", "shop-mall", "shop-nearby" ], D = {
    data: {
        slotItems: [ {
            name: "shop-head"
        } ],
        shopModules: {
            "shop-head": {}
        },
        mSource: "mina_default",
        online: 1,
        utm_medium: "online",
        offuserId: null,
        pageUrl: "pages/detail/detail",
        hasPopup: !1,
        onShowCallCounter: 0,
        reviewListParams: {},
        scopeDataList: [],
        quickPosition: {
            bottom: 270
        },
        showAddToVoteBtn: !1,
        shouldShowDinvote: !0
    },
    onLoad: function(t) {
        var e = this;
        v = getApp(), m.log(I + " load options: " + JSON.stringify(t));
        try {
            console.log("onLoad URL ==> ", c(getCurrentPages()[getCurrentPages().length - 1].route, t));
        } catch (t) {}
        try {
            if (t.from && "list" === t.from) i.owl.pageSpeed.createFirstContentfulPaint([ "shopInfo", "mapiHeader" ], 10); else if (t.from && "default" === t.from) i.owl.pageSpeed.createFirstContentfulPaint([ "shopInfo", "mapiHeader" ], 1); else {
                var o = getApp().getShowOptions();
                o && 1036 == o.scene ? i.owl.pageSpeed.createFirstContentfulPaint([ "shopInfo", "mapiHeader" ], 11) : i.owl.pageSpeed.createFirstContentfulPaint([ "shopInfo", "mapiHeader" ], 1);
            }
        } catch (t) {
            i.owl.error.addError("detail pageSpeed error =>", JSON.stringify(t));
        }
        this.shopUuid = t && t.shopUuid, this.shopId = t && t.shopId, 60 == t.shopType && this.setData({
            slotItems: [],
            shopModules: {}
        });
        var a = "offline-qrcode" == t.utm_medium ? 0 : 1;
        t.online = a, this.defaultSlots = [ {
            name: "shop-head"
        }, {
            name: "shop-info"
        }, {
            name: "shop-map"
        }, {
            name: "info-err"
        } ];
        var s = Date.now(), r = n.default.getCache(t);
        if (i.owl.pageSpeed.addPoint({
            position: 6,
            duration: Date.now() - s
        }), wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), r) {
            var d = r.shopInfo && r.shopInfo.loadOptions;
            d && this.setData({
                loadOptions: d,
                slotItems: r.slotItems || [],
                mApiShopInfo: r.mApiShopInfo || {},
                shopInfo: r.shopInfo || {},
                shopModules: this.slot2Module(r.slotItems),
                isCache: r.isCache || "",
                islistcache: r.islistcache || "",
                bigPics: r.bigPics || ""
            }, function() {
                r.isCache && (i.owl.pageSpeed.addFirstContentfulPaint("mapiHeader"), i.owl.pageSpeed.addFirstContentfulPaint("shopInfo"));
            });
        }
        this.options = t, this.dealOptions(t).then(function(o) {
            e.shopUuid = o && o.shopUuid, e.shopId = o && o.shopId, e.params = o || t;
            var a = {};
            a = {
                shopUuid: e.shopUuid
            }, e.shopUuid || (a.shopId = e.shopId), o.pageName = "shop";
            var i = t.scopeDataList || "[]";
            try {
                i = JSON.parse(i) || [];
            } catch (t) {
                i = [], m.log("JSON.parse error", t);
            }
            e.init(o), e.setData({
                lxdata: {
                    poi_id: t.shopId || t.shopUuid
                },
                utm_medium: o.utm_medium || "",
                offuserId: t.offuserId || "",
                reviewListParams: a,
                scopeDataList: i
            }, function() {
                e.aduInit(t);
            });
        }).catch(function(t) {
            i.owl.error.addError("parseShopId error => ", JSON.stringify(t));
        });
    },
    onShow: function() {
        var t = this;
        if (this.hasLoad) {
            var e = getApp().getShowOptions(), a = o.login.getDPUserSync(), i = 1;
            a && a.userId && e && e.offuserId && a.userId == e.offuserId && (i = 0), this.data.lxdata.iscustomer = i, 
            u.pageView(w.pageBid, this.data.lxdata), "offline-qrcode" === this.data.utm_medium && this.setData({
                onShowCallCounter: this.data.onShowCallCounter + 1
            });
        }
        var s = getApp().getShowOptions();
        if (s && s.scene) {
            var n = s.scene;
            if (1036 == n || 1 == s.canLaunchApp && -1 !== [ "1038", "1089", "1090" ].indexOf(n)) {
                var r = this.updateAppLaunch(), d = this.data.shopInfo && this.data.shopInfo.appLaunchSwitch;
                d && (r = "off" !== d && r), this.setData({
                    scene: n,
                    canLaunchApp: r
                });
            } else if (1001 == n || 1019 == n) {
                var h = void 0, p = o.login.getTokenSync() || o.login.getTokenCacheSync();
                p ? (m.log("用户已登录，无需强制登录:" + p), h = !1, this.setData({
                    scene: n,
                    needLogin: h
                })) : o.login.niceToHave().then(function(e) {
                    e && e.token ? (m.log("用户已登录，无需强制登录:" + e), h = !1) : (m.log("用户需要强制登录：" + e), h = !0), 
                    t.setData({
                        scene: n,
                        needLogin: "off" !== (t.data.shopInfo && t.data.shopInfo.loginSwitch) && h
                    });
                });
            } else this.setData({
                scene: n
            });
        }
    },
    onPullDownRefresh: function() {
        this.init(this.params), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        u.moduleClick(w.shareBid);
        var t = {};
        this.shopUuid ? t.shopUuid = this.shopUuid : t.shopId = this.shopId;
        var e = o.login.getDPUserSync();
        t.offuserId = e && e.userId || "";
        var a = u.getSharePath(c("/pages/detail/detail", t)), i = this.data.mApiShopInfo, s = i && i.name ? i.name : "";
        return i && i.branchName && (s = s + "(" + i.branchName + ")"), {
            title: this.data.shareTitle || s,
            path: a,
            imageUrl: this.data.sharePicPath || ""
        };
    },
    handleReLoad: function(t) {
        var e = t.detail || t.currentTarget.dataset.module;
        "mapiError" === e ? this.fetchMapiShopInfo(this.params) : "shopinfo" !== e || this.data.islistcache ? this.init(this.params) : this.fetchShopInfo(this.params);
    },
    init: function(t) {
        this.fetchShopInfo(t), this.fetchMapiShopInfo(t), this.fetchShopOther(t);
    },
    fetchShopInfo: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e.shopUuid, s = e.shopId, n = e.online, d = this.defaultSlots, h = {
            isError: !1,
            iconType: "1",
            description: "哎呀，页面加载失败了"
        }, p = this.slot2Module(d);
        if ("subpackage" === e.mode) try {
            var u = this.shopId || this.shopUuid, l = o.cache.getStorageSync("dp_shopinfo");
            if (l && l.cacheShopId == u && l.data) {
                var f = l.data;
                return void this.dealShopInfo(f, p, d, {
                    noCache: !0
                });
            }
        } catch (t) {
            m.log("get storage shopinfo fail", t);
        }
        var g = {
            online: n
        }, S = Date.now();
        e.shopUuid ? g.shopUuid = a : g.shopId = s;
        var w = g.shopUuid || g.shopId, y = v.getShowOptions() && v.getShowOptions().scene ? v.getShowOptions().scene : null;
        g.scene = y, this.scene = y;
        var D = v.getUtmSource();
        g.utm_source = D.utm_source || "", e.from && (g.from = e.from);
        var O = r.API.SHOP_INFO;
        g.mtsiReferrer = encodeURIComponent(c(I, this.options)), m.log("detail fetchShopInfo params: " + JSON.stringify(g)), 
        o.request.mina({
            url: r.DOMAIN + O,
            data: g
        }, {
            cache: "dp_detail_shopinfo_" + w
        }).then(function(e) {
            if (i.owl.pageSpeed.addPoint({
                position: 4,
                duration: Date.now() - S
            }), m.log("detail shopinfo resCode: " + e.statusCode), e && 200 == e.statusCode && e.data && 200 == e.data.code) {
                var a = e.data.redirectData;
                if (a && a.url && "packages/detail/pages/detail/detail" !== getCurrentPages()[getCurrentPages().length - 1].route) {
                    var s = a.url, n = o.url.parse(s), r = n.uri, c = n.query;
                    s = o.url.stringify(r, Object.assign({}, t.options, c)), wx.redirectTo({
                        url: s
                    });
                    var u = {
                        cacheShopId: t.shopUuid || t.shopId,
                        data: e.data
                    };
                    return void o.cache.setStorage("dp_shopinfo", u);
                }
                t.dealShopInfo(e.data, p, d);
            } else t.setData({
                isInfoError: !0,
                infoError: h,
                slotItems: d,
                shopModules: p
            }), i.owl.error.addError("shopInfo请求数据error: ", JSON.stringify(e.statusCode)), m.log("detail shopinfo 数据出错: " + JSON.stringify(e));
        }).catch(function(e) {
            i.owl.pageSpeed.addPoint({
                position: 4,
                duration: Date.now() - S
            }), t.data.isCache || (h.description = "哎呀，你的网络好像出问题了", t.setData({
                isInfoError: !0,
                infoError: h,
                slotItems: d,
                shopModules: p
            })), m.log("detail shopinfo 数据\b异常 " + JSON.stringify(e));
        });
    },
    dealShopInfo: function(t, a, s) {
        var r = this, h = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, c = t.shopInfo, l = c.appLaunchSwitch, f = this.data.canLaunchApp;
        f = void 0 !== f && (f && "off" !== l);
        var g = c.slotItems, m = a, S = c.mSource;
        g ? (d.MODULES_MOCK && (g = d.SHOP_SLOTS), m = this.slot2Module(g)) : g = s;
        var I = Object.assign({}, c);
        this.shopUuid && (I.shopUuid = this.shopUuid), this.shopId && (I.shopId = this.shopId);
        var v = Date.now(), D = c.shopType, O = c.shopIdDTO || {}, P = p(u.getLxData(), {
            abtest: {
                dot: c.dot
            },
            mSource: this.data.mSource,
            online: this.params.online,
            shopType: D,
            poi_id: this.shopUuid || this.shopId
        }), T = this.options, U = o.login.getDPUserSync(), C = 1;
        U && U.userId && T && T.offuserId && U.userId == T.offuserId && (C = 0);
        var A = !("off" === (c && c.loginSwitch) || !this.data.needLogin);
        u.pageView(w.pageBid, e({}, P, {
            query: T,
            iscustomer: C
        }));
        var M = Object.assign({}, this.params, O);
        c.loadOptions = M, this.setData({
            loadOptions: M,
            lxdata: P,
            isInfoError: !1,
            slotItems: g,
            shopModules: m,
            shopInfo: c,
            mSource: S,
            hasApp: 1036 == this.scene && c.hasApp,
            canLaunchApp: f,
            needLogin: A,
            voteShopInfo: I
        }, function() {
            i.owl.pageSpeed.addPoint({
                position: 5,
                duration: Date.now() - v
            }), r.data.isCache || i.owl.pageSpeed.addFirstContentfulPaint("shopInfo");
        }), this.params = M, this.hasLoad = !0, h.noCache || (n.default.setShopStyleCache(S, g), 
        n.default.setStorageShop(this.shopUuid || this.shopId, {
            shopInfo: c
        }));
        var x = {};
        y.map(function(t) {
            x[t] = r.data.shopModules[t];
        }), this.setData({
            dyShowModule: x,
            dyShopInfo: JSON.stringify({
                dyLxData: Object.assign({}, P),
                dyLoadOptions: Object.assign({}, this.params),
                moduleConfig: Object.assign({}, x)
            })
        });
    },
    fetchShopOther: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e.shopUuid, s = e.shopId, n = {};
        e.shopUuid ? n.shopUuid = a : n.shopId = s;
        var d = o.geo.getLocationSync();
        d && (n.lat = d && d.latitude || "", n.lng = d && d.longitude || "");
        var h = v.getShowOptions() && v.getShowOptions().scene ? v.getShowOptions().scene : null;
        n.scene = h, n.mtsiReferrer = encodeURIComponent(c(I, this.options));
        var p = r.API.SHOP_OTHERS;
        m.log("detail shopother: " + JSON.stringify(n)), o.request.mina({
            url: r.DOMAIN + p,
            data: n
        }, {
            level: 3
        }).then(function(e) {
            if (m.log("detail shopothers:" + e.statusCode), e && 200 == e.statusCode && e.data && 200 == e.data.code) {
                var o = e.data.otherShopInfo, a = o.isFavorite;
                t.setData({
                    otherShopInfo: o,
                    isFavorite: a
                });
            } else i.owl.error.addError("shopother请求数据异常: ", JSON.stringify(e.statusCode)), 
            m.log("shopother请求数据出错: " + JSON.stringify(e));
        }).catch(function(t) {
            m.log("shopother请求catch:", JSON.stringify(t));
        });
    },
    fetchMapiShopInfo: function(t) {
        var a = this, s = e({}, t);
        s.shopUuid ? delete s.shopId : s.shopid = t.shopId, s.token = v.getToken();
        var n = o.geo.getLocationCacheSync();
        if (n && this.setData({
            hasLocation: !0
        }), s.lat = n && n.latitude || 0, s.lng = n && n.longitude || 0, m.log("detail shopMapi params: " + JSON.stringify(t)), 
        this.fetchData(s), !n) {
            var r = Date.now();
            o.geo.getCity().then(function() {
                var t = o.geo.getLocationSync();
                s.lat = t && t.latitude || 0, s.lng = t && t.longitude || 0, a.fetchData(s, {
                    hasLocation: !0
                }), i.owl.resource.addApi({
                    name: "geo",
                    responseTime: Date.now() - r,
                    networkCode: 200
                }), a.setData({
                    hasLocation: !0
                });
            }, function() {
                i.owl.resource.addApi({
                    name: "geo",
                    responseTime: Date.now() - r,
                    networkCode: 500
                });
            }).catch(function(t) {
                m.log("获取经纬度失败：", t);
            });
        }
    },
    fetchData: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.shopUuid || e.shopId, d = Date.now();
        this.params = Object.assign({}, e, this.params || {}), e.mtsiReferrer = encodeURIComponent(c(I, this.options)), 
        e.cookieid = v.getUUID();
        var h = r.API.MAPI_SHOP_INFO, p = r.MAPI_DOMAIN + h, u = encodeURIComponent(s.default.r(e));
        e._token = u;
        var l = {
            isError: !1,
            iconType: "1",
            description: "哎呀，页面加载失败了"
        };
        o.request.mapi({
            url: p,
            data: e
        }, {
            cache: "dp_detail_shopmapi_" + n
        }).then(function(s) {
            i.owl.pageSpeed.addPoint({
                position: 3,
                duration: Date.now() - d
            }), m.log("detail mapiheader: " + s.statusCode), s && 200 == s.statusCode && s.data ? (t.parseMapiShopInfo(s.data, a), 
            l.isError = !1, t.setData({
                isMapiError: !1,
                mapiError: l
            })) : (l.isError = !0, t.setData({
                isMapiError: !0,
                mapiError: l
            }), i.owl.error.addError("mapiheader服务出错:", JSON.stringify(s)), m.log("detail mapi服务出错: " + JSON.stringify(s)), 
            wx.reportMonitor && wx.reportMonitor("mapiHeaderError", 1)), s.data && s.data.code && -1 !== [ 77, 150, 223, 296, 369 ].indexOf(s.data.code) && (e.openId = o.login.getOpenIdSync(), 
            e.token = o.login.getTokenSync(), e._token = u, i.owl.error.addError("mapiheader命中反扒:", JSON.stringify(e)), 
            wx.reportMonitor && wx.reportMonitor("mapicrawl", 2));
        }).catch(function(e) {
            i.owl.pageSpeed.addPoint({
                position: 3,
                duration: Date.now() - d
            }), t.data.isCache || t.data.islistcache || (l.isError = !0, l.description = "哎呀，你的网络好像出问题了", 
            t.setData({
                isMapiError: !0,
                mapiError: l
            }), m.log("detail mapi服务出错: " + JSON.stringify(e)), wx.reportMonitor && wx.reportMonitor("mapiHeaderCatch", 0));
        });
    },
    parseMapiShopInfo: function(t, e) {
        var o = this;
        t.doFetch = !0;
        var a = [], s = void 0, r = 2;
        if (t.recentBizTime) {
            var h = t.recentBizTime.title;
            r = h.length <= 15 ? 2 : h.length <= 20 ? 1 : 0, a[0] = t.recentBizTime, s = t.cruxFeatures && t.cruxFeatures.filter(function(t, e) {
                return e < r;
            });
        } else s = t.cruxFeatures && t.cruxFeatures.filter(function(t, e) {
            return e < 3;
        });
        if (a = s && s.length > 0 ? a.concat(s) : a, t.keyServices = a, t.shopServeInfoUrl) {
            var p = t.shopServeInfoUrl.split("="), c = p.length >= 2 ? decodeURIComponent(p[1]) : void 0;
            t.shopServeInfoUrl = c;
        }
        a.length > 0 && (t.hasKeyService = !0), t.address && t.address.length > 0 && (t.hasShopMap = !0), 
        t.hasLocation = e.hasLocation;
        var u = t.geoPoint && t.geoPoint.coordType, l = t.geoPoint && t.geoPoint.lat, f = t.geoPoint && t.geoPoint.lng, g = t.id || t.shopuuid, m = encodeURIComponent(t.name), S = encodeURIComponent(t.address);
        t.shopSchema = "dianping://shopinfo?id=" + g, t.mapSchema = "dianping://mapnavigation?shopid=" + g + "&shopname=" + m + "&coordertype=" + u + "&tolocation=" + l + "," + f + "&toaddress=" + S, 
        t.listPic = this.data.mApiShopInfo && this.data.mApiShopInfo.listPic || d.DEFAULT_PIC, 
        e.hasLocation ? this.setData({
            route: t.route || ""
        }) : (this.setData({
            mApiShopInfo: t,
            route: t.route || ""
        }, function() {
            o.data.isCache || i.owl.pageSpeed.addFirstContentfulPaint("mapiHeader"), o.drawShareCard(t);
        }), n.default.setStorageShop(this.shopUuid || this.shopId, {
            mApiShopInfo: t
        }));
    },
    promptMask: function() {
        this.setData({
            hasMask: !0
        });
    },
    hideMask: function() {
        this.setData({
            hasMask: !1
        });
    },
    onPageScroll: function() {
        g.triggerScroll(), this.selectComponent("#quick-nav") && this.selectComponent("#quick-nav").pageScroll();
    },
    dealOptions: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e.shopId, s = e.mtShopId, n = e.shopUuid || e.shopuuid;
        return new Promise(function(d) {
            if (n) e.shopuuid = n, e.shopUuid = n, e.shopId = n, d(e); else if (a) e.shopId = a, 
            e.shopUuid = a, e.shopuuid = a, d(e); else if (e.scene) {
                var h = l.parse(e.scene);
                a = parseInt(h.id || h.shopId), e.shopId = a, d(e);
            } else {
                if (!(s = parseInt(e.mtShopId))) return void t.setData({
                    isError: !0
                });
                o.request.mina({
                    url: r.DOMAIN + r.API.MTSHOP_PARSE,
                    data: {
                        mtShopId: s
                    }
                }).then(function(o) {
                    o && o.data && 200 == o.data.code ? (e.shopUuid = o.data.shopUuid, e.shopuuid = o.data.shopUuid, 
                    e.shopId = o.data.shopUuid, d(e)) : (t.setData({
                        isError: !0
                    }), i.owl.error.addError("MTShop解析出错", JSON.stringify(o)));
                }).catch(function(e) {
                    t.setData({
                        isError: !0
                    }), i.owl.error.addError("[MTShop Parse Error]", JSON.stringify(e));
                });
            }
        });
    },
    slot2Module: function(t) {
        var e = {};
        return (t = t || this.defaultSlots).map(function(t) {
            t && t.name && (e[t.name] = t.config || t.name);
        }), e;
    },
    aduInit: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = {
            adshop_id: this.shopUuid || this.shopId,
            pageName: I
        };
        a.default.init(t, e);
    },
    allReviewTap: function(t) {
        var e = t.currentTarget.dataset.type;
        u.moduleClick("b_4sho1bz2", this.data.lxdata);
        var o = void 0;
        o = this.data.loadOptions && this.data.loadOptions.shopUuid ? "shopUuid=" + this.data.loadOptions.shopUuid : "shopId=" + this.data.loadOptions.shopId, 
        S({
            url: "/packages/ugc/pages/reviewlist/reviewlist?" + o + "&msource=wxappmain&tagType=" + e + "&tag=" + encodeURIComponent("全部")
        });
    },
    onTapPage: function(t) {
        s.default.t(t);
    },
    onTouchMovePage: function(t) {
        s.default.m(t);
    },
    updateAppLaunch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 60, e = !0, a = this.data.shopInfo && this.data.shopInfo.appLaunchSwitch;
        if (a && "off" === a) return a = !1;
        try {
            var i = o.cache.getStorageSync("dp_launch_switch") || "";
            if (i) {
                var s = new Date(), n = s.getHours(), r = s.getMinutes() + 60 * n, d = i.lastModifyTime;
                Math.abs(d - r) < t && (e = i.canLaunchApp);
            }
        } catch (t) {}
        return e;
    },
    drawShareCard: function(t) {
        var e = this;
        o.login.getUserInfo().then(function(t) {
            if (200 === t.code) {
                var o = t.dpUser.userId;
                e.setData({
                    userId: o
                });
            }
        }).catch(function(t) {
            m.log("draw card get userinfo error: ", JSON.stringify(t));
        });
        var a = wx.getSystemInfoSync().windowWidth / 750;
        if (a) {
            var i = "";
            t.categoryName ? (i += t.categoryName, t.regionName && (i += "   " + t.regionName)) : t.regionName && (i += "" + t.regionName);
            var s = t.advancedPics && t.advancedPics[0] && t.advancedPics[0].thumbUrl || t.defaultPic, n = {
                canvasId: "myCanvas",
                width: 420 * a,
                height: 336 * a,
                saveToAlbum: !1,
                needSave: !0,
                configs: [ {
                    drawType: "image",
                    url: f(s),
                    dx: 0,
                    dy: 0,
                    dHeight: 336 * a,
                    dWidth: 420 * a
                }, {
                    drawType: "image",
                    type: "mask",
                    dx: 0,
                    dy: 220 * a,
                    dHeight: 118 * a,
                    dWidth: 480 * a
                }, {
                    drawType: "image",
                    url: "https://www.dpfile.com/app/app-m-module-img/star/star-" + t.shopPower + ".png",
                    dx: 12 * a,
                    dy: 240 * a,
                    dHeight: 30 * a,
                    dWidth: 160 * a
                }, {
                    drawType: "text",
                    text: t.priceText,
                    x: 186 * a,
                    y: 264 * a,
                    color: "#FFFFFF",
                    size: 24 * a
                }, {
                    drawType: "text",
                    text: i,
                    x: 12 * a,
                    y: 314 * a,
                    color: "#FFFFFF",
                    size: 24 * a
                } ]
            };
            this.setData({
                canvasConfig: n
            });
        }
    },
    getShareTitle: function(t) {
        var e = t.detail.shareTitle;
        e && this.setData({
            shareTitle: e
        });
    },
    launchAppTap: function() {
        var t = this;
        try {
            var e = new Date(), a = e.getHours(), i = e.getMinutes();
            o.cache.setStorage("dp_launch_switch", {
                lastModifyTime: 60 * a + i,
                canLaunchApp: !1
            });
        } catch (t) {}
        setTimeout(function() {
            t.setData({
                canLaunchApp: !1
            });
        }, 2e3);
    },
    saveCanvas: function(t) {
        var e = t.detail.url;
        e ? this.setData({
            sharePicPath: e
        }) : this.setData({
            sharePicPath: ""
        });
    },
    headHide: function() {
        wx.setNavigationBarTitle({
            title: this.data.mApiShopInfo && this.data.mApiShopInfo.name || "大众点评"
        });
        var t = this.data && this.data.mApiShopInfo;
        this.data.showAddToVoteBtn && this.setData({
            showAddBtn: !0,
            shopName: t && t.name || "",
            shopIntro: t && t.address && t.categoryName && t.address + " " + t.categoryName || ""
        });
    },
    headShow: function() {
        wx.setNavigationBarTitle({
            title: "大众点评"
        }), this.data.showAddToVoteBtn && this.setData({
            showAddBtn: !1
        });
    },
    addToVote: function(t) {
        console.log(t), this.setData({
            showToast: !0
        });
    },
    handleVoteList: function(t) {
        console.log(t);
        var e = this.data.mApiShopInfo && 10 == this.data.mApiShopInfo.shopType && t.detail.shouldShowAddToVoteBtn, o = !0;
        t.detail.showGuide && (o = !1), this.setData({
            voteList: t.detail.voteList,
            myValidVoteList: t.detail.myValidVoteList,
            showAddToVoteBtn: e,
            shouldShowDinvote: o
        });
    },
    catchTouchmove: function() {},
    closeToast: function() {
        this.setData({
            showToast: !1
        });
    },
    addPoiToVote: function(t) {
        var e = t.currentTarget.dataset && t.currentTarget.dataset.voteid, a = this.shopUuid || this.shopId, i = this.data.voteList.filter(function(t) {
            return t.voteId === e;
        }), s = i && i[0].shopUuids;
        e && a ? (s.push(a), o.request.custom({
            url: r.DOMAIN + r.API.CREATE_VOTE,
            data: {
                voteId: e,
                voteTitle: i[0].voteTitle,
                shopIdList: s.join(","),
                v: 2
            }
        }).then(function(t) {
            t && 200 === t.data.code ? i && i[0] && 1 == i[0].masterGuestState ? S({
                url: "/packages/dinevote/pages/voteshare/voteshare?voteId=" + e + "&from=create&showAddBtn=true"
            }) : i && 2 == i.masterGuestState && S({
                url: "/packages/dinevote/pages/voteshare/voteshare?voteId=" + e + "&from=create"
            }) : wx.showToast({
                title: "加入投票失败",
                icon: "none"
            });
        })) : wx.showToast({
            title: "加入投票错误",
            icon: "none"
        });
    },
    onReady: function() {
        var t = wx.getSystemInfoSync() || {}, e = !1;
        t.model && -1 != t.model.indexOf("iPhone X") && (e = !0), this.setData({
            isIpx: e
        });
    }
};

D = h(D), module.exports = D;