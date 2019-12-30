var e = require("../../npm/@dp/sparrow/index.js"), t = require("../../npm/@dp/owl-wxapp/es6/index.js"), r = require("../../npm/@dp/logan-wxapp/build/wxlogan.js"), o = require("../../config/index"), a = require("../../common/tabbar"), i = "GROUP_TAB_PAGE", n = {
    pageBid: "c_dianping_nova_7s5rihx8"
}, s = {
    data: {
        loading: !1,
        showWaterfallView: !1,
        styleConfig: {
            padding: {
                top: 15,
                bottom: 0,
                left: 15,
                right: 15
            },
            itemGap: 5
        },
        loadMore: !0,
        refresh: !1,
        isEnd: !1,
        pageError: !1,
        page: 1,
        error: null
    },
    systemInfo: {
        networkType: ""
    },
    onLoad: function(e) {
        a(this.route), this.init(e), this.bindEvent();
    },
    onShow: function() {
        var t = e.geo.getCitySync();
        e.lxmina.pageView(n.pageBid, {
            custom: {
                city_id: t && t.cityId || 0
            }
        });
    },
    onPullDownRefresh: function() {
        this.init({
            refresh: !0
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.showWaterfallView && this.data.loadMore && !this.data.isEnd && this.fetchPageData();
    },
    bindEvent: function() {
        var t = this;
        e.event.on("cityChange", function() {
            t.init({
                reload: !0
            });
        }), wx.onNetworkStatusChange(function(e) {
            e && (t.systemInfo.networkType = e.networkType || "");
        });
    },
    init: function() {
        var o = this, a = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}) || {}, n = [ e.geo.getLocationNoReject(this.data.error ? {
            noCache: !0
        } : {}), e.wxp.getNetworkType() ];
        a.refresh && !this.data.error || this.setData({
            loading: !0,
            showWaterfallView: !1,
            error: null
        }), Promise.all(n).then(function(t) {
            var a = t[0], n = t[1];
            return n && (o.systemInfo.networkType = n.networkType || ""), r.log(i + ": 定位信息:" + JSON.stringify(a)), 
            e.geo.getLocCity(a || null);
        }).then(function(e) {
            r.log(i + ": 定位城市信息:" + JSON.stringify(e)), o.fetchPageData(a);
        }).catch(function(e) {
            o.setData({
                loading: !1,
                showWaterfallView: !1,
                error: {
                    iconType: 1
                }
            }), r.log(i + ": 定位信息error:===>" + JSON.stringify(e)), t.owl.error.addError(i + ": 定位信息error", e, !0);
        });
    },
    fetchPageData: function() {
        var a = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = n && (n.refresh || n.reload) ? 1 : this.data.page, l = e.geo.getLocationSync(), d = e.geo.getLocCitySync(), g = e.geo.getCitySync();
        e.request.mina({
            url: o.DOMAIN + o.API.GROUP_FEEDS,
            data: {
                type: "group",
                lat: l ? l.latitude || "" : "",
                lng: l ? l.longitude || "" : "",
                locCityId: d && d.cityId || "",
                cityId: g && g.cityId || "",
                network: this.systemInfo.networkType,
                page: s
            }
        }).then(function(e) {
            if (e && 200 === e.statusCode && e.data && 200 === e.data.code) {
                var t = e.data.data;
                if (t && t.recordList && t.recordList.length) {
                    var o = {
                        list: t.recordList,
                        isEnd: t.isEnd,
                        refresh: 1 === s,
                        page: s + 1,
                        pageError: !1
                    };
                    1 === s && (o.showWaterfallView = !0, o.loading = !1), a.setData(o);
                } else 1 === s ? a.setData({
                    loading: !1,
                    showWaterfallView: !1,
                    error: {
                        iconType: 8,
                        description: "该城市无更多优惠，去逛逛本地美食吧~",
                        handlerText: "查看本地美食"
                    }
                }) : a.setData({
                    isEnd: !0,
                    refresh: !1,
                    pageError: !1
                });
            } else 1 === s ? a.setData({
                loading: !1,
                showWaterfallView: !1,
                error: {
                    iconType: 1
                }
            }) : a.setData({
                pageError: !0,
                refresh: !1
            }), r.log(i + ": 分页数据请求code异常:===>" + JSON.stringify(e));
        }).catch(function(e) {
            1 === s ? a.setData({
                loading: !1,
                showWaterfallView: !1,
                error: {
                    iconType: 1
                }
            }) : a.setData({
                pageError: !0,
                refresh: !1
            }), r.log(i + ": 分页数据请求error:===>" + JSON.stringify(e)), t.owl.error.addError(i + ": 分页数据请求error", e, !0);
        });
    },
    onExceptionEvent: function() {
        1 === this.data.error.iconType ? this.init({
            reload: !0
        }) : e.navigation.navigateTo({
            url: "/pages/list/list?categoryId=10"
        });
    },
    toFoodList: function() {
        e.navigation.navigateTo({
            url: "/pages/list/list?categoryId=10"
        });
    }
};

(0, t.page)((0, e.pageBase)(s));