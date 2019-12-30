var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, t = require("../../npm/@dp/sparrow/index.js"), a = require("../../config/index"), i = require("../../utils/lx_wrap"), n = getApp(), o = {
    "pages/index/index": {
        type: 1,
        cacheKey: "dp_index_myminitip_time",
        viewBid: "b_ox9z2s4t",
        clickBid: "b_4fplonic"
    },
    "pages/detail/detail": {
        type: 2,
        cacheKey: "dp_detail_myminitip_time",
        viewBid: "b_bvgxe98r",
        clickBid: "b_30dyb6h8"
    },
    "packages/order/pages/payment/payment": {
        type: 2,
        cacheKey: "dp_pay_myminitip_time",
        viewBid: "b_4d5xruq9",
        clickBid: "b_t5tftz31"
    }
}, c = [ "dp_defaultbubble_times", "dp_myminitipbubble_times" ], s = void 0, r = void 0, p = 0, h = null;

Component({
    properties: {
        pageUrl: {
            type: String,
            value: "",
            observer: "_dataChange"
        },
        hasPopup: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showModule: !1
    },
    attached: function() {
        p = n.getShowOptions() && n.getShowOptions().scene ? parseInt(n.getShowOptions().scene) : 0;
    },
    methods: {
        _dataChange: function(e, a) {
            var i = this;
            e && ("packages/order/pages/payment/payment" == e && t.event.on("popupClose", function() {
                h = i.setDisappear();
            }), this.checkCache(e) ? this.getSystemInfo().then(function(t) {
                i.checkShow(t, e);
            }) : this.triggerEvent("nominitip"));
        },
        checkCache: function(e) {
            var a = !1, i = o[e], n = i.type, p = i.cacheKey, h = t.cache.getStorageSync(p);
            return s = t.cache.getStorageSync(c[0]) || 0, r = t.cache.getStorageSync(c[1]) || 0, 
            (!h || 2 == n && Date.now() - h >= 864e6 && (s < 3 || r < 3)) && (a = !0), a;
        },
        checkShow: function(n, c) {
            var d = this, u = o[c];
            t.request.custom({
                url: a.DOMAIN + a.API.MYMINI_TIP,
                data: e({}, n, {
                    pageUrl: c,
                    scene: p
                })
            }).then(function(e) {
                if (e && 200 == e.statusCode && e.data && 200 == e.data.code && e.data.canShow) {
                    var t = e.data.bubbleType, a = 0;
                    0 == t && (a = s), 1 == t && (a = r), (1 == u.type || a < 3) && (d.setData({
                        showModule: !0,
                        type: u.type,
                        text: e.data.text || ""
                    }), 1 == u.type && d.triggerEvent("noscroll", {
                        isMyMiniTip: !0
                    }), d.setTipCache(u, e.data), 2 == u.type && (h = d.setDisappear()), i.moduleView(u.viewBid));
                } else d.setData({
                    showModule: !1
                }), 1 == u.type && d.triggerEvent("nominitip");
            }).catch(function(e) {
                console.log("获取提示数据出错", e);
            });
        },
        setDisappear: function() {
            var e = this;
            return this.data.showModule || this.setData({
                showModule: !0
            }), h && clearTimeout(h), setTimeout(function() {
                e.setData({
                    showModule: !1
                });
            }, 5e3);
        },
        setTipCache: function(e, a) {
            var i = e.type, n = e.cacheKey;
            if (t.cache.setStorage(n, Date.now()), 2 == i) {
                var o = a.bubbleType, p = o ? ++r : ++s;
                t.cache.setStorage(c[o], p);
            }
        },
        getSystemInfo: function() {
            return new Promise(function(e, a) {
                t.wxp.getSystemInfo().then(function(t) {
                    t && t.version && t.platform ? e({
                        wxversion: t.version,
                        system: t.platform
                    }) : a({
                        err: "无相关系统信息"
                    });
                }).catch(function(e) {
                    console.log("获取手机系统信息失败", e), a({
                        err: e
                    });
                });
            });
        },
        closeTap: function() {
            var e = o[this.data.pageUrl];
            this.setData({
                showModule: !1
            }), 1 == e.type && this.triggerEvent("close"), i.moduleClick(e.clickBid);
        }
    }
});