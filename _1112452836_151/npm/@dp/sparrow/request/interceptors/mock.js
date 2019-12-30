Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./interceptor"));

exports.default = new e.default({
    type: "request",
    resolve: function(e) {
        var r = e.request, t = e.minaenv, o = e.mock, a = t.openId;
        if (!o || !a) return e;
        var i = o.path || "https://appmock.sankuai.com/";
        try {
            var n = /https?:\/\/?([\w.]+)(:\d+)?\//i, u = void 0, c = void 0, s = void 0, d = r.url.match(n), p = i.match(n);
            if (d && (u = d[1] || "", c = d[2] || ""), !p || !p[1]) throw Error("Invalid Mock Domain");
            s = p[1], r.header = Object.assign({}, r.header || {}, {
                MKOriginHost: u,
                MKOriginPort: c,
                MKUnionId: a,
                MKScheme: r.url.match(/^(https?):\/\//)[1],
                MKAppID: 133
            }), u !== s && (r.url = r.url.replace(u, s)), e.request = r;
        } catch (e) {
            console.warn("Mock Middleware Exception:", e);
        }
        return e;
    }
});