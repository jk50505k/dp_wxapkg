function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../event/index")), r = e(require("./interceptor"));

exports.default = new r.default({
    type: "response",
    resolve: function(e) {
        var r = e.response, n = e.request, o = e.minaenv;
        try {
            if (r && 200 == r.statusCode) {
                var u = r.data.loginCode, a = n.header || {};
                void 0 !== u && 200 !== u && o.token === a.token && o.token && (console.warn("Warning: 登陆态失效，正在进行登出操作"), 
                t.default.trigger("logout"));
            }
        } catch (e) {}
        return e;
    }
});