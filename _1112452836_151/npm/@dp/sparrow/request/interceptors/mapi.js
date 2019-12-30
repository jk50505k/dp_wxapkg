function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mapiResponseInterceptor = exports.mapiRequestInterceptor = void 0;

var r = e(require("../../info/index")), t = e(require("./interceptor"));

exports.mapiRequestInterceptor = new t.default({
    type: "request",
    resolve: function(e) {
        try {
            var t = e.options;
            if (t && "mapi" === t._type_) return new Promise(function(t) {
                var n = e.request, o = e.minaenv, s = n.header;
                r.default.get().then(function(r) {
                    var p = {
                        dpid: o.openId,
                        token: o.token,
                        appVersion: o.appversion,
                        appName: o.appname,
                        isMicroMessenger: "true",
                        channel: o.channel
                    };
                    if (r) {
                        var a = r.version, i = r.brand, u = r.model, c = r.platform, d = r.networkType, f = r.platformVersion;
                        p = Object.assign({}, p, {
                            microMsgVersion: a,
                            "network-type": d,
                            "phone-brand": i,
                            "phone-model": u,
                            platform: "iOS" === c ? "iPhone" : "Android",
                            platformVersion: f
                        });
                    }
                    n.header = Object.assign({}, s || {}, p), e.request = n, t(e);
                });
            });
        } catch (e) {}
        return e;
    }
}), exports.mapiResponseInterceptor = new t.default({
    type: "response",
    resolve: function(e) {
        try {
            var r = e.options;
            if (r && "mapi" === r._type_ && r.transform) {
                var t = e.response;
                if (!t || 200 != t.statusCode) return Promise.reject(t);
                t = t.data, e.response = t;
            }
        } catch (e) {}
        return e;
    }
});