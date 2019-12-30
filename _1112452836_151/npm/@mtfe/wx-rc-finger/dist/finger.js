var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.finger = n();
}(void 0, function() {
    var t = function(t) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t);
    }, e = function(t, e) {
        return "string" == typeof t ? t.charCodeAt(e) : t instanceof Uint8Array ? t[e] : 0;
    }, n = "undefined" != typeof top && top.btoa || function(n) {
        for (var o = [], c = 0, s = n.length, r = 0, i = 0; i < s; ++i) 3 === (c += 1) && (c = 0), 
        r = e(n, i), 0 === c ? o.push(t(63 & (e(n, i - 1) << 2 | r >> 6)), t(63 & r)) : 1 === c ? o.push(t(r >> 2 & 63)) : o.push(t(63 & (e(n, i - 1) << 4 | r >> 4))), 
        i === s - 1 && 0 < c && o.push(t(r << (3 - c << 1) & 63));
        if (c) for (;c < 3; ) c += 1, o.push("=");
        return o.join("");
    }, o = {
        app: 0
    }, c = {
        system: {}
    }, s = function() {
        try {
            wx.getSetting && wx.getSetting({
                success: function(t) {
                    t.authSetting && t.authSetting["scope.userLocation"] && function() {
                        try {
                            wx.getLocation({
                                type: "wgs84",
                                success: function(t) {
                                    c.location = t;
                                }
                            });
                        } catch (t) {}
                    }();
                }
            });
        } catch (t) {}
    }, r = function(t) {
        try {
            wx.getSetting ? wx.getSetting({
                success: function(e) {
                    e.authSetting && e.authSetting["scope.userInfo"] ? i(t) : t && t();
                },
                fail: function() {
                    t && t();
                }
            }) : t && t();
        } catch (e) {
            t && t();
        }
    }, i = function(t) {
        wx.getUserInfo({
            success: function(e) {
                var n = {};
                Object.assign(n, e.userInfo), n.nickName = encodeURIComponent(e.userInfo.nickName), 
                n.city = encodeURIComponent(e.userInfo.city), n.province = encodeURIComponent(e.userInfo.province), 
                n.country = encodeURIComponent(e.userInfo.country), c.userInfo = n, t && t();
            },
            fail: function() {
                t && t();
            }
        });
    };
    return function() {
        try {
            wx.getSystemInfo({
                success: function(t) {
                    Object.assign(c.system, t);
                }
            });
        } catch (t) {}
    }(), function() {
        try {
            wx.getNetworkType({
                success: function(t) {
                    c.system.networkType = t.networkType;
                }
            }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(t) {
                c.system.networkType = t.networkType;
            });
        } catch (t) {}
    }(), function() {
        try {
            wx.onAccelerometerChange(function(t) {
                c.system.accelerometer || (c.system.accelerometer = []), 20 < c.system.accelerometer.length && c.system.accelerometer.shift(), 
                c.system.accelerometer.push({
                    x: Number(t.x).toFixed(3),
                    y: Number(t.y).toFixed(3),
                    z: Number(t.z).toFixed(3)
                });
            }), wx.onCompassChange(function(t) {
                c.system.compass || (c.system.compass = []), 20 < c.system.compass.length && c.system.compass.shift(), 
                c.system.compass.push(Number(t.direction).toFixed(3));
            });
        } catch (t) {}
    }(), r(), s(), {
        s: function(t) {
            o.app = t;
        },
        g: function(t) {
            c.app = o.app;
            var e = "WX__1_";
            try {
                if (c.location || s(), c.userInfo) {
                    var i = JSON.stringify(c);
                    e += n(i), t && t(e);
                } else r(function() {
                    var o = JSON.stringify(c);
                    e += n(o), t && t(e);
                });
            } catch (i) {
                t && t(e);
            }
        }
    };
});