var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(a) {
        var e = r.url.stringify("/packages/ugc/pages/shopalbum/shopalbum", a);
        wx.redirectTo({
            url: e
        });
    }
});