function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var i = n[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(n, t, i) {
        return t && e(n.prototype, t), i && e(n, i), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = require("./constant/index"), o = require("./util/util"), r = "https://catfront.dianping.com", s = [ "region", "operator", "network", "container", "os", "unionId" ], a = function() {
    function a(n) {
        if (e(this, a), this._config = {
            devMode: !1,
            project: "",
            pageUrl: "",
            resource: {
                sample: .1,
                errSample: .2
            },
            page: {
                sample: .5
            },
            error: {
                sample: 1,
                maxSize: 10240,
                maxNum: 100,
                maxTime: 6e4
            },
            version: {},
            logan: {
                enable: !1
            },
            hasRecordApp: !1
        }, this.config = {}, this.userConfig = {}, this.url = r, n ? this.set(n) : this.config = this._config, 
        this.baseQuery = {
            v: 1,
            sdk: i.VERSION
        }, this.apiPaths = {
            log: "/api/log",
            error: "/api/log",
            page: "/api/speed",
            resource: "/batch",
            metric: "/api/metric"
        }, this.extensions = {}, !n.unionId) try {
            var t = wx.getStorageSync(i.STOREKEY + "-unionId");
            t ? this.config.unionId = t : (this.config.unionId = (0, o.MSID)(), this.cacheUnionId(this.config.unionId));
        } catch (e) {
            this.config.unionId = "";
        }
    }
    return t(a, [ {
        key: "_update",
        value: function() {
            this.config = this._config;
            try {
                for (var e in this.userConfig) {
                    var t = this.userConfig[e];
                    "object" !== (void 0 === t ? "undefined" : n(t)) || t instanceof RegExp || t instanceof Array ? this.config[e] = t : this.config[e] = (0, 
                    o.extend)(this.config[e], this.userConfig[e]);
                }
            } catch (e) {
                console.log("_update err");
            }
        }
    }, {
        key: "update",
        value: function(e, n) {
            try {
                if (!e || !n) return void console.log("参数错误");
                "unionId" === e ? this.cacheUnionId(n) : this.config[e] = n;
            } catch (e) {
                console.log("update err");
            }
        }
    }, {
        key: "get",
        value: function(e) {
            return e ? this.config[e] : this.config;
        }
    }, {
        key: "set",
        value: function(e) {
            try {
                for (var t in e) e.hasOwnProperty(t) && ("devMode" === t && this.setApiDomain(e[t]), 
                "object" !== n(e[t]) || e[t] instanceof RegExp || e[t] instanceof Array ? this.userConfig[t] = e[t] : this.userConfig[t] = (0, 
                o.extend)(this.userConfig[t], e[t]));
                this._update();
            } catch (e) {
                console.log("set err");
            }
        }
    }, {
        key: "getApiPath",
        value: function(e) {
            var n = this.apiPaths[e];
            return (0, o.stringify)(this.url + n, this.baseQuery);
        }
    }, {
        key: "setApiDomain",
        value: function(e) {
            this.url = e ? "https://catfront.51ping.com" : r;
        }
    }, {
        key: "getExtension",
        value: function(e) {
            return e ? this.extensions[e] : this.extensions;
        }
    }, {
        key: "setExtension",
        value: function(e) {
            try {
                for (var n in e) if (e.hasOwnProperty(n)) {
                    var t = e[n];
                    -1 !== s.indexOf(n) ? this.extensions[n] = "unionId" === n ? this.config.unionId : t : this.config.version[n] = t;
                }
            } catch (e) {
                console.log("setExtension err");
            }
        }
    }, {
        key: "cacheUnionId",
        value: function(e) {
            wx.setStorage({
                key: i.STOREKEY + "-unionId",
                data: e
            });
        }
    } ]), a;
}();

exports.default = a;