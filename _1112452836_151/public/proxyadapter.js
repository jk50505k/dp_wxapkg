function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = function() {
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

var i = require("../npm/@dp/sparrow/index.js"), a = require("../utils/npm/owl/index"), s = n(require("../config/index")), u = n(require("../npm/@dp/logan-wxapp/build/wxlogan.js")), c = require("../npm/@dp/mina-pike-proxy-adapter/index.js"), l = function(n) {
    function u(r, n) {
        e(this, u);
        var o = t(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, r, n));
        return o.isDebug = !!s.default.DEBUG, o._forceProxy = !o.isDebug && void 0, o.counter = 0, 
        o.COUNTER_METRIC = [ 0, 5, 10, 20, 50, 100, 1 / 0 ], i.wxp.getNetworkType().then(function(e) {
            o.network = e.networkType;
        }), o.proxyConfig = o.getProxyConfig(), o;
    }
    return r(u, c.Adapter), o(u, [ {
        key: "subEvent",
        value: function() {
            var e = this;
            i.event.on("ON_APP_SHOW", function(t) {
                var r = t.options;
                e.startProxy(r || {});
            }), i.event.on("ON_APP_HIDE", function() {
                e.terminalProxy();
            }), i.event.on("dp_proxy_switch", function(t, r) {
                t ? (e._forceProxy = !0, e.startProxy(r || {})) : (e.terminalProxy(), e._forceProxy = !1);
            }), wx.onNetworkStatusChange(function(t) {
                t.isConnected;
                var r = t.networkType;
                e.networkBefore = e.network, e.network = r;
            });
        }
    }, {
        key: "onBeforeStart",
        value: function() {
            this.counter = 0, this.customOwl();
        }
    }, {
        key: "startThreshold",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.scene, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.startPath;
            return void 0 !== this._forceProxy ? this._forceProxy : this.__proto__.__proto__.startThreshold(e, t, r);
        }
    }, {
        key: "onConnect",
        value: function() {
            var e = this;
            this.proxyId || (this.customMetric("channelCreated", this.pike._connectDT - this.pike._startDT, {
                created: this.startPath,
                status: 200,
                network: this.network
            }), this.proxyId = i.request.use({
                type: "request",
                resolve: function(t) {
                    if (t) {
                        var r = t.request;
                        e.filter(r) && (t.adapter = function(t) {
                            return new Promise(function(n, o) {
                                t.success = n, t.fail = o, r.allowDowngrade && (t.allowDowngrade = !0), e.pike.send(t), 
                                ++e.counter;
                            });
                        });
                    }
                    return t;
                },
                reject: function(e) {
                    return Promise.reject(e);
                }
            }));
        }
    }, {
        key: "onDisconnect",
        value: function() {
            this.connected ? this.customMetric("channelDuration", Date.now() - this.pike._connectDT, {
                created: this.startPath,
                scene: this.scene,
                counter: this.parseMetric(this.counter)
            }) : void 0 === this.proxyId && (this.customMetric("channelCreated", Date.now() - this.pike._startDT, {
                created: this.startPath,
                status: 500,
                network: this.network
            }), this.proxyId = null), this.proxyId && (i.request.eject(this.proxyId), this.proxyId = null);
        }
    }, {
        key: "getProxyConfig",
        value: function(e, t) {
            var r = this, n = arguments;
            return i.wxp.getStorage({
                key: "_pike_config"
            }).then(function(e) {
                var t = e.data, r = t.value, n = t.expired, o = t.extra;
                return n && n - Date.now() > 0 ? o && o.env !== i.env.env ? Promise.reject() : r : Promise.reject();
            }).catch(function() {
                return r.fetchConfig.apply(r, n).then(function(e) {
                    if (e) {
                        var t = {
                            value: e,
                            expired: Date.now() + 432e5,
                            extra: {
                                env: i.env.env
                            }
                        };
                        wx.setStorage({
                            key: "_pike_config",
                            data: t
                        });
                    }
                    return e;
                });
            }).then(function(e) {
                if (e) {
                    var t = e.apiWhiteList, r = void 0 === t ? [] : t, n = e.apiBlackList, o = void 0 === n ? [] : n, i = e.debugList, a = void 0 === i ? [] : i;
                    r.length && (e.apiList = c.Util._regParse(r, "interface")), e.apiBlackList = c.Util._regParse(o), 
                    a.length && (e.debugList = c.Util._regParse(a));
                }
                return e;
            });
        }
    }, {
        key: "fetchConfig",
        value: function(e, t) {
            var r = this;
            return i.request.custom({
                url: (this.isDebug ? "https://m.51ping.com" : s.default.DOMAIN) + s.default.API.PIKE_PROXY,
                data: {
                    scene: e,
                    path: t
                }
            }).then(function(e) {
                if (e && 200 === e.statusCode && e.data) {
                    var t = e.data, r = t.data;
                    if (200 !== t.code || !r) return;
                    return r;
                }
            }).catch(function(e) {
                console.warn("Fetch Custom Proxy Config Exception", e), r.isDebug || a.owl.error.addError("Fetch Custom Proxy Config Exception", e);
            });
        }
    }, {
        key: "customOwl",
        value: function() {
            this.owl || (this.owl = new a.owl.OWL({
                project: "wxapp-pike-proxy"
            }));
        }
    }, {
        key: "customMetric",
        value: function(e, t, r) {
            if (!(Math.random() > (this.isDebug ? 1 : .1))) {
                var n = this.owl.newMetric();
                n.setTags(r), n.setMetric(e, t), n.report();
            }
        }
    }, {
        key: "parseMetric",
        value: function(e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "COUNTER", r = arguments[2], n = this[t + "_METRIC"], o = n.length, i = 0; i < o; i++) if (e <= n[i]) {
                e = n[i];
                break;
            }
            return r || Math.abs(e) !== 1 / 0 || (e = e < 0 ? "<" + n[0] : (n[o - 1] !== 1 / 0 ? n[o - 1] : n[o - 2]) + "+"), 
            e;
        }
    }, {
        key: "filter",
        value: function(e) {
            if (!e || !this.connected) return !1;
            try {
                var t = this.proxyConfig, r = t.domainBlackList, n = t.debugList, o = t.apiList, i = t.apiWhiteList, s = t.apiBlackList, u = t.methods, l = void 0 === u ? [ "GET" ] : u, f = e.url.match(/^https?:\/\/([\w.-]+)\/([\w.~_/-]+)[?&]?.*/i), h = e.method || "GET", p = void 0;
                if (!f) return !1;
                if (n && ~c.Util._indexOf(n, f[2])) return e.allowDowngrade = !0, !0;
                if (!~l.indexOf(h)) return !1;
                if (r && ~r.indexOf(f[1])) return !1;
                if (s && ~c.Util._indexOf(s, f[2])) return !1;
                if (!o || ~(p = c.Util._indexOf(o, f[2]))) return (!o || isNaN(i[p].ratio) ? 1 : i[p].ratio) > Math.random();
            } catch (e) {
                console.warn("Handler Proxy Filter Rule Exception", e), a.owl.error.addError("Handler Proxy Filter Rule Exception", e);
            }
            return !1;
        }
    } ]), u;
}();

exports.default = new l("FmhOuHymVHDWfohb", {
    customFilter: !0,
    Owl: a.owl,
    Logan: u.default
});