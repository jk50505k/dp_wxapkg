function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var u = n[t];
            u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), 
            Object.defineProperty(e, u.key, u);
        }
    }
    return function(n, t, u) {
        return t && e(n.prototype, t), u && e(n, u), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = n(require("../env/index")), a = n(require("../login/index")), i = function() {
    function n() {
        var t = this;
        e(this, n), this.domain = "https://m.dianping.com", this.api = "/wxmapi/login/wxuuid", 
        this.data = {
            uuid: void 0
        }, u.default.on("_openId_", function(e) {
            e && (t.data.uuid = e);
        });
    }
    return t(n, [ {
        key: "get",
        value: function() {
            return this.showWran("get", "getOpenId"), new Promise(function(e) {
                a.default.getOpenId().then(function(n) {
                    200 == n.code ? e(n.openId) : e();
                });
            });
        }
    }, {
        key: "getSync",
        value: function() {
            return a.default.getOpenIdSync();
        }
    }, {
        key: "set",
        value: function(e) {
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            this.showWran("set", "setOpenId"), a.default.setOpenId(e, {});
        }
    }, {
        key: "getCache",
        value: function() {
            return this.showWran("getCache", "getOpenIdCache"), a.default.getOpenIdCache();
        }
    }, {
        key: "getCacheSync",
        value: function() {
            return this.showWran("getCacheSync", "getOpenIdCacheSync"), a.default.getOpenIdCacheSync();
        }
    }, {
        key: "showWran",
        value: function(e, n) {
            console.error(e + "方法将在小程序4.3版本废弃，请使用sparrow的login替代方案login." + n + "(), 如有问题联系:chenxuanfeng");
        }
    } ]), n;
}();

exports.default = new i();