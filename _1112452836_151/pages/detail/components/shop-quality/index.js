var t = require("../../../../npm/@dp/sparrow/index.js"), a = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), e = require("../../../../config/index"), o = {
    SHOP_QUALITY: "/wxmapi/shop/shopquality"
};

Component({
    properties: {
        moduleConfig: {
            type: Object,
            value: {}
        },
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        lxData: {
            type: Object,
            value: {}
        }
    },
    data: {
        jumpUrl: "",
        showModule: !1,
        title: ""
    },
    ready: function() {},
    methods: {
        _shopOptionsChange: function(e) {
            var i = this, n = {}, p = e.shopId, s = e.shopUuid;
            s ? n.shopUuid = s : n.shopId = p, t.request.mina({
                url: this._getDomain() + o.SHOP_QUALITY,
                data: n
            }).then(function(t) {
                t.data.haShopQuality ? i.setData({
                    title: t.data.title,
                    jumpUrl: t.data.jumpUrl,
                    showModule: !0
                }) : i.setData({
                    showModule: !1
                });
            }).catch(function(t) {
                i.setData({
                    showModule: !1
                }), a.log("商户资质获取失败", t);
            });
        },
        _getDomain: function() {
            return e.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        },
        qualityTap: function() {
            var a = this.data.jumpUrl;
            a && t.navigation.navigateTo({
                url: a
            });
        }
    }
});