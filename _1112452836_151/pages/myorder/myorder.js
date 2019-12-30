var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        var o = e, a = void 0;
        (a = "order" === o.currentDetail ? r.url.stringify("/packages/order/pages/myorder/myorder", o) : r.url.stringify("/packages/order/pages/mycoupon/mycoupon", o)) && wx.redirectTo({
            url: a
        });
    }
});