Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    return new Promise(function(a, n) {
        e.request.mina({
            url: t
        }).then(function(e) {
            e && 200 === e.statusCode && e.data && 200 === e.data.code && e.data.data.access_token ? a(e.data.data.access_token) : n(e);
        }).catch(function(e) {
            n(e);
        });
    });
};

var e = require("../npm/@dp/sparrow/index.js"), t = require("../config/index").DOMAIN + "/wxmapi/recommend/accesstoken";