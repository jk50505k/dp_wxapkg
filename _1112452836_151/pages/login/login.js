var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        var i = r.url.stringify("/pages/mobile/mobile", e);
        wx.redirectTo({
            url: i
        });
    }
});