var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(i) {
        var a = r.url.stringify("/packages/basic/pages/city/city", i);
        wx.redirectTo({
            url: a
        });
    }
});