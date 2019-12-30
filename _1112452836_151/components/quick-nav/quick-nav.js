var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = require("../../npm/@dp/sparrow/index.js"), a = require("../../npm/@dp/owl-wxapp/es6/index.js"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/shopid")), i = require("../../utils/npm/lx-analytics"), o = require("../../common/request"), s = require("../../public/logan"), h = require("../../config/index"), r = {
    quickShow: "b_m044kn8f",
    toHome: "b_wh0mvhma",
    quickNav: "b_eelezy85",
    openApp: "b_5h0khlcm",
    openFail: "b_45o83t0q",
    openAppView: "b_xic98hzq",
    contentView: "b_6208n442",
    searchClick: "b_7hevuksl",
    searchView: "b_gan8gbjn",
    yyView: "b_uvmep2g4",
    yyClick: "b_zcwg317n"
}, c = [ {
    type: 2,
    name: "去首页",
    url: "/pages/index/index",
    show: !0,
    imageUrl: "https://p0.meituan.net/mobilem/dd0d39793de0eb31a2fead6290e5ec951024.png"
} ];

Component({
    properties: {
        launchAppUrl: {
            type: String,
            observer: "_launchAppChange"
        },
        shopOptions: {
            type: Object,
            observer: "_shopOptionChange"
        },
        scene: {
            type: Number,
            observer: "_sceneChange"
        },
        lxData: {
            type: Object
        },
        showMore: {
            type: Boolean,
            observer: "_showMoreChange"
        },
        position: {
            type: Object,
            observer: "_positionChange"
        }
    },
    data: {
        defaultShow: !1,
        showContent: !1,
        isShow: !1,
        appUrl: "",
        showApp: !1,
        scene: 0,
        quickConfig: [],
        defaultConfig: c
    },
    ready: function() {
        var a = this;
        try {
            var n = getApp().getShowOptions();
            n && n.scene && this.setData({
                showApp: 1036 == n.scene,
                scene: n.scene
            });
            var c = getCurrentPages() || [], u = null, g = !1;
            c.length && (u = c[0].route), -1 !== [ "pages/ranklist/ranklist", "pages/index/index", "pages/my/my", "dynamic-page/index", "pages/group/group" ].indexOf(u) && (g = !0);
            var p = 0, l = function(e) {
                return p = 0, e.quickConfig.forEach(function(e) {
                    if (e.show && (p += 100, e.hideWx && 1036 != n.scene && (p -= 100), "搜索" === e.name && i.moduleView(r.searchView, a.data.lxData || {}), 
                    3 === e.type)) {
                        var o = t({}, a.data.lxData);
                        o.viewName = e.name, i.moduleView(r.yyView, o || {});
                    }
                }), p;
            }, d = function() {
                return new Promise(function(t) {
                    var r = i.get("utm"), c = n.scene, u = e.pageUtil.getCurrentPage() && e.pageUtil.getCurrentPage().__route__;
                    o({
                        url: h.DOMAIN + h.API.QUICK_CONFIG,
                        data: {
                            pageRoute: u,
                            scene: c,
                            utm_source: r && r.utm_source
                        }
                    }).then(function(e) {
                        if (e && 200 === e.data.code && e.data.config) {
                            var n = e.data.bonusLxBid || "", o = e.data.hongbaoData || {};
                            a.setData({
                                bonusLxBid: n,
                                hongbaoData: o,
                                showBig: o.showBig
                            }, function() {
                                n && n.mvBid && i.moduleView(n.mvBid);
                            });
                            var h = JSON.parse(e.data.config);
                            s.log("读取配置成功！" + JSON.stringify(e.data)), t(h);
                        } else s.log("读取配置失败！" + JSON.stringify(e.data)), console.log("读取配置失败"), t(!1);
                    }).catch(function(e) {
                        s.log("读取配置失败:" + JSON.stringify(e)), console.log("读取配置失败~"), t(!1);
                    });
                });
            }, f = function(t) {
                t ? (t.quickConfig.length && (p = l(t)), a.setData({
                    quickConfig: t.quickConfig.length ? t.quickConfig : [],
                    defaultConfig: t.defaultConfig.length ? t.defaultConfig : [],
                    contentHeight: 1036 == n.scene ? p : p - 100,
                    isShow: !g && (!!a.data.showMore || !(!c || 1 !== c.length))
                })) : a.setData({
                    isShow: !g && (!!a.data.showMore || !(!c || 1 !== c.length)),
                    defaultShow: !0
                });
            };
            this.data.showMore ? this.getQuickCache().then(function(t) {
                if (t && t.data) {
                    var e = t.data;
                    p = l(e._quickConfig);
                    var i = e._quickConfig;
                    a.setData({
                        quickConfig: i.quickConfig.length ? i.quickConfig : [],
                        defaultConfig: i.defaultConfig.length ? i.defaultConfig : [],
                        contentHeight: 1036 == n.scene ? p : p - 100,
                        isShow: !g && (!!a.data.showMore || !(!c || 1 !== c.length))
                    }), d().then(function(t) {
                        t && (l(t), a.setQuickCache(t));
                    });
                } else d().then(function(t) {
                    t && (f(t), a.setQuickCache(t));
                });
            }).catch(function() {
                d().then(function(t) {
                    t && (f(t), a.setQuickCache(t));
                });
            }) : this.setData({
                quickConfig: [],
                defaultShow: !0,
                isShow: !g && (!!this.data.showMore || !(!c || 1 !== c.length))
            }), this.data.isShow && i.moduleView(r.quickShow, this.data.lxData || {}), this.data.showApp && i.moduleView(r.openAppView, this.data.lxData || {});
        } catch (t) {
            console.log("ready fail" + JSON.stringify(t));
        }
    },
    moved: function() {},
    detached: function() {},
    methods: {
        setQuickCache: function(t) {
            return new Promise(function(a, n) {
                e.wxp.setStorage({
                    key: "quickConfig",
                    data: {
                        _quickConfig: t
                    }
                }).then(function() {
                    a();
                }).catch(function(t) {
                    n(t);
                });
            });
        },
        getQuickCache: function() {
            return new Promise(function(t, a) {
                e.wxp.getStorage({
                    key: "quickConfig"
                }).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    a(t);
                });
            });
        },
        _sceneChange: function(t, e) {
            try {
                if (t && 1036 === t) this.setData({
                    showApp: !0,
                    scene: t
                }); else {
                    var a = 0;
                    this.data.quickConfig.forEach(function(e) {
                        e.show && (a += 100, e.hideWx && 1036 != t && (a -= 100));
                    }), this.setData({
                        showApp: !1,
                        contentHeight: a - 100,
                        scene: t
                    });
                }
            } catch (t) {
                s.log("获取场景值err:" + JSON.stringify(t));
            }
        },
        _showMoreChange: function(t, e) {
            if (t && 1 == t) {
                var a = getCurrentPages() || [], n = null;
                a.length && (n = a[0].route), this.setData({
                    showContent: "pages/index/index" !== n && t
                }), "pages/index/index" !== n && t && i.moduleView(r.contentView, this.data.lxData || {});
            }
        },
        _launchAppChange: function(t, e) {
            try {
                t && this.setData({
                    appUrl: t
                });
            } catch (t) {
                s.log("获取appurl err:" + JSON.stringify(t));
            }
        },
        _shopOptionChange: function(t, e) {
            var a = this;
            try {
                var i = this.data.appUrl;
                if (i) return;
                var c = void 0, u = void 0, g = "c_1ilqz4n8:" + r.openApp + ":weixin:wxapp";
                if (t) if (u = t.shopUuid, c = t.shopId, 1036 === this.data.scene) {
                    var p = u || c;
                    n.default.isUuid(p) ? o({
                        url: h.DOMAIN + h.API.QUICK_SHOPID,
                        data: {
                            shopUuid: p
                        }
                    }).then(function(t) {
                        if (t && 200 === t.data.code) {
                            var e = void 0;
                            e = t.data.shopSchema ? t.data.shopSchema : t.data.shopId ? "dianping://shopinfo?id=" + t.data.shopId + "&utm=" + g : "dianping://home?utm=" + g, 
                            i = e, a.setData({
                                appUrl: i
                            }), s.log("唤起appUrl:" + JSON.stringify(i));
                        }
                    }).catch(function(t) {
                        i = "dianping://home", a.setData({
                            appUrl: i
                        }), s.log("获取shopid失败:" + JSON.stringify(t) + JSON.stringify(i));
                    }) : (console.log("已有shopid" + JSON.stringify(c)), i = "dianping://shopinfo?id=" + c + "&utm=" + g, 
                    this.setData({
                        appUrl: i
                    }), s.log("已有shopid" + JSON.stringify(i)));
                } else this.setData({
                    showApp: !1
                }); else this.setData({
                    showApp: !1
                });
            } catch (t) {
                this.setData({
                    showApp: !1
                }), s.log("observer shopid err:" + JSON.stringify(t));
            }
        },
        handelTap: function(t) {
            var a = t.currentTarget.dataset.name, n = t.currentTarget.dataset.url, o = t.currentTarget.dataset.type, h = void 0;
            "hongbao" == o && (this.setData({
                showBig: !0,
                hongbaoData: Object.assign({}, this.data.hongbaoData, {
                    showBig: !0,
                    needPop: !0
                })
            }), this.data.bonusLxBid && this.data.bonusLxBid.mcBid && i.moduleClick(this.data.bonusLxBid.mcBid)), 
            3 == o ? h = r.yyClick : 2 == o && (h = "搜索" === a ? r.searchClick : r.toHome), 
            s.log("点击快捷导航:" + a);
            try {
                i.moduleClick(h, this.data.lxData || {}), e.navigation.navigateTo({
                    url: n
                });
            } catch (t) {
                s.log("点击快捷导航:" + a), console.log("点击快捷导航:" + a + JSON.stringify(t));
            }
        },
        showcontent: function(t) {
            s.log("快捷导航:点击展开快捷导航"), this.data.showContent || i.moduleClick(r.quickNav, this.data.lxData || {}), 
            this.setData({
                showContent: !this.data.showContent
            });
        },
        applxclick: function() {
            i.moduleClick(r.openApp, this.data.lxData || {}), a.owl.resource.addApi({
                name: "quickNav_launchApp",
                statusCode: 200
            }), this.triggerEvent("launchtap");
        },
        launchAppError: function(e) {
            s.log("快捷导航:唤起app失败" + JSON.stringify(e));
            var n = t({}, this.data.lxData);
            e && e.detail && e.detail.errMsg ? n.errMsg = e.detail.errMsg : n.errMsg = "launch fail";
            var o = wx.getSystemInfoSync();
            o && (n.sysInfo = o), i.moduleClick(r.openFail, n), wx.showToast({
                title: "唤起App失败",
                icon: "none"
            }), a.owl.resource.addApi({
                name: "quickNav_launchApp",
                statusCode: 500,
                content: e && e.detail && e.detail.errMsg || ""
            }), console.log("唤起App失败", JSON.stringify(e));
        },
        onPopupClose: function() {
            this.setData({
                showBig: !1
            }), this.triggerEvent("close");
        },
        pageScroll: function(t) {
            this.data.showContent && this.setData({
                showContent: !this.data.showContent
            });
        }
    }
});