var e = require("../../../../npm/@dp/sparrow/index.js"), a = require("../../../../common/request"), i = require("../../../../config/index"), t = require("../../../../common/nav"), o = require("../../../../common/relation-behavior"), r = {
    orderFoodMVBid: "b_mt8im0yx",
    orderFoodMCBid: "b_pkt3biiy",
    reserveMVBid: "b_gq1h78wz",
    reserveMCBid: "b_t22rftv6",
    waimaiViewBid: "b_b069suod",
    waimaiMCBid: "b_w3qub9nz",
    queueMVBid: "b_4i81yqw2",
    queueMCBid: "b_okxq3cp6"
}, n = {
    SHOP_SERVICE: "/wxmapi/shop/shopservice"
};

Component({
    relations: {
        "../shop-slot/shop-slot": {
            type: "ancestor"
        }
    },
    behaviors: [ o ],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        lxData: {
            type: Object
        }
    },
    data: {
        showModule: !1
    },
    ready: function() {
        console.log("【shop-service ready】");
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _shopOptionsChange: function(a, i) {
            var t = this;
            if (a) {
                var o = {}, r = a.shopId, n = a.shopUuid;
                n ? o.shopUuid = n : o.shopId = r;
                var s = e.geo.getLocationCacheSync();
                o.lat = s && s.latitude, o.lng = s && s.longitude, this.fetchData(o), s || e.geo.getLocation().then(function(e) {
                    o.lat = e && e.latitude, o.lng = e && e.longitude, t.fetchData(o);
                }).catch(function(e) {
                    console.log("获取经纬度失败：", e);
                });
            }
        },
        shopServiceTap: function(a) {
            var i = a.currentTarget.dataset.service || {};
            "reserve" === i.serviceName ? (e.lxmina.moduleClick(r.reserveMCBid, this.data.lxData), 
            this._gotoWebView(i.redirectURL)) : "queue" === i.serviceName ? (e.lxmina.moduleClick(r.queueMCBid, this.data.lxData), 
            this._gotoWebView(i.clickUrl)) : "takeaway" === i.serviceName ? (e.lxmina.moduleClick(r.waimaiMCBid, this.data.lxData), 
            this._gotoWebView(i.url)) : "orderfood" === i.serviceName && (e.lxmina.moduleClick(r.orderFoodMCBid, this.data.lxData), 
            this.data.isNewNav || this._gotoMiniProgram(i.jumpData && i.jumpData.appId, i.jumpData && i.jumpData.path, {
                from: "dianping-wxapp"
            }));
        },
        fetchData: function(i) {
            var t = this;
            a({
                url: this._getDomain() + n.SHOP_SERVICE,
                data: i
            }).then(function(a) {
                if (a && a.data && 200 == a.data.code && a.data.serviceData) {
                    var i = a.data.serviceData, o = !!i.length, n = {}, s = !0;
                    if (i[0] && i[0].isHobbitShop) {
                        (n = i[0].jumpData).extraData = Object.assign({}, {
                            from: "dianping-wxapp"
                        }, n.params);
                        var d = wx.getSystemInfoSync().SDKVersion;
                        -1 === e.semver.compare(d, "2.0.7") && (s = !1);
                    }
                    t.setData({
                        serviceData: i,
                        showModule: o,
                        isNewNav: s,
                        miniData: n
                    }), i.hasOrderFood && e.lxmina.moduleView(r.orderFoodMVBid, t.data.lxData), i.hasReserve && e.lxmina.moduleView(r.reserveMVBid, t.data.lxData), 
                    i.hasQueue && e.lxmina.moduleView(r.queueMVBid, t.data.lxData);
                }
            }).catch(function(e) {
                console.log("商户服务信息有误", e);
            });
        },
        _gotoWebView: function(e) {
            e && t({
                url: "/pages/webview/webview?url=" + encodeURIComponent(e)
            });
        },
        _gotoMiniProgram: function(e, a, i) {
            wx.navigateToMiniProgram({
                appId: e,
                path: a,
                extraData: i
            });
        },
        _getDomain: function() {
            return i.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        }
    }
});