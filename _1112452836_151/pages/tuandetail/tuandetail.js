var a = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(r) {
        var e = a.url.stringify("/packages/tuan/pages/tuandetail/tuandetail", r);
        wx.redirectTo({
            url: e
        });
    }
});