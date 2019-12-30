function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../navigation/index")), t = e(require("../../url/index")), a = e(require("./interceptor")), d = e(require("../../redirect-status-manager/index")), o = require("../../../owl-wxapp/es6/index.js");

exports.default = new a.default({
    type: "response",
    resolve: function(e) {
        try {
            var a = e.request, u = e.response;
            if (200 == u.statusCode && u.data && 406 === u.data.code) {
                var s = decodeURIComponent(a.data.mtsiReferrer);
                s = (0 === s.indexOf("/") ? "" : "/") + s;
                var n = t.default.parse(s).uri;
                o.owl.error.addError("【yoda】" + n, s, !0);
                var i = u.data.customData;
                !d.default.getRedirectStatus() && i && i.requestCode && (d.default.setRedirectStatus(!0), 
                r.default.redirectTo({
                    url: "/packages/mtsi/pages/yoda/yoda?returl=" + encodeURIComponent(s) + "&requestCode=" + i.requestCode + "&apiurl=" + encodeURIComponent(a.url)
                }));
            }
        } catch (e) {}
        return e;
    }
});