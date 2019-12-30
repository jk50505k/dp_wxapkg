function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../../info/index")), r = e(require("./interceptor"));

exports.default = new r.default({
    type: "request",
    resolve: function(e) {
        try {
            var r = e.options;
            return r && "mina" === r._type_ ? new Promise(function(r) {
                var t = e.request, o = e.minaenv, a = t.header;
                n.default.get().then(function(n) {
                    var i = {
                        openid: o.openId,
                        token: o.token,
                        minaname: o.appname,
                        minaversion: o.appversion,
                        channel: o.channel
                    };
                    if (n) {
                        var s = n.version, u = n.platform, p = n.SDKVersion, c = n.platformVersion;
                        i = Object.assign({}, i, {
                            channelversion: s,
                            wechatversion: s,
                            sdkversion: p,
                            platform: u,
                            platformversion: c
                        });
                    }
                    return t.header = Object.assign({}, a || {}, i), e.request = t, r(e);
                });
            }) : e;
        } catch (n) {
            return e;
        }
    }
});