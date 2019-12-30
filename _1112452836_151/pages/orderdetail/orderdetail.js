var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        var a = r.url.stringify("/packages/tuan/pages/orderdetail/orderdetail", e);
        wx.redirectTo({
            url: a
        });
    }
});