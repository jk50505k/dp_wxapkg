Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = function(o) {
        e.request.mina({
            url: n.DOMAIN + "/wxmapi/base/actionreport",
            data: o,
            method: "POST"
        }).then(function(e) {
            t.default.log("action Report response:" + JSON.stringify(e));
        }).catch(function(e) {
            t.default.log("action Report error:" + JSON.stringify(e));
        });
    };
    if (o && o.itemId && o.attribute1) {
        var i = e.login.getOpenIdSync();
        i ? (o.openId = i, r(o), t.default.log("action Report data:" + JSON.stringify(o))) : e.login.getOpenId().then(function(e) {
            e && e.openId && (o.openId = i, r(o)), t.default.log("action Report data:" + JSON.stringify(o));
        });
    } else t.default.log("action Report params error:" + JSON.stringify(o));
};

var e = require("../npm/@dp/sparrow/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../npm/@dp/logan-wxapp/build/wxlogan.js")), n = require("../config/index");