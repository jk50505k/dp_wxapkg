function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Util = exports.Adapter = void 0;

var n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../pike-client-wx/dist/proxy.js")), o = function() {
    function o(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t(this, o), this.bizId = e, this.options = n, this.connected = !1, this.subEvent();
    }
    return e(o, [ {
        key: "startProxy",
        value: function(t) {
            var e = this, n = t.scene, o = t.path;
            Promise.resolve(this.proxyConfig || this.getProxyConfig(n, o)).then(function(t) {
                return (e.proxyConfig = t) ? (e.scene = n, e.startPath = /^\//.test(o) ? o.substring(1) : o, 
                e.startThreshold(t)) : Promise.reject("Proxy Config Illegal");
            }).then(function(t) {
                (e.proxyConfig.allowProxy = t) && (e.onBeforeStart(), e.initProxy(e.bizId, e.options));
            }).catch(function(t) {
                return e.onError(t);
            });
        }
    }, {
        key: "terminalProxy",
        value: function() {
            this.connected && this.pike.close();
        }
    }, {
        key: "initProxy",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.bizId, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options;
            if (!(!e || this.connected || this.pike && this.pike.pikeId)) {
                var i = o.customFilter, r = o.httpReqwest, s = o.Owl, a = o.Logan;
                this.pike = new n.default(e, {
                    mode: "test" === this.isDebug ? "test" : this.isDebug ? "dev" : void 0,
                    customFilter: i,
                    httpReqwest: r,
                    Owl: s,
                    Logan: a
                }), this.pike._startDT = Date.now(), this.pike.onConnect(function() {
                    t.connected = !0, t.pike._connectDT = Date.now(), t.onConnect();
                }), this.pike.onDisconnect(function() {
                    t.onDisconnect(), t.connected = !1;
                });
            }
        }
    }, {
        key: "subEvent",
        value: function() {}
    }, {
        key: "getProxyConfig",
        value: function(t, e) {
            return {};
        }
    }, {
        key: "startThreshold",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.scene, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.startPath, o = !0;
            if (t) {
                var r = t.proxyRatio, s = t.startPathBlackList, a = t.startPath, c = t.scenes;
                o = !(c && !~c.indexOf(e)) && ((!s || !~i._indexOf(i._regParse(s), n)) && (!(a && !~i._indexOf(i._regParse(a), n)) && r > Math.random()));
            }
            return o;
        }
    }, {
        key: "onBeforeStart",
        value: function() {}
    }, {
        key: "onConnect",
        value: function() {
            console.log("[Pike Adapter] onConnect", Date.now() - this.pike._startDT);
        }
    }, {
        key: "onDisconnect",
        value: function() {
            console.log("[Pike Adapter] onDisconnect", Date.now() - (this.pike._connectDT || this.pike._startDT));
        }
    }, {
        key: "onError",
        value: function(t) {
            console.warn("[Pike Adapter] Err", t);
        }
    } ]), o;
}();

exports.Adapter = o;

var i = exports.Util = {
    _regParse: function(t, e) {
        if (t && "[object Array]" === Object.prototype.toString.call(t)) {
            var n = void 0, o = void 0;
            return t.map(function(t) {
                try {
                    if (o = e ? t[e] : t, "[object RegExp]" === Object.prototype.toString.call(o)) return o;
                    if (n = o.match(/^\/(.*)\/$/)) return new RegExp(n[1]);
                } catch (t) {
                    console.warn("[Pike Adapter Util]: illegal regexp " + o + " ", t);
                }
                return o;
            });
        }
    },
    _indexOf: function(t, e) {
        if (!t || !e) return -1;
        for (var n, o = 0; o < t.length; o++) if (n = t[o], "[object RegExp]" === Object.prototype.toString.call(n) ? n.test(e) : n === e) return o;
        return -1;
    }
};