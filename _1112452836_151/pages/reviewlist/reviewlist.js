var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        var i = r.url.stringify("/packages/ugc/pages/reviewlist/reviewlist", e);
        wx.redirectTo({
            url: i
        });
    }
});