var t = require("../../config/business").DEFAULT_PIC;

Component({
    properties: {
        shopinfo: {
            type: Object
        },
        showtag: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        defaultPic: t,
        ios: !1
    },
    attached: function() {
        var t = wx.getSystemInfoSync();
        try {
            t && t.system && 0 === t.system.toLowerCase().search("ios") && this.setData({
                ios: !0
            });
        } catch (t) {
            console.log("get system error: ", t);
        }
    },
    methods: {
        tapCard: function(t) {
            console.log("trigger event tapCard");
            var e = t.currentTarget.dataset.cardid, a = t.currentTarget.dataset.shopdata, s = t.currentTarget.dataset.scopedatalist;
            this.triggerEvent("mytap", {
                cardId: e,
                shopData: a,
                scopeDataList: s
            }, {
                bubbles: !0,
                composed: !0
            });
        }
    }
});