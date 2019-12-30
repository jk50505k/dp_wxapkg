var t = require("../../npm/@dp/sparrow/index.js"), e = require("../../config/business").DEFAULT_PIC;

Component({
    properties: {
        card: {
            type: Object
        },
        needborderbottom: {
            type: Boolean
        },
        idx: {
            type: Number
        },
        needbottom: {
            type: Boolean,
            value: !0
        },
        showtag: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        defaultPic: e,
        env: "product" === t.env.get() ? "product" : "beta"
    },
    methods: {
        midasCB: function(e) {
            console.log("trigger midas callback function"), this.triggerEvent("midascb", {
                shopUuid: e.detail
            });
            var a = e.currentTarget.dataset.url || "/pages/detail/detail?shopUuid=" + e.detail, o = this.data.card;
            try {
                var i = JSON.parse(o.shopInfo && o.shopInfo.shopStyle) || {}, s = o.shopInfo && o.shopInfo.scopeDataList;
                a && (a = a + "&from=list&shopStyle=" + i.picMode + "&scopeDataList=" + s, wx.setStorage({
                    key: "dp_shop",
                    data: this.data.card,
                    complete: function() {
                        t.navigation.navigateTo({
                            url: a
                        });
                    }
                }));
            } catch (e) {
                t.navigation.navigateTo({
                    url: a
                });
            }
        },
        catchTap: function() {}
    }
});