var e = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(r) {
        var a = e.url.stringify("/packages/debug/pages/debug/debug", r);
        wx.redirectTo({
            url: a
        });
    }
});