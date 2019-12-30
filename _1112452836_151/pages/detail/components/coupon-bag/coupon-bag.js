var t = require("../../../../npm/@dp/sparrow/index.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../npm/@mtfe/wxapp-rohr/dist/rohr.js")), o = [ "getCitySync", "getCityCacheSync", "getLocCitySync", "getLocCityCacheSync" ], i = 1, n = void 0;

Component({
    properties: {
        shopOptions: {
            type: Object,
            observer: "init"
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {
        title: "",
        modalTitle: "",
        list: [],
        entry: "",
        mark: "",
        popup: !1
    },
    methods: {
        init: function(s) {
            if (s && s.shopUuid || s.shopId) {
                var a = this;
                n = s.shopUuid || s.shopId, o.find(function(e) {
                    var o = t.geo[e]();
                    if (o) return i = o.cityId, !0;
                });
                var c = {
                    shopid: n,
                    cityid: i,
                    usercode: 0,
                    token: t.login.getTokenSync()
                };
                e.default.i(99), c.cx = e.default.r(c), t.request.mapi({
                    url: "https://mapi.dianping.com/pay/promo/unifiedissuecouponcomponent.bin",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: c
                }).then(function(t) {
                    if (200 === t.statusCode) {
                        var e = t.data;
                        if (e.unifiedIssueCouponLists) {
                            var o = e.unifiedIssueCouponLists[0] || {};
                            a.setData({
                                mark: e.icon,
                                title: e.couponText,
                                modalTitle: o.title || "",
                                list: o.unifiedIssueCouponOption || [],
                                entry: e.entranceText
                            });
                        }
                    }
                }).catch(function(t) {
                    console.log(t);
                });
            }
        },
        showMe: function() {
            this.setData({
                popup: !0
            });
        },
        off: function() {
            this.setData({
                popup: !1
            });
        },
        hijack: function() {},
        check: function(o) {
            var s = o.currentTarget.dataset, a = s.item, c = this;
            t.login.ensure().then(function(o) {
                if (200 == o.code) {
                    var u = {
                        shopid: n,
                        cityid: i,
                        usercode: 0,
                        token: o.token,
                        coupongroupid: a.couponGroupId
                    };
                    e.default.i(99), u.cx = e.default.r(u), t.request.mapi({
                        url: "https://mapi.dianping.com/pay/promo/unifiedissuecoupon.bin",
                        data: u,
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).then(function(t) {
                        var e = t.data;
                        if (e.isSuccess) {
                            a.status.status = 1;
                            var o = {};
                            o["list[" + s.index + "]"] = a, c.setData(o);
                        } else wx.showToast({
                            title: e.errorMsg.errorMsg,
                            icon: "none"
                        });
                    }).catch(function(t) {
                        console.log(t);
                    });
                } else console.log(o.msg);
            }).catch(function() {
                console.log(res.msg);
            });
        }
    }
});