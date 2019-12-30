var t = require("../../../../npm/@dp/sparrow/index.js"), a = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js")), i = {
    adViewBid: "b_b5ea7w7t",
    adClickBid: "b_00q7cox3"
}, n = require("../../../../config/index");

Component({
    properties: {
        promoResources: {
            type: Array,
            value: [],
            observer: "_adDataChange"
        },
        isSupportMiniPro: {
            type: Boolean,
            value: !1
        },
        options: {
            type: Object,
            value: null,
            observer: "optionsChange"
        }
    },
    data: {
        ad: {},
        env: "product" === t.env.get() ? "product" : "beta",
        bannerAd: {},
        activityId: "",
        activitySource: ""
    },
    ready: function() {},
    methods: {
        doFetch: function() {
            var a = this, e = t.geo.getLocationSync(), r = t.geo.getCitySync();
            t.request.custom({
                url: n.DOMAIN + "/wxmapi/index/bannerad",
                data: {
                    cityId: r || 0,
                    lng: e.longitude || 0,
                    lat: e.latitude || 0
                }
            }).then(function(e) {
                if (e && 200 == e.statusCode && e.data && 200 == e.data.code) {
                    var n = e.data;
                    a.setData({
                        bannerAd: n.data || {},
                        activityId: n.lxData && n.lxData.activity_id,
                        activitySource: n.lxData && n.lxData.activity_source
                    });
                    var r = "", o = "";
                    e.data.lxData && (r = e.data.lxData.activity_id, o = e.data.lxData.activity_source), 
                    t.lxmina.moduleView(i.adViewBid, {
                        custom: {
                            activity_id: r,
                            activity_source: o
                        }
                    });
                }
            });
        },
        optionsChange: function(i) {
            var n = this;
            i && i.city && this.setData({
                bannerAd: {}
            }), t.login.getOpenIdSync() || t.login.getOpenIdCacheSync() ? this.doFetch() : t.login.getOpenId().then(function(t) {
                t.openId ? n.doFetch() : (a.owl.error.addError("login.getOpenId()注入openId失败:", JSON.stringify(t)), 
                e.default.log("login.getOpenId()注入openId失败", JSON.stringify()));
            });
        },
        _adDataChange: function(t, a) {
            t && t.length ? this.setData({
                ad: this._setPromoResource(t)
            }) : this.setData({
                ad: {}
            });
        },
        _setPromoResource: function(a) {
            a = a.map(function(a) {
                return a.urlData = t.navigation.parse({
                    url: a.url
                }), a;
            });
            var e = {};
            switch (a.length) {
              case 1:
                e = {
                    num: 1,
                    resource: a[0]
                };
                break;

              case 2:
                e = {
                    num: 2,
                    resources: a
                };
                break;

              case 3:
                e = {
                    num: 3,
                    bigResource: a[0],
                    commonResources: a.slice(1)
                };
                break;

              case 4:
                e = {
                    num: 4,
                    resources: a
                };
            }
            return e;
        },
        adTap: function(a) {
            var e = a.currentTarget.dataset.url, i = a.currentTarget.dataset.urlData;
            this.data.isSupportMiniPro && i.appId || !e || t.navigation.navigateTo({
                url: e
            });
        },
        midasCB: function(a) {
            t.navigation.navigateTo({
                url: a.detail
            });
        },
        bannerAdTap: function(a) {
            var e = parseInt(a.currentTarget.dataset.type);
            t.lxmina.moduleClick(i.adClickBid, {
                adType: e,
                custom: {
                    activity_id: this.data.activityId,
                    activity_source: this.data.activitySource
                }
            });
        }
    }
});