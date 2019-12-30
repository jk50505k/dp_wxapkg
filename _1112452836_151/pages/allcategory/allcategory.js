var r = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(a) {
        var e = r.url.stringify("/packages/category/pages/allcategory/allcategory", a);
        e && wx.redirectTo({
            url: e
        });
    }
});