function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../@analytics/wechat-sdk/lib/index.js")), r = e(require("./interceptor")), u = e(require("../../redirect-status-manager/index")), i = e(require("../../pageutil/index"));

exports.default = new r.default({
    type: "request",
    resolve: function(e) {
        var r = e.request;
        try {
            var a = i.default.getCurrentPage();
            a.hasRedirectStatusInited || (u.default.initRedirectStatus(), a.hasRedirectStatusInited = !0);
            var s = r.data;
            s && s.mtsiReferrer && (s.optimus_uuid = s.optimus_uuid || t.default.get("lxcuid"), 
            s.optimus_platform = s.optimus_platform || 13, s.optimus_partner = s.optimus_partner || 203, 
            s.optimus_risk_level = 71, s.optimus_code = 10, e.request = r);
        } catch (e) {}
        return e;
    }
});