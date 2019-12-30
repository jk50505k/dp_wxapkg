function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../wxp/index")), r = require("../lib/checkprefix.js"), i = [ {
    unique: "openid",
    description: "用户小程序唯一识别id"
}, {
    unique: "unionid",
    description: "用户微信唯一识别id"
}, {
    unique: "uuid",
    description: "用户小程序用户id搜索使用"
}, {
    unique: "token",
    description: "用户登录态"
}, {
    unique: "geo",
    description: "经纬度信息"
}, {
    unique: "city",
    description: "用户选择城市数据"
}, {
    unique: "loccity",
    description: "用户定位城市数据"
} ].concat(r.prefList), o = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    if (e.key || e.optionKey) {
        var o = e.key, u = e.data, a = !0, c = {}, y = /Sync/i.test(t);
        if ("setStorageSync" === t || "setStorage" === t ? (a = (0, r.prefixVerify)(i, o), 
        c = {
            key: o,
            data: u
        }) : c = {
            key: o
        }, a) {
            if (!y) return new Promise(function(e) {
                n.default[t](c).then(function(n) {
                    "getStorage" == t ? e(n.data) : e();
                }).catch(function() {
                    e();
                });
            });
            try {
                if ("setStorageSync" === t) wx[t](o, u); else {
                    if ("getStorageSync" === t) return wx[t](o);
                    wx[t](o);
                }
            } catch (e) {}
        } else if (!y) return new Promise(function(e) {
            e();
        });
    }
}, u = function() {
    function n() {
        e(this, n);
    }
    return t(n, null, [ {
        key: "setStorage",
        value: function(e, t) {
            return o({
                key: e,
                data: t
            }, "setStorage");
        }
    }, {
        key: "setStorageSync",
        value: function(e, t) {
            return o({
                key: e,
                data: t
            }, "setStorageSync");
        }
    }, {
        key: "getStorage",
        value: function(e, t) {
            return o({
                key: e,
                optionKey: t
            }, "getStorage");
        }
    }, {
        key: "getStorageSync",
        value: function(e, t) {
            return o({
                key: e,
                optionKey: t
            }, "getStorageSync");
        }
    }, {
        key: "removeStorage",
        value: function(e, t) {
            return o({
                key: e,
                optionKey: t
            }, "removeStorage");
        }
    }, {
        key: "removeStorageSync",
        value: function(e, t) {
            return o({
                key: e,
                optionKey: t
            }, "removeStorageSync");
        }
    } ]), n;
}();

exports.default = u;