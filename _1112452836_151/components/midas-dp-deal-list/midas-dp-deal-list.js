function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = require("../../npm/@dp/sparrow/index.js"), a = require("../../config/index"), r = require("../../utils/lx_wrap"), n = require("../midas/midas.outlet"), i = require("../mina_lazyload_img/index.js").initInComponent;

Component({
    properties: {
        dealGroupId: {
            type: null,
            observer: "_dealGroupIdChange"
        },
        slotId: {
            type: null
        },
        shopId: {
            type: null
        },
        shopUuid: {
            type: null
        },
        shopCityId: {
            type: null
        },
        shopType: {
            type: null
        },
        categoryIds: {
            type: null
        },
        needStarAd: {
            type: null
        }
    },
    data: {
        moduleTitle: "",
        adMark: "",
        adItems: [],
        defaultImgUrl: "https://p1.meituan.net/emidasmanage/7191b02a0f5f012592eed992a29c37324108.png%40672w_330h_2e_1c_1l_85q%7Cwatermark%3D0",
        imgClass: "width:160rpx;height:160rpx;",
        starImgClass: "width:250rpx;height:250rpx;"
    },
    methods: {
        _dealGroupIdChange: function(e) {
            e && this.getData();
        },
        triggerScroll: function() {
            n.triggerScroll();
        },
        getData: function() {
            var n = this, d = a.VERSION, s = getApp().getLocation(), o = getApp().getCity(), p = getApp().getOpenId(), l = r.getLxCUID(), c = wx.getSystemInfoSync(), u = c.system.split(" ")[0] || "android", g = c.system.split(" ")[1], I = !0, y = {
                openid: p,
                cuid: l,
                cityId: o && o.cityId ? o.cityId : 0,
                lat: s && s.latitude ? s.latitude : 0,
                lng: s && s.longitude ? s.longitude : 0,
                appType: "DP_MAIN_WEIXIN",
                appVersion: d,
                osType: u.toUpperCase(),
                osVersion: g,
                ext: JSON.stringify({
                    needStarAd: n.data.needStarAd || !1
                })
            };
            [ "slotId", "dealGroupId", "shopId", "shopUuid", "shopCityId", "shopType", "categoryIds" ].forEach(function(t) {
                ("slotId" === t && !n.data[t] || "dealGroupId" === t && !n.data[t]) && (console.warn("缺少必填参数" + t), 
                I = !1), n.data[t] && Object.assign(y, e({}, t, n.data[t]));
            }), I && (wx.getNetworkType({
                success: function(e) {
                    Object.assign(y, {
                        connectionType: e.networkType.toUpperCase()
                    });
                }
            }), t.request.custom({
                url: a.MAPI_DOMAIN + "/baymax/getSlotAds",
                data: y
            }).then(function(e) {
                e.data && e.data.ads && e.data.ads.length > 0 ? (e.data.ads[0].adItems && e.data.ads[0].adItems.length > 0 && e.data.ads[0].adItems.forEach(function(e) {
                    e.jumpLink = e.creative.newLandingPage, e.creative.starAd || (parseInt(e.creative.currentPrice) % 1 == 0 && (e.creative.currentPrice = parseInt(e.creative.currentPrice)), 
                    parseInt(e.creative.marketPrice) % 1 == 0 && (e.creative.marketPrice = parseInt(e.creative.marketPrice)));
                }), n.setData(e.data.ads[0], function() {
                    i(n);
                })) : console.warn("推荐广告模块 获取广告数据为空！");
            }).catch(function(e) {
                console.warn(e || "推荐广告模块 获取广告数据失败！");
            }));
        }
    }
});