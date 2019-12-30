var a = require("../../npm/@dp/sparrow/index.js");

Page({
    onLoad: function(e) {
        console.log("========search page load========"), a.navigation.redirectTo({
            url: a.url.stringify("/packages/search/pages/search/search", e)
        });
    }
});