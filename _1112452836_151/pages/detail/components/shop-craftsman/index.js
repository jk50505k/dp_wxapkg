var t = require("../../../../npm/@dp/sparrow/index.js"), a = require("../../../../components/mina_lazyload_img/index.js").initInComponent, i = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), e = {
    craftsMVBid: "b_j9xbozbj",
    craftsListBid: "b_seqlceiw",
    craftsDetailBid: "b_8q972yu9"
}, n = {
    SHOP_CRAFTS: "/wxmapi/shop/crafts"
};

Component({
    behaviors: [],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {
        imgClass: "width: 200rpx;height: 200rpx;border-radius: 7rpx 7rpx 0 0"
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        carftsListTap: function(a) {
            var i = this.data.craftData.listUrl;
            t.lxmina.moduleClick(e.craftsListBid, this.data.lxData), i && t.navigation.navigateTo({
                url: i
            });
        },
        carftsDetailTap: function(a) {
            t.lxmina.moduleClick(e.craftsDetailBid, this.data.lxData);
            var i = a.currentTarget.dataset.url;
            i && t.navigation.navigateTo({
                url: i
            });
        },
        _shopOptionsChange: function(r, o) {
            var s = this;
            if (r) {
                var d = r.shopId, p = r.shopUuid, c = {};
                p ? c.shopUuid = p : c.shopId = d, t.request.mina({
                    url: this.getDomain() + n.SHOP_CRAFTS,
                    data: c
                }).then(function(i) {
                    if (i && i.data && 200 == i.data.code && i.data.craftData) {
                        var n = i.data.craftData;
                        s.setData({
                            craftData: n
                        }, function() {
                            a(s);
                        }), t.lxmina.moduleView(e.craftsMVBid, {
                            shopType: n.shopType
                        });
                    }
                }).catch(function(t) {
                    i.log("friendlike error " + t);
                });
            }
        },
        getDomain: function() {
            var a = "https://m.dianping.com";
            return "test" === t.env.get() && (a = "https://m.51ping.com"), a;
        }
    }
});