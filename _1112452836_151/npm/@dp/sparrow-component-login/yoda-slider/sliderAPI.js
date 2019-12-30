function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./utils/konan")), n = require("./utils/config"), o = function() {
    function o() {
        e(this, o);
    }
    return t(o, null, [ {
        key: "getSystemInfo",
        value: function() {
            return wx.getSystemInfoSync();
        }
    }, {
        key: "getPageData",
        value: function(e) {
            var t = {
                requestCode: e,
                feVersion: n.feVersion.slider,
                source: n.source
            };
            return t._token = n.rohr.r(t), new Promise(function(e, r) {
                wx.request({
                    url: n.YodaServer.getYodaServer().getServer() + "/v2/ext_api/page_data",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: t,
                    success: function(t) {
                        var r = t.data.data || {};
                        e({
                            action: r.action,
                            id: r.type,
                            request_code: r.request_code,
                            notifyUrl: r.notifyUrl
                        });
                    },
                    fail: function(e) {
                        r(e);
                    }
                });
            });
        }
    }, {
        key: "getNotifyUrl",
        value: function(e, t, r) {
            var n = -1 === e.indexOf("?") ? "?" : "&";
            return new Promise(function(o) {
                wx.request({
                    url: "" + e + n + "request_code=" + t + "&response_code=" + r,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        e.data;
                        o();
                    },
                    fail: function(e) {
                        o();
                    }
                });
            });
        }
    }, {
        key: "verfiySlide",
        value: function(e) {
            var t = e.action, o = e.id, a = e.requestCode, i = e.behavior, u = void 0 === i ? null : i, c = e.captchacode, d = void 0 === c ? "" : c, s = {
                id: o,
                request_code: a,
                fingerprint: ""
            }, f = this;
            return u && (s.behavior = r.default.Kaito(JSON.stringify(u), a)), d && (s.captchacode = d), 
            s._token = n.rohr.r(s), new Promise(function(e, r) {
                wx.request({
                    url: n.YodaServer.getYodaServer().getServer() + "/v2/ext_api/" + t + "/verify?id=" + o,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: s,
                    success: function(t) {
                        var r = getApp().$loginPage.data.pageData, n = t.data, o = n.data, a = n.status, i = n.error;
                        if (1 === a && r.notifyUrl) {
                            var u = r.notifyUrl;
                            f.getNotifyUrl(u, r.request_code, o.response_code).then(function() {
                                e({
                                    status: a,
                                    error: i,
                                    data: o
                                });
                            });
                        } else e({
                            status: a,
                            error: i,
                            data: o
                        });
                    },
                    fail: function(e) {
                        r(e);
                    }
                });
            });
        }
    }, {
        key: "verfiyCode",
        value: function(e) {
            var t = e.action, r = e.id, n = e.requestCode, o = e.captchacode;
            return this.verfiySlide({
                action: t,
                id: r,
                requestCode: n,
                captchacode: o
            });
        }
    } ]), o;
}();

exports.default = o;