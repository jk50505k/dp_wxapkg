var t = require("../../../../npm/@dp/sparrow/index.js"), a = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js")), e = require("../../../../common/request"), n = require("../../../../config/index"), i = require("../../../../common/relation-behavior"), r = {
    tuanMVBid: "b_09iatlvv",
    tuanMCBid: "b_7et5hfzv",
    launchAppMCBid: "b_wyluld4c",
    mediumMVBid: "b_51t89xjo",
    rainBowMVBid: "b_et2lvx3l"
}, s = {
    SHOP_TUAN: "/wxmapi/shop/shoptuan"
};

Component({
    relations: {
        "../shop-slot/shop-slot": {
            type: "ancestor"
        }
    },
    behaviors: [ i ],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        lxData: {
            type: Object,
            value: {}
        },
        moduleConfig: {
            type: Object
        },
        isFromApp: {
            type: Boolean
        }
    },
    data: {
        showModule: !1
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        _shopOptionsChange: function(n, i) {
            var l = this;
            if (n) {
                var u = n.shopId, d = n.shopUuid, p = {};
                d ? p.shopUuid = d : p.shopId = u;
                var h = t.geo.getCitySync();
                h && h.cityId && (p.cityId = h.cityId), e({
                    url: this._getDomain() + s.SHOP_TUAN,
                    data: p
                }).then(function(e) {
                    if (e && e.data && 200 == e.data.code) {
                        var n = e.data.shopTuan || [], i = e.data.rainBowData || {}, s = e.data.mediumDate, u = e.data.popData;
                        if (s || u) {
                            var d = l.getSiblingNode("../shop-slot/shop-slot", "../shop-operate/index");
                            d && d.setData({
                                mediumData: s || {},
                                popData: u || {}
                            }, function() {
                                t.lxmina.moduleView(r.mediumMVBid, l.data.lxData);
                            });
                        }
                        i.showModule = !1, n.length && (o.default.log("tuanData length:", JSON.stringify("" + n.length)), 
                        n.length > 2 ? l.setData({
                            toMore: !0,
                            showClose: !0,
                            toMoreText: "查看其他" + (n.length - 2) + "个团购",
                            tuanData: n,
                            rainBowData: i,
                            showModule: !0
                        }) : l.setData({
                            rainBowData: i,
                            tuanData: n,
                            showModule: !0
                        }), t.lxmina.moduleView(r.tuanMVBid, l.data.lxData));
                    } else l.setData({
                        showModule: !1
                    }), a.owl.error.addError("tuanData error", JSON.stringify(e.statusCode));
                }).catch(function(t) {
                    o.default.log("tuanDat error:", t), l.setData({
                        showModule: !1
                    });
                });
            }
        },
        tuanItemTap: function(a) {
            var o = a.currentTarget.dataset.url;
            t.lxmina.moduleClick(r.tuanMCBid, this.data.lxData), o && t.navigation.navigateTo({
                url: o
            });
        },
        toMoreOrLess: function(t) {
            this.data.showClose ? this.setData({
                showClose: !1,
                toMoreText: "收起"
            }) : this.setData({
                showClose: !0,
                toMoreText: "查看其他" + (this.data.tuanData.length - 2) + "个团购"
            });
        },
        launchAppError: function(a) {
            console.log("launchAppError", a), this.data.launchFailUrl && t.navigation.navigateTo({
                url: this.data.launchFailUrl
            });
        },
        catchlaunchApp: function(t) {
            console.log("点击团购唤起App", t);
            var a = t.currentTarget.dataset.url;
            a && this.setData({
                launchFailUrl: a
            });
        },
        _getDomain: function() {
            return n.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        }
    }
});