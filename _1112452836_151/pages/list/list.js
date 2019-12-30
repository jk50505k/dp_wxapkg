var a = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        console.log("========list page load========"), a.navigation.redirectTo({
            url: a.url.stringify("/packages/search/pages/list/list", e)
        });
    }
});