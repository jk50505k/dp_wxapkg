function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = t(require("../url/index")), n = t(require("../config/index")), i = t(require("../event/index")), u = function() {
    function t(a) {
        e(this, t), this.config(a);
    }
    return a(t, [ {
        key: "config",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.PAGE_LIMIT = e.pageLimit || 10, this.appId = e.appId;
        }
    }, {
        key: "_getWebviewPath_",
        value: function() {
            return n.default.getConfig("webviewSchema") || "/pages/webview/webview";
        }
    }, {
        key: "navigateTo",
        value: function(e) {
            if (e && e.url) {
                var t = this._checkUrl(e), a = t.url, r = t.appId, i = getCurrentPages().length, u = a.split("?");
                r && r !== n.default.getConfig("appid") && wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: r,
                    path: a,
                    extraData: {
                        utm_source: "dianping-wxapp"
                    }
                }) : u === this._getWebviewPath_() && i === this.PAGE_LIMIT - 1 ? wx.redirectTo({
                    url: a
                }) : this._checktabBarUrl(a) ? wx.switchTab({
                    url: a,
                    fail: function(e) {
                        console.log(e);
                    }
                }) : i < this.PAGE_LIMIT ? wx.navigateTo({
                    url: a
                }) : wx.redirectTo({
                    url: a
                });
            }
        }
    }, {
        key: "redirectTo",
        value: function(e) {
            if (e && e.url) {
                var t = this._checkUrl(e), a = t.url, r = t.appId;
                r && r !== n.default.getConfig("appid") && wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: r,
                    path: a,
                    extraData: {
                        utm_source: "dianping-wxapp"
                    }
                }) : this._checktabBarUrl(a) ? wx.switchTab({
                    url: a,
                    fail: function(e) {
                        console.log(e);
                    }
                }) : wx.redirectTo({
                    url: a
                });
            }
        }
    }, {
        key: "reLaunch",
        value: function(e) {
            if (e && e.url) if (wx.reLaunch) {
                var t = this._checkUrl(e).url;
                wx.reLaunch({
                    url: t
                });
            } else this.navigateTo(e);
        }
    }, {
        key: "navigateBack",
        value: function(e) {
            var t = void 0;
            if (!((t = e ? e.delta || 1 : 1) <= 0)) {
                try {
                    if (e && e.updateData && Object.keys(e.updateData).length) {
                        var a = e.updateData, r = getCurrentPages(), n = r.length - 1 - t;
                        n >= 0 && (i.default.trigger("needUpdate", {
                            url: r[n].route,
                            updateOptions: a
                        }), r[n].options = a);
                    }
                } catch (e) {
                    console.log(e);
                }
                wx.navigateBack({
                    delta: t
                });
            }
        }
    }, {
        key: "parse",
        value: function(e) {
            return this._checkUrl(e);
        }
    }, {
        key: "_checkUrl",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.url, a = e.type;
            try {
                if (0 === t.indexOf("dpmina://")) {
                    var n = t.substring(9), i = r.default.parseQuery(n), u = {};
                    return [ "appId", "path", "type" ].map(function(e) {
                        i[e] && (u[e] = decodeURIComponent(i[e]));
                    }), t = this._checkWebview({
                        url: u.path,
                        type: u.type
                    }), {
                        appId: u.appId,
                        url: t
                    };
                }
                return t = this._checkWebview({
                    url: t,
                    type: a
                }), {
                    url: t
                };
            } catch (e) {
                return {
                    url: t
                };
            }
        }
    }, {
        key: "_checkWebview",
        value: function(e) {
            var t = e.type, a = e.url;
            if ("h5" === t || /^https:\/\//.test(a)) {
                var r = encodeURIComponent(a);
                a = this._getWebviewPath_() + "?url=" + r;
            }
            return a;
        }
    }, {
        key: "_checktabBarUrl",
        value: function(e) {
            e = e.split("?")[0];
            var t = n.default.getConfig("tabBars");
            return !!(e && t && t.length) && t.some(function(t) {
                return t.indexOf(e.replace(/^\/+|\/+$/g, "")) > -1;
            });
        }
    } ]), t;
}();

exports.default = new u();