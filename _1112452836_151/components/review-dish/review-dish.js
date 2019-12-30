var e = require("../../utils/npm/lx-analytics"), t = require("../../public/logan"), i = {
    recommendDishBid: "b_8khz6xhm"
};

Component({
    properties: {
        reviewDish: {
            type: Array
        },
        lxData: {
            type: Object
        },
        shopId: {
            type: Number
        },
        shopUuid: {
            type: String
        }
    },
    data: {
        reviewDish: []
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        _reviewDishChange: function(e, t) {
            e && this.setData({
                reviewDish: e
            });
        },
        torecommend: function(o) {
            t.log("跳转推荐菜");
            var r = o.currentTarget.dataset.shopid, a = o.currentTarget.dataset.shopuuid, n = o.currentTarget.dataset.id, s = void 0;
            s = a ? "https://m.dianping.com/shop/" + a + "/dish" + n + "?msource=mina_food" : "https://m.dianping.com/shop/" + r + "/dish" + n + "?msource=mina_food";
            try {
                wx.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(s)
                });
            } catch (o) {
                t.log("跳转推荐菜: " + JSON.stringify(o)), console.log("打开推荐菜详情页失败:" + JSON.stringify(o));
            }
            e.moduleClick(i.recommendDishBid, this.data.lxData);
        }
    }
});