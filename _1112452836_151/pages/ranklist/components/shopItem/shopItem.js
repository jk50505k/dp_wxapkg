var e = require("../../../../npm/@dp/sparrow/index.js"), i = {
    shopMCBid: "b_dianping_nova_jwmpxq6v_mc",
    shopModuleMCBid: "b_dianping_nova_5ds9fi8a_mc"
};

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        categoryId: {
            type: Number,
            value: 0
        },
        hasBrandShop: {
            type: Boolean,
            value: !1
        },
        parentShop: {
            type: Boolean,
            value: !1
        },
        lastChildShop: {
            type: Boolean,
            value: !1
        },
        spreadParentShop: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        shopPicStyle: "width: 190rpx;height: 190rpx;border-radius: 6rpx;box-sizing: border-box;",
        imgwidth: 98,
        imgheight: 36
    },
    methods: {
        imageLoad: function(e) {
            e.detail.width >= 207 ? this.setData({
                imgwidth: 138,
                imgheight: 40
            }) : this.setData({
                imgwidth: 98,
                imgheight: 36
            });
        },
        tapShop: function(a) {
            var t = a.currentTarget.dataset.shopuuid, o = {
                poi_id: a.currentTarget.dataset.shopid,
                category_id: this.data.categoryId
            };
            e.lxmina.moduleClick(i.shopModuleMCBid), e.lxmina.moduleClick(i.shopMCBid, o), e.navigation.navigateTo({
                url: "/pages/detail/detail?shopUuid=" + t
            });
        }
    }
});