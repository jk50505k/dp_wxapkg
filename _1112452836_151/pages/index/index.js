var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }
    return t;
}, e = require("../../npm/@dp/sparrow/index.js"), i = require("../../npm/@dp/owl-wxapp/es6/index.js"), n = require("../../common/pinkie"), o = require("../../utils/compose"), a = require("../../utils/distance"), s = require("../../npm/@dp/logan-wxapp/build/wxlogan.js"), c = require("../../common/tabbar"), r = require("../../components/midas/midas.outlet.js"), g = !1, d = null, l = void 0, u = void 0, p = {
    pageBid: "c_byflwzc8",
    cityChangeBid: "b_mcg2qgj7",
    myListBid: "b_2zgzhm9s",
    shareBid: "b_c54t58m3",
    searchBoxMCBid: "b_dps4vual",
    searchBoxMVBid: "b_9x08im74"
}, h = {
    data: {
        loadOptions: {},
        hotSearch: [],
        pageUrl: "pages/index/index",
        msource: "dp-wxapp",
        debug: getApp().isDebug()
    },
    onShareAppMessage: function() {
        e.lxmina.moduleClick(p.shareBid);
        var t = e.lxmina.getSharePath("/pages/index/index");
        return s.log("sharePath===>" + t), {
            title: "大众点评",
            desc: "品质生活，触手可及",
            path: t
        };
    },
    onLoad: function() {
        var n = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = (u = getApp()).getShowOptions() && u.getShowOptions().scene ? parseInt(u.getShowOptions().scene) : null;
        this.channel = 1019 === a ? "wx_wallet" : "", i.owl.pageSpeed.createFirstContentfulPaint([ "category" ], 1), 
        i.owl.pageSpeed.createFirstContentfulPaint([ "category", "activity" ], 2), i.owl.pageSpeed.createFirstContentfulPaint([ "category", "activity" ], 9), 
        i.owl.pageSpeed.createFirstContentfulPaint([ "category", "group", "activity" ], 13), 
        i.owl.pageSpeed.createFirstContentfulPaint([ "category", "group", "activity", "sceneRecommend" ], 10), 
        i.owl.pageSpeed.createFirstContentfulPaint([ "category", "group", "activity", "guessLike", "sceneRecommend" ], 8), 
        this.setData({
            loadOptions: Object.assign({}, o),
            debug: u.isDebug()
        }), wx.getSetting && e.wxp.getSetting().then(function(t) {
            (g = void 0 == t.authSetting["scope.userLocation"] && !e.geo.getCitySync()) && i.owl.resource.addApi({
                name: "首次访问用户",
                statusCode: 200
            }), n.setData({
                isFirstLoad: g
            }), s.log("是否是初次加载:" + g);
        }).catch(function(t) {
            s.log("检测是否初次加载失败===>" + JSON.stringify(t));
        });
        var c = e.geo.getCitySync();
        c && c.cityId ? this.firstInit(o, c) : e.geo.getCity().then(function(t) {
            n.firstInit(Object.assign({
                hasLocated: !0
            }, o), t);
        }), setTimeout(function() {
            var i = u.getLxData();
            e.lxmina.moduleView(p.searchBoxMVBid, t({}, i, {
                time: new Date().getTime(),
                elementid: "search_entry",
                page_id: "index",
                user_id: wx.getStorageSync("dp_user") && wx.getStorageSync("dp_user").userId
            }));
        }, 0);
    },
    onShow: function() {
        if (e.lxmina.pageView(p.pageBid), "HIDE" === l) {
            l = "SHOW";
            var t = e.geo.getLocationSync();
            e.geo.getLocation({
                type: "wgs84"
            }).then(function(i) {
                var n = i;
                t && n && a(t, n) < 100 || (e.event.trigger("dp_locationChange", n), s.log("Index: 提示经纬度发生变更:" + JSON.stringify(e.geo)));
            }).catch(function(t) {
                s.log("[Update Geo Fail]===>" + JSON.stringify(t));
            });
        }
    },
    onHide: function() {
        l = "HIDE";
    },
    onPullDownRefresh: function() {
        s.log("IndexPage: 下拉刷新"), this._init({
            pullDown: !0
        }).then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.setData({
            reachBottom: !0
        });
    },
    onPageScroll: function() {
        r.triggerScroll();
    },
    firstInit: function(t, e) {
        if (d = Date.now(), this.setData({
            initFinishTime: d,
            city: e || {}
        }), s.log("IndexPage: 初始化init渲染"), s.log("IndexPage App Get City::" + JSON.stringify(e)), 
        e && e.cityId) {
            var i = Object.assign({
                city: e,
                channel: this.channel
            }, t);
            t && t.hasLocated ? this.setData({
                comOptions: i,
                groupOptions: i,
                guessOptions: i,
                popUpOptions: i
            }) : (this.setData({
                comOptions: i
            }), t.cacheCityLoaded = !0, t.comLoaded = !0, this._init(t));
        }
        c(this.route), this.bindEvent(), this.checkSupport();
    },
    bindEvent: function() {
        var t = this;
        e.event.on("cityChange", function(e) {
            t.cityRefresh(e);
        }), e.event.on("dp_locationChange", function(n) {
            var o = e.geo.getCityInfoSync();
            e.geo.getLocCity(n).then(function(e) {
                t.updateCity(o, e), s.log("IndexPage: 热启动定位切换城市，更新页面city:" + JSON.stringify(e));
            }).catch(function(t) {
                s.log("更新城市失败==>" + JSON.stringify(t)), i.owl.error.addError("更新城市失败", t, !0);
            });
        }), e.event.on("debugChange", function(e) {
            var i = e.oldVal, n = e.newVal;
            i != n && t.setData({
                debug: "boolean" == typeof n ? n : getApp().isDebug()
            });
        });
    },
    cityRefresh: function(t) {
        var i = this, n = t && t.cityId ? t : e.geo.getCitySync();
        this.setData({
            city: n
        }, function() {
            i.doFetch({
                cityChange: !0
            });
        }), s.log("IndexPage: 切换城市，更新页面city:" + JSON.stringify(n));
    },
    onExceptionEvent: function() {
        s.log("IndexPage: 金刚位异常，点击重新加载数据"), this._init({
            reLoad: !0
        });
    },
    _init: function() {
        var t = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = Object.assign({}, o, this.data.loadOptions);
        return this.data.isCategoryError && this.setCategoryState(), new n(function(n) {
            var o = e.geo.getCitySync();
            !o || !o.cityId || a && a.cacheCityLoaded || t.setData({
                city: o,
                comOptions: Object.assign({
                    city: o,
                    channel: t.channel
                }, a)
            }), e.geo.getLocationNoReject(t.data.dataFail ? {
                noCache: !0
            } : {}).then(function(i) {
                return s.log("IndexPage: 获取定位:" + JSON.stringify(i)), o && o.cityId && t.doListFetch(a), 
                e.geo.getLocCity(i || null);
            }).then(function(i) {
                t.doGroupFetch(a);
                var o = i;
                s.log("IndexPage: 定位城市信息:" + JSON.stringify(o)), s.log("IndexPage: 定位城市Info信息:" + JSON.stringify(e.geo.getLocCityInfoSync()));
                var c = e.geo.getLocCitySync();
                s.log("IndexPage: 缓存的定位城市信息:" + JSON.stringify(c)), o && o.cityId || !c || !c.cityId || (o = c);
                var r = e.geo.getCityInfoSync();
                s.log("IndexPage: 缓存城市信息:" + JSON.stringify(r));
                var g = r ? r.city : null;
                o && o.cityId && g && g.cityId && t.updateCity(r, o), t.doPopupFetch(a), n();
            }).catch(function(t) {
                s.log("[Index City Fail:]===>" + JSON.stringify(t)), i.owl.error.addError("IndexCityFail:", t, !0), 
                n();
            });
        });
    },
    doFetch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({
            city: this.data.city,
            channel: this.channel
        }, t, this.data.loadOptions);
        this.setData({
            comOptions: e,
            groupOptions: e,
            guessOptions: e
        });
    },
    doListFetch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({
            city: this.data.city
        }, t);
        this.setData({
            guessOptions: e
        });
    },
    doGroupFetch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.setData({
            groupOptions: t
        });
    },
    doPopupFetch: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({
            city: this.data.city
        }, t);
        this.setData({
            popUpOptions: e
        });
    },
    updateCity: function(t, n) {
        var o = this;
        try {
            var a = !1;
            if (a = t.isDefault ? t.city.cityId != n.cityId : t.city.cityId != n.cityId && new Date().getTime() - t.lastModify > 9e5, 
            s.log("IndexPage: 切换城市判断:" + JSON.stringify(a)), a && n.cityId && n.cityName) {
                s.log("IndexPage: 需要切换到城市:" + JSON.stringify(n)), this.setData({
                    lastCity: t.city,
                    nowCity: n
                }), e.geo.setCity(n, {
                    isDefault: !0
                });
                var c = setTimeout(function() {
                    o.setData({
                        lastCity: null
                    }), clearTimeout(c);
                }, 2e3);
            }
        } catch (t) {
            s.log("Index Switch City Fail===>" + JSON.stringify(t)), i.owl.error.addError("Index Switch City Fail:", t);
        }
    },
    changeCity: function() {
        e.navigation.navigateTo({
            url: "/packages/basic/pages/city/city"
        }), e.lxmina.moduleClick(p.cityChangeBid);
    },
    setCategoryState: function(t) {
        t && t.isError ? this.setData({
            isCategoryError: !0,
            categoryError: {
                iconType: 1
            },
            comOptions: null,
            groupOptions: null,
            guessOptions: null,
            popUpOptions: null
        }) : this.setData({
            isCategoryError: !1,
            categoryError: null
        });
    },
    onSearchShow: function() {
        e.navigation.navigateTo({
            url: "/pages/search/search?from=index"
        });
        var i = u.getLxData();
        e.lxmina.moduleClick(p.searchBoxMCBid, t({}, i, {
            time: new Date().getTime(),
            elementid: "search_entry",
            page_id: "index",
            user_id: wx.getStorageSync("dp_user") && wx.getStorageSync("dp_user").userId
        }));
    },
    checkSupport: function() {
        var t = this, i = setTimeout(function() {
            var n = void 0, o = !1;
            try {
                n = wx.getSystemInfoSync();
            } catch (t) {
                s.log("获取手机系统信息失败==>" + JSON.stringify(t));
            } finally {
                n && n.SDKVersion && (o = -1 !== e.semver.compare(n.SDKVersion, "2.0.7"));
            }
            t.setData({
                isSupportMiniPro: o
            }), clearTimeout(i);
        }, 0);
    },
    forbidScroll: function(t) {
        t.detail && t.detail.isMyMiniTip ? this.setData({
            hasTip: !0,
            popUpOptions: null,
            noScroll: !0
        }) : this.setData({
            hasTip: !1,
            noScroll: !0
        });
    },
    forbidMiniTip: function() {
        this.setData({
            showRedPocket: !0
        });
    },
    onPopupClose: function() {
        this.setData({
            noScroll: !1
        });
    },
    onCateFail: function() {
        this.setData({
            dataFail: !0
        });
    },
    onCateChange: function(t) {
        this.setCategoryState(t.detail);
    },
    onListExcReload: function() {
        var t = this.data.loadOptions;
        this.data.dataFail ? this._init() : this.doListFetch(t);
    }
};

h = o(h), (0, i.page)((0, e.pageBase)(h));