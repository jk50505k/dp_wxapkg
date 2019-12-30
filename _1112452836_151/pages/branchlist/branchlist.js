var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(a) {
        var e = r.url.stringify("/packages/branch/pages/list/list", a);
        e && wx.redirectTo({
            url: e
        });
    }
});