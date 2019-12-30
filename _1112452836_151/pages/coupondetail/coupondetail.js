var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        var a = r.url.stringify("/packages/order/pages/coupondetail/coupondetail", e);
        wx.redirectTo({
            url: a
        });
    }
});