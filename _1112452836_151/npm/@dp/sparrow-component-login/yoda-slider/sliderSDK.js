function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        var i = [], n = !0, o = !1, r = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), 
            !t || i.length !== t); n = !0) ;
        } catch (e) {
            o = !0, r = e;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw r;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./sliderAPI")), o = require("./utils/config"), r = function() {
    function r(t) {
        var i = t.requestCode, o = t.pageData;
        e(this, r);
        var s = (n.default.getSystemInfo() || {}).windowWidth, a = void 0 === s ? 375 : s, u = a / 375, d = [ 50 * u, 50 * u ], c = [ 270 * u, 52 * u ], l = Date.now(), h = c[0] - d[0], v = this;
        Object.assign(v, {
            requestCode: i,
            windowWidth: a,
            zoom: u,
            btn: d,
            initTime: l,
            slideWidth: h,
            isDone: !1,
            zone: c,
            client: [ 50 * u, 50 * u ],
            Timestamp: [ l ],
            count: 0,
            timeout: 0,
            points: null,
            trajectory: [],
            pageData: o
        });
    }
    return i(r, [ {
        key: "sliderTouchStart",
        value: function(e) {
            var t = this;
            t.Timestamp.push(Date.now()), t.count += 1, t.points = [], t.addPoint(e);
        }
    }, {
        key: "sliderTouchMove",
        value: function(e) {
            var t = this.isDone, i = this.slideWidth;
            if (t) return {
                isDone: t,
                deltaX: i,
                slideWidth: i
            };
            var n = this.addPoint(e);
            return this.getPosition(n);
        }
    }, {
        key: "sliderTouchCancel",
        value: function(e) {
            this.slidEnd();
        }
    }, {
        key: "sliderTouchEnd",
        value: function(e) {}
    }, {
        key: "getPoint",
        value: function(e) {
            var t = e.touches[0] || {};
            return [ t.clientX, t.clientY ];
        }
    }, {
        key: "addPoint",
        value: function(e) {
            var i = this.points, n = this.initTime, o = this.getPoint(e), r = t(o, 2), s = r[0], a = r[1];
            return this.points = i || [], this.points.push([ 0, s, a, Date.now() - n ]), [ s, a ];
        }
    }, {
        key: "getPosition",
        value: function(e) {
            var i = t(e, 2), n = i[0], o = (i[1], this.slideWidth), r = t(this.points, 1)[0], s = this.isDone, a = n - r[1];
            return a < 0 && (a = 0), a >= o && (a = o, this.isDone = !0, this.slidEnd()), {
                deltaX: a,
                slideWidth: o,
                isDone: s
            };
        }
    }, {
        key: "slidEnd",
        value: function() {
            var e = this, t = e.trajectory, i = e.points, r = void 0 === i ? [] : i, s = e.Timestamp, a = e.pageData, u = void 0 === a ? {} : a, d = e.requestCode;
            (t = t.slice(-3, t.length)).push({
                point: r,
                vector: {
                    orientation: "h"
                }
            }), e.trajectory = t, e.points = null, s[s.length - 1] - s[0] > 3e3 && (e.timeout += 1), 
            e.setData();
            var c = u.action, l = u.id, h = {
                action: c,
                id: l,
                requestCode: d,
                behavior: e.behavior
            };
            n.default.verfiySlide(h).then(function(e) {
                var t = getApp().$loginPage, i = t.data.requestCode, n = e.data, r = e.status, s = e.error;
                if (1 === r) wx.showToast({
                    title: "验证成功",
                    complete: function() {
                        t.setData({
                            isShow: !1
                        });
                        var e = "";
                        n && (e = n.response_code), t.triggerEvent("sliderEvent", {
                            status: 1,
                            requestCode: i,
                            responseCode: e
                        }, {
                            bubbles: !0,
                            composed: !0
                        });
                    }
                }); else if (0 === r && 121048 === s.code) {
                    var a = s.request_code;
                    t.setData({
                        "sdk.requestCode": a
                    }), t.setData({
                        codeImage: o.YodaServer.getYodaServer().getServer() + "/v2/captcha?request_code=" + a + "&action=" + c,
                        validStep: "code"
                    });
                } else t.triggerEvent("sliderEvent", {
                    status: 0,
                    code: s.code
                }, {
                    bubbles: !0,
                    composed: !0
                });
            }).catch(function() {
                getApp().$loginPage.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
        }
    }, {
        key: "setData",
        value: function() {
            var e = this.zone, t = this.client, i = this.Timestamp, n = this.count, o = this.timeout, r = this.trajectory, s = {
                env: {
                    zone: e,
                    client: t,
                    Timestamp: i.slice(0, 2),
                    count: n,
                    timeout: o
                },
                trajectory: r
            };
            this.behavior = s;
        }
    } ]), r;
}();

exports.default = r;