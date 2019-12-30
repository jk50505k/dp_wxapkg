var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" == ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports.Pike = n() : e.Pike = n();
}("undefined" != typeof self ? self : void 0, function() {
    return function(t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(r.exports, r, r.exports, e), r.l = !0, r.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function(t, n, o) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: o
            });
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(n, "a", n), n;
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 43);
    }([ function(t) {
        function e(t) {
            if (t) return n(t);
        }
        function n(t) {
            for (var n in e.prototype) t[n] = e.prototype[n];
            return t;
        }
        t.exports = e, e.prototype.on = e.prototype.addEventListener = function(t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
            this;
        }, e.prototype.once = function(t, e) {
            function n() {
                this.off(t, n), e.apply(this, arguments);
            }
            return n.fn = e, this.on(t, n), this;
        }, e.prototype.off = e.prototype.removeListener = e.prototype.removeAllListeners = e.prototype.removeEventListener = function(t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var n = this._callbacks["$" + t];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var o, r = 0; r < n.length; r++) if ((o = n[r]) === e || o.fn === e) {
                n.splice(r, 1);
                break;
            }
            return this;
        }, e.prototype.emit = function(t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1), n = this._callbacks["$" + t];
            if (n) for (var o = 0, r = (n = n.slice(0)).length; o < r; ++o) n[o].apply(this, e);
            return this;
        }, e.prototype.listeners = function(t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
        }, e.prototype.hasListeners = function(t) {
            return !!this.listeners(t).length;
        };
    }, function(t, e, n) {
        (function(n) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                isObject: function(t) {
                    return "[object Object]" === Object.prototype.toString.call(t);
                },
                isArray: function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t);
                },
                isFunction: function(t) {
                    return "function" == typeof t;
                },
                isRegexp: function(t) {
                    return "[object RegExp]" === Object.prototype.toString.call(t);
                },
                isUndefined: function(t) {
                    return void 0 === t;
                },
                on: function(t, e, n) {
                    return t.on(e, n), {
                        destroy: function() {
                            t.removeListener(e, n);
                        }
                    };
                },
                encoder: function(t) {
                    try {
                        t = JSON.stringify(t);
                    } catch (t) {}
                    return t;
                },
                decoder: function(t) {
                    try {
                        t = JSON.parse(t);
                    } catch (t) {}
                    return t;
                },
                isSecure: function(t) {
                    return /^(ws|http)s:$/.test(t);
                },
                formatUrl: function(t, e) {
                    if (t) {
                        var o = {
                            source: t
                        };
                        try {
                            for (var r = /^(?:([A-Za-z]+:))?(\/{2})?([0-9.\-A-Za-z]*(?::\d+)?)(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, i = [ "url", "protocol", "slash", "host", "pathname", "query", "hash" ], s = [ void 0, (e = e || n.location || {}).protocol || "https:", "//", e.host || "" ], c = [ , , , , "/", "?", "#" ], a = r.exec(t), u = 1; u < s.length; u++) a[u] || (a[u] = s[u]);
                            a[0] = "", a.map(function(t, e) {
                                t && (a[0] += "" + (c[e] || "") + t);
                            });
                            for (var f = 0; f < i.length; f++) o[i[f]] = a[f];
                        } catch (t) {}
                        return o;
                    }
                }
            }, t.exports = e.default;
        }).call(e, n(2));
    }, function(e) {
        var n = function() {
            return this;
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" == ("undefined" == typeof window ? "undefined" : t(window)) && (n = window);
        }
        e.exports = n;
    }, function(t, e, n) {
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            function t(t, e) {
                var n = [], o = !0, r = !1, i = void 0;
                try {
                    for (var s, c = t[Symbol.iterator](); !(o = (s = c.next()).done) && (n.push(s.value), 
                    !e || n.length !== e); o = !0) ;
                } catch (t) {
                    r = !0, i = t;
                } finally {
                    try {
                        !o && c.return && c.return();
                    } finally {
                        if (r) throw i;
                    }
                }
                return n;
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), i = function() {
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
        }(), s = n(5), c = function() {
            function t() {
                return o(this, t), this.__proto__.__proto__ = s.Util, this.NETWORK_CAT = [ "wifi", "2g", "3g", "4g" ], 
                this;
            }
            return i(t, [ {
                key: "formatDate",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
                    return "string" == typeof t && (t = +new Date(t.replace(/-/g, "/"))), t;
                }
            }, {
                key: "getNetworkType",
                value: function(t) {
                    var e = this;
                    return Promise.resolve(!t && this._netQueryPromise ? this._netQueryPromise : this._netQueryPromise = new Promise(function(t, n) {
                        wx.getNetworkType({
                            success: function(e) {
                                e || n(), t(e.networkType.toLocaleLowerCase());
                            },
                            fail: function() {
                                n(), e._netQueryPromise = null;
                            }
                        });
                    }));
                }
            }, {
                key: "onNetworkChange",
                value: function() {
                    var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.deviceInfo;
                    if (s.Util.isObject(e)) {
                        var n = function(n) {
                            n && (e.network_before = e.network_desc, e.network = t.NETWORK_CAT.indexOf(e.network_desc = n.networkType) + 1);
                        };
                        return wx.onNetworkStatusChange(function(t) {
                            s.Util.isFunction(n) && n(t);
                        }), {
                            destroy: function() {
                                n = null;
                            }
                        };
                    }
                }
            }, {
                key: "getSystemInfo",
                value: function() {
                    var t = this;
                    return Promise.resolve(this._sysQueryPromise || (this._sysQueryPromise = new Promise(function(e, n) {
                        wx.getSystemInfo({
                            success: function(t) {
                                e(t);
                            },
                            fail: function() {
                                n(), t._sysQueryPromise = null;
                            }
                        });
                    })));
                }
            }, {
                key: "parseDeviceInfo",
                value: function() {
                    var t = this;
                    return Promise.all([ this.getNetworkType(), this.getSystemInfo() ]).then(function(e) {
                        var n = r(e, 2), o = n[0], i = n[1];
                        return t.deviceInfo = {
                            channel: "mina",
                            network: t.NETWORK_CAT.indexOf(o) + 1,
                            network_desc: o,
                            platform: /ios/i.test(i.system) ? 11 : 12
                        };
                    }).catch(function() {
                        return {};
                    });
                }
            }, {
                key: "_indexOf",
                value: function(t, e) {
                    if (!t || !e) return -1;
                    for (var n, o = 0; o < t.length; o++) if (n = t[o], s.Util.isRegexp(n) ? n.test(e) : n === e) return o;
                    return -1;
                }
            }, {
                key: "_listRegParse",
                value: function(t, e) {
                    if (!s.Util.isArray(t)) return t;
                    var n = void 0, o = void 0;
                    return t.map(function(t) {
                        try {
                            if (o = e ? t[e] : t, !s.Util.isRegexp(o) && (n = o.match(/^\/(.*)\/$/))) return new RegExp(n[1]);
                        } catch (t) {}
                        return o;
                    });
                }
            } ]), t;
        }();
        e.default = new c(), t.exports = e.default;
    }, function(t, e, n) {
        function o(t, e, n) {
            for (var o = new Array(t.length), r = s(t.length, n), i = 0; i < t.length; i++) !function(t, n, r) {
                e(n, function(e, n) {
                    o[t] = n, r(e, o);
                });
            }(i, t[i], r);
        }
        var r = n(27), i = n(28), s = n(29), c = {};
        "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), 
        e.protocol = 3;
        var a = e.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }, u = r(a), f = {
            type: "error",
            data: "parser error"
        };
        e.encodePacket = function(t, e, n, o) {
            "function" == typeof e && (o = e, e = !1), "function" == typeof n && (o = n, n = null);
            var r = (void 0 === t.data || t.data.buffer || t.data, a[t.type]);
            return void 0 !== t.data && (r += n ? c.encode(String(t.data), {
                strict: !1
            }) : String(t.data)), o("" + r);
        }, e.decodePacket = function(t, e) {
            if (void 0 === t) return f;
            if ("string" == typeof t) {
                n = t.charAt(0);
                return Number(n) == n && u[n] ? t.length > 1 ? {
                    type: u[n],
                    data: t.substring(1)
                } : {
                    type: u[n]
                } : f;
            }
            var n = new Uint8Array(t)[0], o = i(t, 1);
            return Blob && "blob" === e && (o = new Blob([ o ])), {
                type: u[n],
                data: o
            };
        }, e.encodePayload = function(t, n, r) {
            function i(t) {
                return t.length + ":" + t;
            }
            "function" == typeof n && (r = n, n = null);
            var s;
            if (!t.length) return r("0:");
            o(t, function(t, o) {
                e.encodePacket(t, !!s && n, !1, function(t) {
                    o(null, i(t));
                });
            }, function(t, e) {
                return r(e.join(""));
            });
        }, e.decodePayload = function(t, n, o) {
            if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, o);
            "function" == typeof n && (o = n, n = null);
            var r;
            if ("" === t) return o(f, 0, 1);
            for (var i, s, c = "", a = 0, u = t.length; a < u; a++) {
                var l = t.charAt(a);
                if (":" === l) {
                    if ("" === c || c != (i = Number(c))) return o(f, 0, 1);
                    if (s = t.substr(a + 1, i), c != s.length) return o(f, 0, 1);
                    if (s.length) {
                        if (r = e.decodePacket(s, n, !1), f.type === r.type && f.data === r.data) return o(f, 0, 1);
                        if (!1 === o(r, a + i, u)) return;
                    }
                    a += i, c = "";
                } else c += l;
            }
            return "" !== c ? o(f, 0, 1) : void 0;
        }, e.decodePayloadAsBinary = function(t, n, o) {
            "function" == typeof n && (o = n, n = null);
            for (var r = t, s = []; r.byteLength > 0; ) {
                for (var c = new Uint8Array(r), a = 0 === c[0], u = "", l = 1; 255 !== c[l]; l++) {
                    if (u.length > 310) return o(f, 0, 1);
                    u += c[l];
                }
                r = i(r, 2 + u.length), u = parseInt(u);
                var h = i(r, 0, u);
                if (a) try {
                    h = String.fromCharCode.apply(null, new Uint8Array(h));
                } catch (t) {
                    var p = new Uint8Array(h);
                    h = "";
                    for (l = 0; l < p.length; l++) h += String.fromCharCode(p[l]);
                }
                s.push(h), r = i(r, u);
            }
            var d = s.length;
            s.forEach(function(t, r) {
                o(e.decodePacket(t, n, !0), r, d);
            });
        };
    }, function(t, e, n) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = o(n(19)), i = o(n(35)), s = o(n(15)), c = o(n(1));
        e.default = {
            Bootstrap: r.default,
            Core: i.default,
            URLManager: s.default,
            Util: c.default
        }, t.exports = e.default;
    }, function(t, e, n) {
        function o() {}
        function r(t) {
            var n = "" + t.type;
            if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"), 
            t.nsp && "/" !== t.nsp && (n += t.nsp + ","), null != t.id && (n += t.id), null != t.data) {
                var o = i(t.data);
                if (!1 === o) return h;
                n += o;
            }
            return n;
        }
        function i(t) {
            try {
                return JSON.stringify(t);
            } catch (t) {
                return !1;
            }
        }
        function s() {
            this.reconstructor = null;
        }
        function c(t) {
            var n = 0, o = {
                type: Number(t.charAt(0))
            };
            if (null == e.types[o.type]) return u("unknown packet type " + o.type);
            if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
                for (var r = ""; "-" !== t.charAt(++n) && (r += t.charAt(n), n != t.length); ) ;
                if (r != Number(r) || "-" !== t.charAt(n)) throw new Error("Illegal attachments");
                o.attachments = Number(r);
            }
            if ("/" === t.charAt(n + 1)) for (o.nsp = ""; ++n && "," !== (s = t.charAt(n)) && (o.nsp += s, 
            n !== t.length); ) ; else o.nsp = "/";
            var i = t.charAt(n + 1);
            if ("" !== i && Number(i) == i) {
                for (o.id = ""; ++n; ) {
                    var s = t.charAt(n);
                    if (null == s || Number(s) != s) {
                        --n;
                        break;
                    }
                    if (o.id += t.charAt(n), n === t.length) break;
                }
                o.id = Number(o.id);
            }
            if (t.charAt(++n)) {
                var c = a(t.substr(n));
                if (!1 === c || o.type !== e.ERROR && !l(c)) return u("invalid payload");
                o.data = c;
            }
            return o;
        }
        function a(t) {
            try {
                return JSON.parse(t);
            } catch (t) {
                return !1;
            }
        }
        function u(t) {
            return {
                type: e.ERROR,
                data: "parser error: " + t
            };
        }
        var f = n(0), l = n(22);
        e.protocol = 4, e.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
        e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, 
        e.BINARY_ACK = 6, e.Encoder = o, e.Decoder = s;
        var h = e.ERROR + '"encode error"';
        o.prototype.encode = function(t, n) {
            e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type ? console.warn("Not Support BINARY Type") : n([ r(t) ]);
        }, f(s.prototype), s.prototype.add = function(t) {
            var e;
            if ("string" != typeof t) throw new Error("Unknown type: " + t);
            e = c(t), this.emit("decoded", e);
        }, s.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction();
        };
    }, function(t) {
        var e = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
        t.exports = function(t) {
            var o = t, r = t.indexOf("["), i = t.indexOf("]");
            -1 != r && -1 != i && (t = t.substring(0, r) + t.substring(r, i).replace(/:/g, ";") + t.substring(i, t.length));
            for (var s = e.exec(t || ""), c = {}, a = 14; a--; ) c[n[a]] = s[a] || "";
            return -1 != r && -1 != i && (c.source = o, c.host = c.host.substring(1, c.host.length - 1).replace(/;/g, ":"), 
            c.authority = c.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
            c.ipv6uri = !0), c;
        };
    }, function(e, n, o) {
        function r(e, n) {
            if (!(this instanceof r)) return new r(e, n);
            e && "object" == (void 0 === e ? "undefined" : t(e)) && (n = e, e = void 0), (n = n || {}).path = n.path || "/socket.io", 
            this.nsps = {}, this.subs = [], this.traceSubs = [], this.opts = n, this.reconnection(!1 !== n.reconnection), 
            this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), 
            this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor(n.randomizationFactor || .5), 
            this.backoff = new h({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == n.timeout ? 2e4 : n.timeout), this.readyState = "closed", 
            this.uri = e, this.connecting = [], this.encoding = !1, this.packetBuffer = [];
            var o = n.parser || a;
            this.encoder = new o.Encoder(), this.decoder = new o.Decoder(), this.autoConnect = !1 !== n.autoConnect, 
            this.autoConnect && this.open();
        }
        var i = o(23), s = o(12), c = o(0), a = o(6), u = o(13), f = o(14), l = o(11), h = o(32), p = Object.prototype.hasOwnProperty;
        e.exports = r, r.prototype.emitAll = function() {
            this.emit.apply(this, arguments);
            for (var t in this.nsps) p.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
        }, r.prototype.updateSocketIds = function() {
            for (var t in this.nsps) p.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
        }, r.prototype.generateId = function(t) {
            return ("/" === t ? "" : t + "#") + this.engine.id;
        }, c(r.prototype), r.prototype.reconnection = function(t) {
            if (!arguments.length) return this._reconnection;
            this._reconnection = !!t;
        }, r.prototype.reconnectionAttempts = function(t) {
            if (!arguments.length) return this._reconnectionAttempts;
            this._reconnectionAttempts = t;
        }, r.prototype.reconnectionDelay = function(t) {
            if (!arguments.length) return this._reconnectionDelay;
            this._reconnectionDelay = t;
        }, r.prototype.randomizationFactor = function(t) {
            if (!arguments.length) return this._randomizationFactor;
            this._randomizationFactor = t;
        }, r.prototype.reconnectionDelayMax = function(t) {
            if (!arguments.length) return this._reconnectionDelayMax;
            this._reconnectionDelayMax = t;
        }, r.prototype.timeout = function(t) {
            if (!arguments.length) return this._timeout;
            this._timeout = t;
        }, r.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }, r.prototype.open = r.prototype.connect = function(t) {
            if (~this.readyState.indexOf("open")) return this;
            this.engine = i(this.uri, this.opts);
            var e = this.engine, n = this;
            this.readyState = "opening", this.skipReconnect = !1, this.traceSubs.push(u(e, "PIKE_SIO_TRACE", function(t) {
                n.emit("PIKE_SIO_TRACE", t);
            })), this.traceSubs.push(u(e.transport, "PIKE_SIO_TRACE", function(t) {
                n.emit("PIKE_SIO_TRACE", t);
            }));
            var o = u(e, "open", function() {
                n.onopen(), t && t();
            }), r = u(e, "error", function(e) {
                n.emit("PIKE_SIO_TRACE", "[Manager] connect error"), n.cleanup();
                var o = n.traceSubs || [];
                if (o.length && (n.traceSubs = [], n.cleanup_delay(o, 3e3)), n.readyState = "closed", 
                n.emitAll("connect_error", e), t) {
                    var r = new Error("Connection error");
                    r.data = e, t(r);
                } else n.maybeReconnectOnOpen();
            });
            if (!1 !== this._timeout) {
                var s = this._timeout, c = setTimeout(function() {
                    o.destroy(), e.close(), e.emit("error", "timeout"), n.emitAll("connect_timeout", s);
                }, s);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(c);
                    }
                });
            }
            return this.subs.push(o), this.subs.push(r), this;
        }, r.prototype.onopen = function() {
            this.cleanup(), this.readyState = "open", this.emit("open");
            var t = this.engine;
            this.subs.push(u(t, "data", f(this, "ondata"))), this.subs.push(u(t, "error", f(this, "onerror"))), 
            this.subs.push(u(t, "close", f(this, "onclose"))), this.subs.push(u(this.decoder, "decoded", f(this, "ondecoded")));
        }, r.prototype.ondata = function(t) {
            this.decoder.add(t);
        }, r.prototype.ondecoded = function(t) {
            this.emit("packet", t);
        }, r.prototype.onerror = function(t) {
            this.emitAll("error", t);
        }, r.prototype.socket = function(t, e) {
            function n() {
                ~l(r.connecting, o) || r.connecting.push(o);
            }
            var o = this.nsps[t];
            if (!o) {
                o = new s(this, t, e), this.nsps[t] = o;
                var r = this;
                o.on("connecting", n), o.on("connect", function() {
                    o.id = r.generateId(t);
                }), this.autoConnect && n();
            }
            return o;
        }, r.prototype.destroy = function(t) {
            var e = l(this.connecting, t);
            ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
        }, r.prototype.packet = function(t) {
            var e = this;
            t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, 
            this.encoder.encode(t, function(n) {
                for (var o = 0; o < n.length; o++) e.engine.write(n[o], t.options);
                e.encoding = !1, e.processPacketQueue();
            }));
        }, r.prototype.processPacketQueue = function() {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var t = this.packetBuffer.shift();
                this.packet(t);
            }
        }, r.prototype.cleanup = function() {
            for (var t = this.subs.length, e = 0; e < t; e++) this.subs.shift().destroy();
            this.packetBuffer = [], this.encoding = !1, this.decoder.destroy();
        }, r.prototype.cleanup_delay = function(t, e) {
            setTimeout(function() {
                for (var e = t.length - 1; e >= 0; e--) t[e].destroy(), t.pop();
            }, parseInt(e) || 0);
        }, r.prototype.close = r.prototype.disconnect = function() {
            if (this.emit("PIKE_SIO_TRACE", "[Manager] close action, state: " + this.readyState), 
            this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState) {
                var t = this.traceSubs || [];
                this.traceSubs = [], this.cleanup(), t.lenght && this.cleanup_delay(t, 3e3);
            }
            this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
        }, r.prototype.onclose = function(t) {
            if (this.emit("PIKE_SIO_TRACE", "[Manager] onclose" + (this._reconnection && !this.skipReconnect ? " -> reconnect" : "")), 
            this.cleanup(), this.traceSubs.length) {
                var e = this.traceSubs;
                this.traceSubs = [], this.cleanup_delay(e, 3e3);
            }
            this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();
        }, r.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect) return this;
            var t = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) this.emit("PIKE_SIO_TRACE", "[Manager] reconnect failed"), 
            this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                var e = this.backoff.duration();
                this.reconnecting = !0;
                var n = setTimeout(function() {
                    t.skipReconnect || (t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), 
                    t.skipReconnect || t.open(function(e) {
                        e ? (t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (t.emit("PIKE_SIO_TRACE", "[Manager] reconnect success: " + t.backoff.attempts), 
                        t.onreconnect());
                    }));
                }, e);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(n);
                    }
                });
            }
        }, r.prototype.onreconnect = function() {
            var t = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);
        };
    }, function(t, e, n) {
        e.websocket = n(25);
    }, function(t, e) {
        e.encode = function(t) {
            var e = "";
            for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
            return e;
        }, e.decode = function(t) {
            for (var e = {}, n = t.split("&"), o = 0, r = n.length; o < r; o++) {
                var i = n[o].split("=");
                e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
            }
            return e;
        };
    }, function(t) {
        var e = [].indexOf;
        t.exports = function(t, n) {
            if (e) return t.indexOf(n);
            for (var o = 0; o < t.length; ++o) if (t[o] === n) return o;
            return -1;
        };
    }, function(t, e, n) {
        function o(t, e, n) {
            this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.receiveBuffer = [], 
            this.sendBuffer = [], this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), 
            this.io.autoConnect && this.open();
        }
        var r = n(6), i = n(0), s = n(31), c = n(13), a = n(14);
        t.exports = o;
        var u = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }, f = i.prototype.emit;
        i(o.prototype), o.prototype.subEvents = function() {
            if (!this.subs) {
                var t = this.io;
                this.subs = [ c(t, "open", a(this, "onopen")), c(t, "packet", a(this, "onpacket")), c(t, "close", a(this, "onclose")) ];
            }
        }, o.prototype.open = o.prototype.connect = function() {
            return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), 
            this.emit("connecting"), this);
        }, o.prototype.send = function() {
            var t = s(arguments);
            return t.unshift("message"), this.emit.apply(this, t), this;
        }, o.prototype.emit = function(t) {
            if (u.hasOwnProperty(t)) return f.apply(this, arguments), this;
            var e = s(arguments), n = {
                type: r.EVENT,
                data: e
            };
            return n.options = {}, n.options.compress = !this.flags || !1 !== this.flags.compress, 
            this.connected ? this.packet(n) : this.sendBuffer.push(n), delete this.flags, this;
        }, o.prototype.packet = function(t) {
            t.nsp = this.nsp, this.io.packet(t);
        }, o.prototype.onopen = function() {
            "/" !== this.nsp && this.packet({
                type: r.CONNECT
            });
        }, o.prototype.onclose = function(t) {
            this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t);
        }, o.prototype.onpacket = function(t) {
            if (t.nsp === this.nsp) switch (t.type) {
              case r.CONNECT:
                this.onconnect();
                break;

              case r.EVENT:
                this.onevent(t);
                break;

              case r.DISCONNECT:
                this.ondisconnect();
                break;

              case r.ERROR:
                this.emit("error", t.data);
            }
        }, o.prototype.onevent = function(t) {
            var e = t.data || [];
            this.connected ? f.apply(this, e) : this.receiveBuffer.push(e);
        }, o.prototype.onconnect = function() {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
        }, o.prototype.emitBuffered = function() {
            var t;
            for (t = 0; t < this.receiveBuffer.length; t++) f.apply(this, this.receiveBuffer[t]);
            for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
            this.sendBuffer = [];
        }, o.prototype.ondisconnect = function() {
            this.destroy(), this.onclose("io server disconnect");
        }, o.prototype.destroy = function() {
            if (this.subs) {
                for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                this.subs = null;
            }
            this.io.destroy(this);
        }, o.prototype.close = o.prototype.disconnect = function() {
            return this.connected && this.packet({
                type: r.DISCONNECT
            }), this.connected && this.io.once("close", this.onclose.bind(this)), this.destroy(), 
            this;
        };
    }, function(t) {
        t.exports = function(t, e, n) {
            return t.on(e, n), {
                destroy: function() {
                    t.removeListener(e, n);
                }
            };
        };
    }, function(t) {
        var e = [].slice;
        t.exports = function(t, n) {
            if ("string" == typeof n && (n = t[n]), "function" != typeof n) throw new Error("bind() requires a function");
            var o = e.call(arguments, 2);
            return function() {
                return n.apply(t, o.concat(e.call(arguments)));
            };
        };
    }, function(t, e, n) {
        (function(o) {
            function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
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
            }(), s = n(1), c = [ "dev", "test", "ppe", "stage", "product" ], a = function() {
                function t() {
                    r(this, t), this.urlMap = {
                        loadBalance: {
                            dev: "//pike-lb.inf.dev.sankuai.com/loadbalance",
                            test: "//pike-lb.sankuai.com/loadbalance",
                            ppe: "//pike-lb-ppe.sankuai.com/loadbalance",
                            stage: "//pike-lb.inf.st.sankuai.com/loadbalance",
                            product: "//pike-lb.dianping.com/loadbalance"
                        },
                        proxyConfig: {
                            dev: "//m.51ping.com/mina/pike/config",
                            test: "//m.51ping.com/mina/pike/config",
                            ppe: "//m.51ping.com/mina/pike/config",
                            stage: "//m.dianping.com/mina/pike/config",
                            product: "//m.dianping.com/mina/pike/config"
                        }
                    };
                }
                return i(t, [ {
                    key: "registry",
                    value: function(t, e) {
                        !(0, s.isUndefined)(t) && (0, s.isObject)(e) && (this.urlMap[t] = e);
                    }
                }, {
                    key: "query",
                    value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.env;
                        try {
                            var n = o.location ? o.location.protocol : "https:", r = this.urlMap[t][e];
                            return r && (r = /^https?:/.test(r) ? r.replace(/https?:/, n) : n + r), r;
                        } catch (t) {}
                    }
                }, {
                    key: "env",
                    set: function(t) {
                        ~c.indexOf(t) && (this._env = t);
                    },
                    get: function() {
                        return this._env || "product";
                    }
                } ]), t;
            }();
            e.default = new a(), t.exports = e.default;
        }).call(e, n(2));
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            ENV: "product",
            SDK_VERSION: "1.0.6",
            SERVER_PROTOCOL_VERSION: 1,
            SEND_QUEUE_MAX: 1e3
        }, t.exports = e.default;
    }, function(t, e) {
        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = function() {
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
        }(), r = function() {
            function t(e) {
                var o = e.data, r = e.succ, i = e.fail, s = e.type, c = void 0 === s ? 0 : s, a = e.extra;
                n(this, t), this.data = o || {}, this.succ = r || this.noop, this.fail = i || this.noop, 
                this.type = c, this.extra = a, this.state = 0;
            }
            return o(t, [ {
                key: "dispose",
                value: function() {
                    this.succ = null, this.fail = null;
                }
            }, {
                key: "noop",
                value: function() {}
            } ]), t;
        }();
        e.default = r, t.exports = e.default;
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
            function t(t, e) {
                var n = [], o = !0, r = !1, i = void 0;
                try {
                    for (var s, c = t[Symbol.iterator](); !(o = (s = c.next()).done) && (n.push(s.value), 
                    !e || n.length !== e); o = !0) ;
                } catch (t) {
                    r = !0, i = t;
                } finally {
                    try {
                        !o && c.return && c.return();
                    } finally {
                        if (r) throw i;
                    }
                }
                return n;
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }(), u = function() {
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
        }(), f = o(5), l = r(o(3)), h = r(o(37)), p = r(o(39)), d = o(16), y = function(t) {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
            }
            return c(e, f.Bootstrap), u(e, [ {
                key: "registryPlugin",
                value: function(t) {
                    var e = t.env, n = t.mode, o = (t.Logan, t.Owl, t.httpReqwest);
                    h.default.env = f.URLManager.env = e || d.ENV, this.HttpReqwest = l.default.isFunction(o) ? o : wx.request, 
                    this.StorageService = h.default, this.ReportService = new p.default(this, {
                        _context: this,
                        mode: n
                    }), this.bootsSubs.push({
                        destroy: this.ReportService.destroy
                    });
                }
            }, {
                key: "createContext",
                value: function(t) {
                    var e = this;
                    return this.SDK_VERSION = d.SDK_VERSION, this._context || (this._context = Promise.all([ l.default.parseDeviceInfo(), this.registryPlugin(t) ]).then(function(t) {
                        var n = a(t, 1)[0], o = void 0 === n ? {} : n;
                        return e.deviceInfo = o, e.bootsSubs.push({
                            destroy: l.default.onNetworkChange().destroy
                        }), e._context = e;
                    }));
                }
            }, {
                key: "checkStatus",
                value: function() {
                    return this._pike.connected ? 1 : this._pike.pikeId ? 0 : -1;
                }
            } ]), e;
        }();
        n.default = y, e.exports = n.default;
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        }, u = function() {
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
        }(), f = r(o(0)), l = r(o(20)), h = o(1), p = r(o(33)), d = {
            path: "/pike",
            reconnectionAttempts: 4,
            reconnectionDelay: 1e3,
            reconnectionDelayMax: 5e3
        }, y = {
            transports: [ "websocket" ],
            autoConnect: !0,
            timeout: 1e4
        }, v = function(t) {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (i(this, e), !t) throw Error("BizId Invalid");
                var o = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return o.bizId = t, o.disconnected = !0, o._pike = o, o.options = a({}, y, n, o.getConnectSetting()), 
                o.subEvents(), o.createContext(o.options).then(function(e) {
                    e.emit("REPORT_ACTION", "Pike SDK Version", 0, {
                        metric: {
                            tags: {
                                bizId: t,
                                version: e.SDK_VERSION
                            }
                        }
                    });
                }), o.wrap(n), o.options.autoConnect && o.open(), o;
            }
            return c(e, f.default), u(e, [ {
                key: "open",
                value: function() {
                    var t = this;
                    (this._pike === this || this.disconnected) && Promise.resolve(this._context).then(function(e) {
                        (0, h.isObject)(e) && !t.ConnectManager && (t.ConnectManager = new p.default(t, {
                            _context: e,
                            io: l.default,
                            socketOpts: t.options,
                            parallelMax: e.connParallelMax
                        }), t.bootsSubs.push({
                            destroy: t.ConnectManager.destroy.bind(t.ConnectManager)
                        }), t.emit("BOOTS_CONNECT"));
                    });
                }
            }, {
                key: "subEvents",
                value: function() {
                    var t = this;
                    this.bootsSubs || (this.bootsSubs = [ (0, h.on)(this, "BOOTS_CONNECT", function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.bizId, n = arguments[1], o = arguments[2];
                        Promise.resolve(o && 2 === o.mode && t.ConnectManager.RouterManager.updateRouterList(e, [])).then(function() {
                            t.connectAction(e, n, o);
                        });
                    }) ]);
                }
            }, {
                key: "connectAction",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.bizId, e = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (!this.connectSubs || !this.connectSubs.length) {
                        this.emit("START_CONNECT", t, o);
                        var r = 0, i = Date.now(), s = setTimeout(function() {
                            r || (r = -1, o.mode || e.emit("close", "Connect Timeout"), e.emit("CONNECT_EVENT", "Socket Connect Timeout", 1), 
                            c(400));
                        }, n.timeout);
                        this.connectSubs = [ (0, h.on)(this, "INIT_SOCKET_FAIL", function() {
                            e.destroy(e.connectSubs), 2 !== o.mode && (e._pike === e || e._pike.destroy(1 !== o.mode), 
                            e.destroy()), r || (r = -1, o.mode || e.emit("close", "No Accessible Connect Server"), 
                            e.emit("CONNECT_EVENT", "No Accessible Connect Server", 1), c(500));
                        }), (0, h.on)(this, "INIT_SOCKET_SUCC", function(t) {
                            if (e.destroy(e.connectSubs), 2 === o.mode) return t.close();
                            if (r) return t.close(), e._pike === e || e._pike.destroy(1 !== o.mode), void e.destroy();
                            r = 1, t.io.reconnection(!0), e.socket = t;
                            try {
                                e._pike.registry(), e.disconnected = !1, c(200);
                            } catch (n) {
                                t.close(), e.destroy(), e.disconnected = !0, o.mode || e.emit("error", "SDK Core Exception"), 
                                e.emit("CLIENT_ACTION", "SDK Core Exception", 2), c(404);
                            }
                        }), {
                            destroy: function() {
                                clearTimeout(s);
                            }
                        } ];
                        var c = function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 200, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Date.now() - i;
                            e._context.emit("REPORT_ACTION", "Pike Create Connect", 0, {
                                metric: {
                                    tags: {
                                        network: e._context.deviceInfo.network_desc,
                                        status: t,
                                        bizId: e.bizId
                                    },
                                    duration: n
                                }
                            });
                        };
                    }
                }
            }, {
                key: "send",
                value: function(t, e, n) {
                    try {
                        if (this._pike === this) throw Error("SDK Unready");
                        this._pike.send(t, e, n);
                    } catch (t) {
                        this.emit("error", "Pike SDK: Send Exception, " + (t && (t.message || t)));
                    }
                }
            }, {
                key: "close",
                value: function() {
                    try {
                        if (this._pike === this || this.disconnected) throw Error("Instance unavailable");
                        this._pike.close();
                    } catch (t) {
                        this.emit("error", "Pike SDK: Close Exception, " + (t && (t.message || t)));
                    }
                }
            }, {
                key: "onConnect",
                value: function(t) {
                    (0, h.isFunction)(t) && (0, h.on)(this, "connect", function(e) {
                        try {
                            t(e);
                        } catch (t) {}
                    });
                }
            }, {
                key: "onDisconnect",
                value: function(t) {
                    (0, h.isFunction)(t) && (0, h.on)(this, "close", function(e) {
                        try {
                            t(e);
                        } catch (t) {}
                    });
                }
            }, {
                key: "onMessage",
                value: function(t) {
                    (0, h.isFunction)(t) && (0, h.on)(this, "message", function(e) {
                        try {
                            t(e);
                        } catch (t) {}
                    });
                }
            }, {
                key: "onError",
                value: function(t) {
                    (0, h.isFunction)(t) && (0, h.on)(this, "error", function(e) {
                        try {
                            t(e);
                        } catch (t) {}
                    });
                }
            }, {
                key: "wrap",
                value: function(t) {
                    var e = this.getBizModeConstructor();
                    this._pike = new e(t);
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.bootsSubs;
                    if (t) {
                        for (var e = t.length - 1; e >= 0; e--) t[e].destroy(), t.pop();
                        t == this.bootsSubs && (this.bootsSubs = null);
                    }
                }
            }, {
                key: "noop",
                value: function() {}
            }, {
                key: "getConnectSetting",
                value: function() {
                    return d;
                }
            }, {
                key: "createContext",
                value: function() {}
            }, {
                key: "getBizModeConstructor",
                value: function() {}
            } ]), e;
        }();
        n.default = v, e.exports = n.default;
    }, function(e, n, o) {
        function r(e, n) {
            "object" == (void 0 === e ? "undefined" : t(e)) && (n = e, e = void 0), n = n || {};
            var o, r = i(e), s = r.source, u = r.id, f = r.path, l = a[u] && f in a[u].nsps;
            return n.forceNew || n["force new connection"] || !1 === n.multiplex || l ? o = c(s, n) : (a[u] || (a[u] = c(s, n)), 
            o = a[u]), o.socket(r.path, n);
        }
        var i = o(21), s = o(6), c = o(8);
        e.exports = n = r;
        var a = n.managers = {};
        n.protocol = s.protocol, n.connect = r, n.Manager = o(8), n.Socket = o(12);
    }, function(t, e, n) {
        (function(e) {
            var o = n(7);
            t.exports = function(t, n) {
                var r = t;
                n = n || e.location, null == t && (t = n.protocol + "//" + n.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t), 
                /^(https?|wss?):\/\//.test(t) || (t = void 0 !== n ? n.protocol + "//" + t : "https://" + t), 
                r = o(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), 
                r.path = r.path || "/";
                var i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
                return r.id = r.protocol + "://" + i + ":" + r.port, r.href = r.protocol + "://" + i + (n && n.port === r.port ? "" : ":" + r.port), 
                r;
            };
        }).call(e, n(2));
    }, function(t) {
        var e = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == e.call(t);
        };
    }, function(t, e, n) {
        t.exports = n(24);
    }, function(e, n, o) {
        (function(n) {
            function r(e, o) {
                if (!(this instanceof r)) return new r(e, o);
                o = o || {}, e && "object" == (void 0 === e ? "undefined" : t(e)) && (o = e, e = null), 
                e ? (e = u(e), o.hostname = e.host, o.secure = "https" === e.protocol || "wss" === e.protocol, 
                o.port = e.port, e.query && (o.query = e.query)) : o.host && (o.hostname = u(o.host).host), 
                this.secure = null != o.secure ? o.secure : n.location && "https:" === location.protocol, 
                o.hostname && !o.port && (o.port = this.secure ? "443" : "80"), this.agent = o.agent || !1, 
                this.hostname = o.hostname || (n.location ? location.hostname : "localhost"), this.port = o.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), 
                this.query = o.query || {}, "string" == typeof this.query && (this.query = f.decode(this.query)), 
                this.path = (o.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!o.forceJSONP, 
                this.jsonp = !1 !== o.jsonp, this.forceBase64 = !!o.forceBase64, this.enablesXDR = !!o.enablesXDR, 
                this.timestampParam = o.timestampParam || "t", this.timestampRequests = o.timestampRequests, 
                this.transports = o.transports || [ "polling", "websocket" ], this.transportOptions = o.transportOptions || {}, 
                this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.binaryType = null, 
                this.id = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
                this.pingTimeoutTimer = null, this.open();
            }
            function i(t) {
                var e = {};
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
            }
            var s = o(9), c = o(0), a = (o(11), o(4)), u = o(7), f = o(10);
            e.exports = r, r.priorWebsocketSuccess = !1, c(r.prototype), r.protocol = a.protocol, 
            r.Socket = r, r.transports = o(9), r.parser = o(4), r.prototype.createTransport = function(t) {
                var e = i(this.query);
                e.EIO = a.protocol, e.transport = t;
                var n = this.transportOptions[t] || {};
                return this.id && (e.sid = this.id), new s[t]({
                    query: e,
                    socket: this,
                    agent: n.agent || this.agent,
                    hostname: n.hostname || this.hostname,
                    port: n.port || this.port,
                    secure: n.secure || this.secure,
                    path: n.path || this.path,
                    forceJSONP: n.forceJSONP || this.forceJSONP,
                    jsonp: n.jsonp || this.jsonp,
                    forceBase64: n.forceBase64 || this.forceBase64,
                    enablesXDR: n.enablesXDR || this.enablesXDR,
                    timestampRequests: n.timestampRequests || this.timestampRequests,
                    timestampParam: n.timestampParam || this.timestampParam,
                    extraHeaders: n.extraHeaders || this.extraHeaders,
                    requestTimeout: n.requestTimeout || this.requestTimeout,
                    protocols: n.protocols || void 0
                });
            }, r.prototype.open = function() {
                var t;
                if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
                    if (0 === this.transports.length) {
                        var e = this;
                        return void setTimeout(function() {
                            e.emit("error", "No transports available");
                        }, 0);
                    }
                    t = this.transports[0];
                }
                this.readyState = "opening";
                try {
                    t = this.createTransport(t);
                } catch (t) {
                    return this.transports.shift(), void this.open();
                }
                t.open(), this.setTransport(t);
            }, r.prototype.setTransport = function(t) {
                var e = this;
                this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", function() {
                    e.onDrain();
                }).on("packet", function(t) {
                    e.onPacket(t);
                }).on("error", function(t) {
                    e.onError(t);
                }).on("close", function() {
                    e.onClose("transport close");
                });
            }, r.prototype.onOpen = function() {
                this.readyState = "open", r.priorWebsocketSuccess = this.transport.name.indexOf("websocket") > -1, 
                this.emit("open"), this.flush();
            }, r.prototype.onPacket = function(t) {
                if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emit("packet", t), 
                this.emit("heartbeat"), t.type) {
                  case "open":
                    this.onHandshake(JSON.parse(t.data));
                    break;

                  case "pong":
                    this.setPing(), this.emit("pong");
                    break;

                  case "error":
                    var e = new Error("server error");
                    e.code = t.data, this.onError(e);
                    break;

                  case "message":
                    this.emit("data", t.data), this.emit("message", t.data);
                }
            }, r.prototype.onHandshake = function(t) {
                this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.pingInterval = t.pingInterval, 
                this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), 
                this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));
            }, r.prototype.onHeartbeat = function(t) {
                clearTimeout(this.pingTimeoutTimer);
                var e = this;
                e.pingTimeoutTimer = setTimeout(function() {
                    "closed" !== e.readyState && e.onClose("ping timeout");
                }, t || e.pingInterval + e.pingTimeout);
            }, r.prototype.setPing = function() {
                var t = this;
                clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                    t.ping(), t.onHeartbeat(t.pingTimeout);
                }, t.pingInterval);
            }, r.prototype.ping = function() {
                var t = this;
                this.sendPacket("ping", function() {
                    t.emit("ping");
                });
            }, r.prototype.onDrain = function() {
                this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
            }, r.prototype.flush = function() {
                "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer), 
                this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));
            }, r.prototype.write = r.prototype.send = function(t, e, n) {
                return this.sendPacket("message", t, e, n), this;
            }, r.prototype.sendPacket = function(t, e, n, o) {
                if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, 
                n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                    (n = n || {}).compress = !1 !== n.compress;
                    var r = {
                        type: t,
                        data: e,
                        options: n
                    };
                    this.emit("packetCreate", r), this.writeBuffer.push(r), o && this.once("flush", o), 
                    this.flush();
                }
            }, r.prototype.close = function() {
                function t() {
                    e.emit("PIKE_SIO_TRACE", "[Engine] close action"), e.transport.close();
                }
                if ("opening" === this.readyState || "open" === this.readyState) {
                    this.readyState = "closing";
                    var e = this;
                    this.writeBuffer.length ? this.once("drain", function() {
                        t();
                    }) : t();
                }
                return this;
            }, r.prototype.onError = function(t) {
                this.emit("PIKE_SIO_TRACE", "[Engine] onerror: " + JSON.stringify(t)), r.priorWebsocketSuccess = !1, 
                this.emit("error", t), this.onClose("transport error", t);
            }, r.prototype.onClose = function(t, e) {
                if (this.emit("PIKE_SIO_TRACE", "[Engine] onclose, state: " + this.readyState), 
                "opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                    var n = this;
                    clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
                    this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
                    this.id = null, this.emit("close", t, e), n.writeBuffer = [], n.prevBufferLen = 0;
                }
            };
        }).call(n, o(2));
    }, function(t, e, n) {
        function o(t) {
            t && t.forceBase64 && (this.supportsBinary = !1), r.call(this, t);
        }
        var r = n(26), i = n(4), s = n(30), c = n(10);
        s(o, r), t.exports = o, o.prototype.name = "websocket4Mina", o.prototype.supportsBinary = !0, 
        o.prototype.doOpen = function() {
            var t = {
                url: this.uri()
            };
            this.protocols && this.protocols.length && (t.protocols = this.protocols), this.extraHeaders && (t.extraHeaders = this.extraHeaders);
            try {
                this.ws = wx.connectSocket(t), this.ws.binaryType = "arraybuffer", this.addEventListeners();
            } catch (t) {
                return this.emit("error", t);
            }
        }, o.prototype.addEventListeners = function() {
            var t = this;
            this.ws.onOpen(t.onOpen.bind(this)), this.ws.onClose(t.onClose.bind(this)), this.ws.onError(t.onError.bind(this)), 
            this.ws.onMessage(function(e) {
                t.onData.call(t, e.data);
            });
        }, o.prototype.write = function(t) {
            function e() {
                n.emit("flush"), setTimeout(function() {
                    n.writable = !0, n.emit("drain");
                }, 0);
            }
            var n = this;
            this.writable = !1;
            for (var o = t.length, r = 0, s = o; r < s; r++) !function(t) {
                i.encodePacket(t, n.supportsBinary, function(t) {
                    try {
                        n.ws.send({
                            data: t
                        });
                    } catch (t) {}
                    --o || e();
                });
            }(t[r]);
        }, o.prototype.close = function() {
            return this.emit("PIKE_SIO_TRACE", "[Native] close action, state: " + this.readyState), 
            "opening" !== this.readyState && "open" !== this.readyState || this.doClose(), this;
        }, o.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close();
        }, o.prototype.uri = function() {
            var t = this.query || {}, e = this.secure ? "wss" : "ws", n = "";
            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), 
            this.supportsBinary || (t.b64 = 1), (t = c.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;
        };
    }, function(t, e, n) {
        function o(t) {
            this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, 
            this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, 
            this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, 
            this.extraHeaders = t.extraHeaders;
        }
        var r = n(4), i = n(0);
        t.exports = o, i(o.prototype), o.prototype.onError = function(t, e) {
            var n = new Error(t);
            return n.type = "TransportError", n.description = e, this.emit("error", n), this;
        }, o.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
            this.doOpen()), this;
        }, o.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
            this.onClose()), this;
        }, o.prototype.send = function(t) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(t);
        }, o.prototype.onOpen = function() {
            this.readyState = "open", this.writable = !0, this.emit("open");
        }, o.prototype.onData = function(t) {
            var e = r.decodePacket(t, this.socket.binaryType);
            this.onPacket(e);
        }, o.prototype.onPacket = function(t) {
            this.emit("packet", t);
        }, o.prototype.onClose = function() {
            this.emit("PIKE_SIO_TRACE", "[Native] onclose"), this.readyState = "closed", this.emit("close");
        };
    }, function(t) {
        t.exports = Object.keys || function(t) {
            var e = [], n = Object.prototype.hasOwnProperty;
            for (var o in t) n.call(t, o) && e.push(o);
            return e;
        };
    }, function(t) {
        t.exports = function(t, e, n) {
            var o = t.byteLength;
            if (e = e || 0, n = n || o, t.slice) return t.slice(e, n);
            if (e < 0 && (e += o), n < 0 && (n += o), n > o && (n = o), e >= o || e >= n || 0 === o) return new ArrayBuffer(0);
            for (var r = new Uint8Array(t), i = new Uint8Array(n - e), s = e, c = 0; s < n; s++, 
            c++) i[c] = r[s];
            return i.buffer;
        };
    }, function(t) {
        function e() {}
        t.exports = function(t, n, o) {
            function r(t, e) {
                if (r.count <= 0) throw new Error("after called too many times");
                --r.count, t ? (i = !0, n(t), n = o) : 0 !== r.count || i || n(null, e);
            }
            var i = !1;
            return o = o || e, r.count = t, 0 === t ? n() : r;
        };
    }, function(t) {
        t.exports = function(t, e) {
            var n = function() {};
            n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
        };
    }, function(t) {
        t.exports = function(t, e) {
            for (var n = [], o = (e = e || 0) || 0; o < t.length; o++) n[o - e] = t[o];
            return n;
        };
    }, function(t) {
        function e(t) {
            t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, 
            this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
        }
        t.exports = e, e.prototype.duration = function() {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random(), n = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
            }
            return 0 | Math.min(t, this.max);
        }, e.prototype.reset = function() {
            this.attempts = 0;
        }, e.prototype.setMin = function(t) {
            this.ms = t;
        }, e.prototype.setMax = function(t) {
            this.max = t;
        }, e.prototype.setJitter = function(t) {
            this.jitter = t;
        };
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        }, u = function() {
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
        }(), f = r(o(0)), l = r(o(34)), h = o(1), p = {
            forceNew: !0,
            reconnection: !1,
            autoConnect: !0
        }, d = function(t) {
            function e(t, n) {
                if (i(this, e), !(0, h.isObject)(t) || !(0, h.isFunction)(t.emit)) return s(o);
                var o = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return o.action = function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o.ctx.bizId, e = arguments[1];
                    if ((0, h.isUndefined)(t)) return o.ctx.emit("INIT_SOCKET_FAIL", {
                        code: 300
                    });
                    o.emit("QUERY_ROUTER", t, e);
                }, o.start = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2], !o.running) {
                        if (!t || !t.length) return o.ctx.emit("INIT_SOCKET_FAIL", {
                            code: 301
                        });
                        o.running = !0, o.ret = [], o.routerSource = e, o.retStatus = 0;
                        for (var n = 0; n < t.length; n++) o.connect(t[n]);
                    }
                }, o.waitQueue = [], o.counter = 0, o.retStatus = 0, o.running = !1, o.ctx = t, 
                o.registry(n), o.RouterManager = new l.default(o, {
                    _context: o._context
                }), o.subEvents(), o;
            }
            return c(e, f.default), u(e, [ {
                key: "registry",
                value: function(t) {
                    if ((0, h.isObject)(t)) {
                        var e = t.io, n = t.socketOpts, o = t.parallelMax, r = t._context;
                        this._context = r || this.ctx, this.io = e, this.socketOpts = a(n || {}, p), this.PARALLEL_MAX = parseInt(o) || 2;
                    }
                }
            }, {
                key: "subEvents",
                value: function() {
                    var t = this;
                    this.subs && this.subs.length || (this.subs = [ (0, h.on)(this, "QUERY_ROUTER_SUCC", this.start), (0, 
                    h.on)(this, "QUERY_ROUTER_FAIL", function(e) {
                        t.ctx.emit("INIT_SOCKET_FAIL", e);
                    }), (0, h.on)(this.ctx, "START_CONNECT", this.action), {
                        destroy: this.RouterManager.destroy.bind(this.RouterManager)
                    } ], this.traceSubs = []);
                }
            }, {
                key: "connect",
                value: function(t) {
                    t && t.domain && (this.counter + this.retStatus < this.PARALLEL_MAX ? (++this.counter, 
                    this.exec(t)) : this.waitQueue.push(t));
                }
            }, {
                key: "exec",
                value: function(t) {
                    var e = this, n = a({}, t, {
                        router: t,
                        beginDT: Date.now()
                    }), o = n.socket = this.io(n.domain, this.socketOpts), r = [ (0, h.on)(o, "connect", function() {
                        n.state || (n.duration = Date.now() - n.beginDT, n.state = 1, e.complete(n), e.destroy(r));
                    }), (0, h.on)(o, "connect_error", function() {
                        n.state || (n.state = -1, e.complete(n), e.destroy(r), o.close());
                    }), (0, h.on)(o, "error", function() {
                        n.state || (n.state = -1, e.complete(n), e.destroy(r), o.close());
                    }), (0, h.on)(o, "disconnect", function() {
                        n.state || (n.state = -1, e.complete(n), e.destroy(r));
                    }) ];
                    this.traceSubs.push((0, h.on)(o.io, "PIKE_SIO_TRACE", function(t) {
                        e.ctx.emit("TRACE_EVENT", t);
                    }));
                }
            }, {
                key: "complete",
                value: function(t) {
                    var e = this;
                    t && (this.ret.push(t), 1 === t.state && 0 === this.retStatus ? (this.ctx.emit("INIT_SOCKET_SUCC", t.socket), 
                    this.retStatus = 1, --this.counter, this.ending()) : 1 === t.state ? (t.socket.once("disconnect", function() {
                        --e.counter, setTimeout(function() {
                            e.ending();
                        }, 0);
                    }), t.socket.close()) : (--this.counter, setTimeout(function() {
                        e.ending();
                    }, 0)));
                }
            }, {
                key: "ending",
                value: function() {
                    var t = this;
                    if (this.counter + this.retStatus < this.PARALLEL_MAX && this.flushWaitQueue(), 
                    !(this.counter > 0)) {
                        var e = [];
                        1 === this.retStatus && this.ret.map(function(t) {
                            1 === t.state && t.router && e.push(t.router);
                        }), this.running = !1, this.RouterManager.updateRouterList(this.ctx.bizId, e).then(function() {
                            e.length || 2 === t.routerSource ? e.length || t.ctx.emit("INIT_SOCKET_FAIL", {
                                code: 302
                            }) : t.emit("QUERY_ROUTER", t.ctx.bizId);
                        });
                    }
                }
            }, {
                key: "flushWaitQueue",
                value: function() {
                    this.waitQueue.length && this.connect(this.waitQueue.shift());
                }
            }, {
                key: "destroy",
                value: function(t) {
                    var e = this;
                    if (t) for (var n = t.length - 1; n >= 0; n--) t[n].destroy(), t.pop(); else this.destroy(this.subs), 
                    setTimeout(function() {
                        e.destroy(e.traceSubs);
                    }, 3e3);
                }
            } ]), e;
        }();
        n.default = d, e.exports = n.default;
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
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
        }(), u = r(o(0)), f = r(o(15)), l = o(1), h = function(t) {
            function e(t, n) {
                if (i(this, e), !t || !(0, l.isFunction)(t.emit)) return s(o);
                var o = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return o.queryEntry = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.netType || o._context.deviceInfo.network_desc;
                    o.queryRouterList(t, n).then(function(r) {
                        var i = r.list, s = r.source;
                        o.updateRouterList(t, i, n, void 0, !0);
                        var c = e.cursor, a = i.length;
                        c = Math.abs(c) < a ? c : a, o.ctx.emit("QUERY_ROUTER_SUCC", i.slice(0, c), s);
                    }).catch(function(t) {
                        o.ctx.emit("QUERY_ROUTER_FAIL", t);
                    });
                }, o.updateRouterList = function(t, e) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o._context.deviceInfo.network_desc, r = arguments[3], i = arguments[4];
                    if ((0, l.isUndefined)(t) || !(0, l.isArray)(e)) throw Error({
                        code: 104
                    });
                    return o.routerList[t] || (o.routerList[t] = {}), o.routerList[t][n] = e, i || o._context.StorageService.update(t, "LOADBALANCE" + (n ? "_" + n : ""), e, r, void 0, !0);
                }, o.ctx = t, o.registry(n), o.subEvents(), o;
            }
            return c(e, u.default), a(e, [ {
                key: "registry",
                value: function(t) {
                    (0, l.isObject)(t) && (this._context = t._context);
                }
            }, {
                key: "subEvents",
                value: function() {
                    this.subs && this.subs.length || (this.subs = [ (0, l.on)(this.ctx, "QUERY_ROUTER", this.queryEntry) ]);
                }
            }, {
                key: "queryRouterList",
                value: function(t, e) {
                    var n = this;
                    return (0, l.isUndefined)(t) ? Promise.reject({
                        code: 100
                    }) : new Promise(function(o, r) {
                        var i = n.routerList[t] && n.routerList[t][e];
                        i && i.length ? o({
                            list: i,
                            source: 0
                        }) : n._context.StorageService.query(t, "LOADBALANCE" + (e ? "_" + e : ""), !0).then(function(i) {
                            i && i.length ? o({
                                list: n.secureProtocolHandler(i),
                                source: 1
                            }) : n.fetch(t, e).then(function(t) {
                                o({
                                    list: n.secureProtocolHandler(t),
                                    source: 2
                                });
                            }).catch(function(t) {
                                r(t);
                            });
                        }).catch(function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            r({
                                code: t.code || 405
                            });
                        });
                    });
                }
            }, {
                key: "fetch",
                value: function(t, e) {
                    var n = this, o = this._context, r = o.deviceInfo, i = o.SDK_VERSION, s = o.HttpReqwest, c = o.StorageService, a = o.token, u = o.options;
                    return new Promise(function(o, l) {
                        Promise.resolve(a || c.query(t, "TOKEN", !0)).then(function(c) {
                            c && (n._context.token = c), s({
                                url: f.default.query("loadBalance"),
                                data: {
                                    businessId: t,
                                    token: c,
                                    network: e || r.network || "",
                                    platform: r.platform || "",
                                    sdkVersion: i,
                                    isOfficeNetwork: !!u.isOfficeNetwork
                                },
                                success: function(t) {
                                    var e = t.data;
                                    200 !== t.statusCode ? l({
                                        code: 110
                                    }) : o(e);
                                },
                                fail: function() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    l({
                                        code: t.code || 103
                                    });
                                }
                            });
                        }).catch(function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            l({
                                code: t.code || 103
                            });
                        });
                    });
                }
            }, {
                key: "secureProtocolHandler",
                value: function(t, e) {
                    try {
                        return e = e || (location ? location.protocol : "https:"), t.map(function(t) {
                            var n = (0, l.formatUrl)(t.domain);
                            return (0, l.isSecure)(n.protocol) !== (0, l.isSecure)(e) && (t.domain = n.url.replace(n.protocol, e)), 
                            t;
                        });
                    } catch (t) {}
                    return t;
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.subs;
                    if (t) for (var e = t.length - 1; e >= 0; e--) t[e].destroy(), t.pop();
                }
            }, {
                key: "routerList",
                get: function() {
                    return this._routerList || (this._routerList = {});
                },
                set: function(t) {
                    (0, l.isObject)(t) && (this._routerList = t);
                }
            } ]), e;
        }();
        n.default = h, e.exports = n.default;
    }, function(t, e, n) {
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
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
        }(), i = n(36), s = n(1), c = function() {
            function t() {
                var e = this;
                o(this, t), this.onclose = function(t) {
                    e.emit("SOCKET_EVENT", "Socket Disturbed: " + t + ", " + e._context.deviceInfo.network_desc), 
                    e.disconnected = !0, e.connected = !1, !e.socket.io.reconnection() || e.socket.io.skipReconnect || null === e.socket.subs ? e.destroy() : (e.reconnecting = !0, 
                    e.reconnectDT = Date.now());
                }, this.onerror = function(t) {
                    e.emit("error", t), e.emit("SOCKET_EVENT", "" + t, 2);
                }, this.destroy = function(t) {
                    e.reconnecting && e._context.emit("REPORT_ACTION", "Pike Transport Reconnected", 0, {
                        metric: {
                            tags: {
                                network: e._context.deviceInfo.network_desc,
                                attempt: e._context.options.reconnectionAttempts,
                                bizId: e.bizId,
                                status: 500
                            },
                            duration: Date.now() - e.reconnectDT
                        }
                    }), e.reconnecting = !1, e.connected = !1, e.disconnected = !0, e.clearBuffer(), 
                    e.cleanup(), delete e.pikeId, t || (e.emit("close", "Socket Disconnect"), e.emit("SOCKET_EVENT", "Socket Disconnect", 1));
                }, this.sendBuffer = [], this.socketSendBuffer = [], this.disconnected = !0, this.connected = !1, 
                this.reconnecting = !1, this.pikeId = "" + this.bizId + Math.ceil(1e3 * Math.random());
            }
            return r(t, [ {
                key: "registry",
                value: function() {
                    this.socket && (this.subSystemEvents(), this.subSocketEvents(), this.onopen());
                }
            }, {
                key: "close",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Client disconnect";
                    if (!this.pikeId) return this.emit("close", t);
                    this.clearBuffer(), this.cleanup(), delete this.pikeId, this.disconnected && !this.reconnecting || (this.socket.close(), 
                    this.emit("CLIENT_ACTION", "Client Close Pike")), this.reconnecting = !1, this.connected = !1, 
                    this.disconnected = !0, this.emit("close", t);
                }
            }, {
                key: "disconnect",
                value: function() {
                    this.close("Connect disconnect");
                }
            }, {
                key: "reconnect",
                value: function() {
                    this.reconnecting || this.disconnected || (this.emit("CLIENT_ACTION", "Client Reconnecting"), 
                    this.cleanupSubs("socketSubs"), this.socket.close(), this.reconnecting = !0, this.disconnected = !0, 
                    this.connected = !1, this.reconnectDT = Date.now(), this.emit("BOOTS_CONNECT", this.bizId, void 0, {
                        mode: 1,
                        cursor: 1
                    }));
                }
            }, {
                key: "doSend",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    if (this.pikeId) {
                        if (this.disconnected) return this.socketSendBuffer.push([ t, e ]);
                        this.emit("INJECT_BASE_INFO", t), this.socket.emit(i.SDK_CONNECT_EVENT, {
                            v: i.CONNECT_PROTOCOL_VERSION,
                            c: e,
                            d: (0, s.encoder)(t)
                        });
                    }
                }
            }, {
                key: "subSocketEvents",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.socket;
                    this.socketSubs || (this.socketSubs = [ (0, s.on)(t, "disconnect", this.onclose), (0, 
                    s.on)(t, "reconnect", this.onopen), (0, s.on)(t, "reconnect_failed", this.destroy), (0, 
                    s.on)(t, "error", this.onerror), (0, s.on)(t, i.SDK_CONNECT_EVENT, this.onmessage) ]);
                }
            }, {
                key: "subSystemEvents",
                value: function() {}
            }, {
                key: "subProtocolEvents",
                value: function() {}
            }, {
                key: "onopen",
                value: function() {}
            }, {
                key: "onmessage",
                value: function() {}
            }, {
                key: "cleanup",
                value: function() {
                    for (var t = [ "systemSubs", "socketSubs", "protocolSubs" ], e = 0; e < t.length; e++) this.cleanupSubs(t[e]);
                }
            }, {
                key: "cleanupSubs",
                value: function(t) {
                    var e = this["" + t];
                    if (e) {
                        for (var n = 0; n < e.length; n++) e[n].destroy();
                        this["" + t] = null;
                    }
                }
            }, {
                key: "flushSendBuffer",
                value: function() {
                    for (;this.sendBuffer.length; ) this.send.apply(this, this.sendBuffer.shift());
                }
            }, {
                key: "flushSocketBuffer",
                value: function() {
                    for (;this.socketSendBuffer.length; ) this.doSend.apply(this, this.socketSendBuffer.shift());
                }
            }, {
                key: "clearBuffer",
                value: function() {
                    this.clearSendBuffer(), this.socketSendBuffer = [];
                }
            }, {
                key: "clearSendBuffer",
                value: function() {
                    for (;this.sendBuffer.length; ) {
                        var t = this.sendBuffer.shift().fail;
                        (0, s.isFunction)(t) && t({
                            code: 402
                        });
                    }
                }
            } ]), t;
        }();
        e.default = c, t.exports = e.default;
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            CONNECT_PROTOCOL_VERSION: 1,
            SDK_CONNECT_EVENT: "pike"
        }, t.exports = e.default;
    }, function(e, n, o) {
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function i(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function s(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = function() {
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
        }(), a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(o(38)), u = function(t) {
            function e() {
                return r(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, {
                    keys: [ "DEVICEID" ]
                }));
            }
            return s(e, a.default), c(e, [ {
                key: "isSupportStorage",
                value: function() {
                    return !0;
                }
            }, {
                key: "queryAsync",
                value: function(t) {
                    return new Promise(function(e, n) {
                        wx.getStorage({
                            key: t,
                            success: function(t) {
                                t || n(), e(t.data);
                            },
                            fail: function() {
                                n();
                            }
                        });
                    });
                }
            }, {
                key: "updateAsync",
                value: function(t, e) {
                    return new Promise(function(n, o) {
                        wx.setStorage({
                            key: t,
                            data: e,
                            success: function() {
                                n();
                            },
                            fail: function() {
                                o();
                            }
                        });
                    });
                }
            }, {
                key: "querySync",
                value: function(t) {
                    return wx.getStorageSync(t);
                }
            }, {
                key: "updateSync",
                value: function(t, e) {
                    wx.setStorageSync(t, e);
                }
            } ]), e;
        }();
        n.default = new u(), e.exports = n.default;
    }, function(t, e, n) {
        function o(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return Array.from(t);
        }
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        }, s = function() {
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
        }(), c = n(1), a = [ "TOKEN", "PROXY", /^LOADBALANCE/, "CONFIG" ], u = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                r(this, t), this.prefix = e.prefix || "$PIKE_", this.expireDelay = e.duration || 864e5, 
                this.env = e.env, this.keys = [].concat(a, o((0, c.isArray)(e.keys) ? e.keys : [])), 
                this.expireValid = e.expireValid || /token|proxy/i;
            }
            return s(t, [ {
                key: "isSupportStorage",
                value: function() {
                    return !0;
                }
            }, {
                key: "queryAsync",
                value: function() {}
            }, {
                key: "updateAsync",
                value: function() {}
            }, {
                key: "querySync",
                value: function() {}
            }, {
                key: "updateSync",
                value: function() {}
            }, {
                key: "query",
                value: function(t) {
                    var e = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "TOKEN", o = arguments[2];
                    if (this.isSupportStorage() && t) {
                        var r = void 0;
                        if (!(0, c.isUndefined)(r = this.parseKey(n))) return o ? this.queryAsync(r).catch(function() {
                            return {};
                        }).then(function(r) {
                            return e.afterQuery(n, r, t, o);
                        }) : this.afterQuery(n, this.querySync(r), t, o);
                    }
                }
            }, {
                key: "update",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "TOKEN", n = arguments[2], o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, r = this, i = arguments[4], s = arguments[5];
                    if (this.isSupportStorage() && t && !(0, c.isUndefined)(n) && !(0, c.isUndefined)(e = this.parseKey(e))) return s ? Promise.resolve(i || this.queryAsync(e)).catch(function() {
                        return {};
                    }).then(function(i) {
                        return r.updateAsync(e, r.beforeUpdate(t, i, n, o));
                    }) : void this.updateSync(e, this.beforeUpdate(t, i || this.querySync(e), n, o));
                }
            }, {
                key: "afterQuery",
                value: function(t, e, n, o) {
                    var r = this.parseValue(t, e && e[n]);
                    if (!1 !== r) return r;
                    this.update(n, t, "", {
                        mode: 1
                    }, e, o);
                }
            }, {
                key: "beforeUpdate",
                value: function(t, e, n, o) {
                    return (0, c.isObject)(e) || (e = {}), (0, c.isObject)(o) || (o = {}), 1 === o.mode ? delete e[t] : e[t] = {
                        value: n,
                        expired: Date.now() + (parseInt(o.expireDelay || this.expireDelay) || 0),
                        extra: i(e[t] && e[t].extra || {}, {
                            env: this.env
                        }, o)
                    }, e;
                }
            }, {
                key: "parseKey",
                value: function(t) {
                    if (t) {
                        if (0 === t.indexOf(this.prefix)) return t;
                        t = t.toUpperCase();
                        for (var e, n = 0; n < this.keys.length; n++) if (e = this.keys[n], (0, c.isRegexp)(e) ? e.test(t) : e === t) return "" + this.prefix + t;
                    }
                }
            }, {
                key: "parseValue",
                value: function(t, e) {
                    if ((0, c.isObject)(e)) {
                        var n = e.value, o = e.expired, r = e.extra, i = void 0 === r ? {} : r;
                        if (!this.env || i.env === this.env) return !(this.expireValid.test(t) && Date.now() > o) && n;
                    }
                }
            }, {
                key: "env",
                set: function(t) {
                    (0, c.isUndefined)(t) || (this._env = t);
                },
                get: function() {
                    return this._env;
                }
            } ]), t;
        }();
        e.default = u, t.exports = e.default;
    }, function(e, n, o) {
        (function(r) {
            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function s(e, n) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
            }
            function c(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
                e.prototype = Object.create(n && n.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = function() {
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
            }(), u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(o(40)), f = function(t) {
                function e(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return i(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                }
                return c(e, u.default), a(e, [ {
                    key: "getLogan",
                    value: function() {
                        return this._context.options.Logan || r.Logan;
                    }
                }, {
                    key: "getOwl",
                    value: function() {
                        return this._context.options.Owl || r.Owl;
                    }
                }, {
                    key: "getMetricManager",
                    value: function() {
                        return this.Owl.newMetric();
                    }
                } ]), e;
            }();
            n.default = f, e.exports = n.default;
        }).call(n, o(2));
    }, function(e, n, o) {
        (function(r) {
            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function s(e, n) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
            }
            function c(e, n) {
                if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
                e.prototype = Object.create(n && n.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var a = function() {
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
            }(), u = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }(o(0)), f = o(1), l = [ "dev", "test" ], h = [ "info", "warn", "error" ], p = .1, d = function(t) {
                function e(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    i(this, e);
                    var o = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                    return o.cat = function(t, e) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (!(0, f.isUndefined)(t)) {
                            if (!o.Owl) return o.owlCache.length > 1e3 || o.owlCache.push([ t, e, n ]);
                            try {
                                if (2 === e) o.Owl.addError(t, n.content); else if (n.metric) {
                                    if (Math.random() > (o.isDebug ? 1 : p)) return;
                                    var r = o.getMetricManager(), i = n.metric, s = i.tags, c = i.metric, a = void 0 === c ? t : c, u = i.duration, l = void 0 === u ? 0 : u;
                                    r.setTags(s), r.setMetric(a, l), r.report();
                                } else o.Owl.addApi({
                                    name: t,
                                    statusCode: n.code || 200,
                                    responseTime: Date.now() - n.startDT || 0,
                                    connectType: "pike长连"
                                });
                            } catch (t) {}
                        }
                    }, o.doReport = function() {
                        try {
                            o.Logan.report(null, null, {
                                unionId: "pike|" + o._context.deviceId,
                                environment: o._context.deviceInfo || "",
                                uploadSource: "pike",
                                webSource: o._context.deviceInfo.channel || "browser"
                            });
                        } catch (t) {
                            o.cat("Logan Custom Report Err", 2, {
                                content: JSON.stringify(t)
                            });
                        }
                    }, o.logCache = [], o.owlCache = [], o.ctx = t, o.registry(n), o.subEvents(), o.initSDK(), 
                    o;
                }
                return c(e, u.default), a(e, [ {
                    key: "registry",
                    value: function(t) {
                        if ((0, f.isObject)(t)) {
                            var e = t._context, n = t.mode;
                            this._context = e || this.ctx, this.mode = n;
                        }
                    }
                }, {
                    key: "subEvents",
                    value: function() {
                        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._context;
                        this.subs || (this.subs = [ (0, f.on)(e, "CONNECT_EVENT", function(e, n) {
                            t.log("connect", e, n);
                        }), (0, f.on)(e, "CLIENT_ACTION", function(e, n) {
                            t.log("client", e, n);
                        }), (0, f.on)(e, "SOCKET_EVENT", function(e, n) {
                            t.log("socket", e, n);
                        }), (0, f.on)(e, "CONNECT_PROTOCOL", function(e, n) {
                            t.log("protocol", e, n);
                        }), (0, f.on)(e, "SERVER_EVENT", function(e, n) {
                            t.log("server", e, n);
                        }), (0, f.on)(e, "TRACE_EVENT", function(e, n) {
                            t.log("trace", e, n);
                        }), (0, f.on)(e, "REPORT_ACTION", this.cat), (0, f.on)(e, "FETCH_LOG", this.doReport) ]);
                    }
                }, {
                    key: "initSDK",
                    value: function() {
                        var t = this;
                        if (this.isDebug ? (this.Logan = this._resetLogan(), this.flushQueue("log")) : Promise.resolve(this.getLogan()).then(function(e) {
                            t.Logan = e, t.flushQueue("log");
                        }).catch(function() {
                            t.Logan = t._resetLogan(!0);
                        }), "dev" === this.mode) return this.Owl = this._resetOwl(), void this.flushQueue("owl");
                        Promise.resolve(this.getOwl()).then(function(e) {
                            t.Owl = new e.OWL({
                                project: "pike-sdk",
                                pageUrl: (t.isDebug ? "test_" : "") + "default",
                                resource: {
                                    sampleApi: t.isDebug ? 1 : p,
                                    sample: t.isDebug ? 1 : .1
                                }
                            }), t.Owl.addApi || (t.Owl.addApi = t.Owl.resource.addApi.bind(t.Owl.resource)), 
                            t.Owl.addError || (t.Owl.addError = t.Owl.error.addError.bind(t.Owl.resource)), 
                            t.flushQueue("owl");
                        }).catch(function() {
                            t.Owl = t._resetOwl(!0);
                        });
                    }
                }, {
                    key: "flushQueue",
                    value: function(t) {
                        if (~[ "log", "owl" ].indexOf(t)) for (var e = this[t + "Cache"], n = 0; n < e.length; n++) this[t].apply(this, e.shift());
                    }
                }, {
                    key: "wrap",
                    value: function(t) {
                        var e = t.type, n = t.level, o = t.msg;
                        return JSON.stringify({
                            type: e,
                            level: h[n],
                            msg: o
                        });
                    }
                }, {
                    key: "log",
                    value: function(t, e) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                        if (!(0, f.isUndefined)(e)) {
                            if (!this.Logan) return this.logCache.length > 1e3 || this.logCache.push([ t, e, n ]);
                            try {
                                this.Logan.log(this.wrap({
                                    msg: e,
                                    type: t,
                                    level: n
                                })), n && this.cat(e, n);
                            } catch (t) {}
                        }
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        if (this.subs) {
                            for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                            this.subs = null;
                        }
                    }
                }, {
                    key: "noop",
                    value: function() {}
                }, {
                    key: "_resetLogan",
                    value: function(t) {
                        return t && (this.logCache = []), {
                            log: console ? console.log : this.noop,
                            report: this.noop
                        };
                    }
                }, {
                    key: "_resetOwl",
                    value: function(t) {
                        var e = void 0, n = void 0;
                        return console ? (e = console.warn, n = console.log) : e = n = this.noop, t && (this.owlCache = []), 
                        {
                            addError: e,
                            addApi: n
                        };
                    }
                }, {
                    key: "getLogan",
                    value: function() {
                        return Promise.resolve(r.Logan);
                    }
                }, {
                    key: "getOwl",
                    value: function() {
                        return Promise.resolve(r.Owl);
                    }
                }, {
                    key: "getMetricManager",
                    value: function() {
                        return new this.Owl.MetricManager();
                    }
                }, {
                    key: "mode",
                    set: function(t) {
                        this._mode = t, this.isDebug = ~l.indexOf(t);
                    },
                    get: function() {
                        return this._mode;
                    }
                }, {
                    key: "isDebug",
                    set: function(t) {
                        this._isDebug = !!t;
                    },
                    get: function() {
                        return this._isDebug;
                    }
                } ]), e;
            }();
            n.default = d, e.exports = n.default;
        }).call(n, o(2));
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            SDK_CONNECT_PROTOCOL: {
                1: {
                    1: "send_message",
                    2: "receive_message",
                    3: "update_loadbalance",
                    4: "disconnect",
                    5: "reconnect",
                    6: "report_log",
                    7: "log_ack",
                    101: "proxy_request",
                    102: "proxy_ack",
                    103: "proxy_response"
                }
            },
            SDK_SERVER_PROTOCOL: {
                1: "apply_token",
                2: "on_token",
                3: "apply_login",
                4: "on_login",
                5: "send_message",
                6: "on_ack",
                7: "on_message",
                8: "send_ack"
            }
        }, t.exports = e.default;
    }, , function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
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
        }(), u = r(o(18)), f = r(o(44)), l = function(t) {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return i(this, e), s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
            }
            return c(e, u.default), a(e, [ {
                key: "getBizModeConstructor",
                value: function() {
                    return f.default.prototype.__proto__.__proto__ = this, f.default;
                }
            } ]), e;
        }();
        n.default = l, e.exports = n.default;
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
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
        }(), u = o(41), f = o(5), l = r(o(45)), h = r(o(46)), p = o(3), d = function(t) {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i(this, e);
                var n = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return n.onopen = function(t) {
                    n.disconnected = !1, n.connected = !0, n.reconnecting ? t && n._context.emit("REPORT_ACTION", "Pike Transport Reconnected", 0, {
                        metric: {
                            tags: {
                                network: n._context.deviceInfo.network_desc,
                                attempt: t,
                                bizId: n.bizId,
                                status: 200
                            },
                            duration: Date.now() - n.reconnectDT
                        }
                    }) : (n.subProtocolEvents(), n.emit("connect")), n.reconnecting = !1, n.flushSocketBuffer(), 
                    n.flushSendBuffer();
                }, n.onmessage = function(t) {
                    if (t) {
                        var e = t.v, o = t.c, r = t.d;
                        try {
                            switch (r = (0, p.decoder)(r), u.SDK_CONNECT_PROTOCOL[e][o]) {
                              case "update_loadbalance":
                                n.emit("CONNECT_PROTOCOL", "Protocol: Loadbalance"), n.emit("BOOTS_CONNECT", n.bizId, void 0, {
                                    mode: 2
                                });
                                break;

                              case "disconnect":
                                n.emit("CONNECT_PROTOCOL", "Protocol: Disconnect"), n.disconnect();
                                break;

                              case "reconnect":
                                n.emit("CONNECT_PROTOCOL", "Protocol: Reconnect"), n.reconnect();
                                break;

                              case "proxy_ack":
                                n.SendManager.emit("PROXY_ACK_SUCC", r);
                                break;

                              case "proxy_response":
                                n.SendManager.emit("PROXY_RES_SUCC", r);
                                break;

                              default:
                                n.emit("CONNECT_PROTOCOL", "Protocol: Unkown", 1);
                            }
                        } catch (t) {
                            n.emit("CONNECT_PROTOCOL", "Connect " + u.SDK_CONNECT_PROTOCOL[e][o] + " Handler Exception", 2);
                        }
                    }
                }, n.SendManager = new l.default(n), n.Filter = new h.default(n, t), n.registryHttpPlugin(t.httpReqwest), 
                n;
            }
            return c(e, f.Core), a(e, [ {
                key: "registryHttpPlugin",
                value: function(t) {
                    this.httpReqwest = (0, p.isFunction)(t) ? t : wx ? wx.request : function() {};
                }
            }, {
                key: "send",
                value: function(t) {
                    this.pikeId && !this.disconnected && this.Filter.check(t) ? this.SendManager.sendMessage({
                        data: t,
                        retryInfo: t.retryInfo
                    }) : this.httpReqwest(t);
                }
            }, {
                key: "subSystemEvents",
                value: function() {
                    this.systemSubs || (this.systemSubs = [ {
                        destroy: this.SendManager.destroy
                    }, {
                        destroy: this.Filter.destroy
                    } ]);
                }
            }, {
                key: "subProtocolEvents",
                value: function() {
                    var t = this;
                    this.protocolSubs || (this.protocolSubs = [ (0, p.on)(this, "INJECT_BASE_INFO", function(e) {
                        (0, p.isObject)(e) && (e.appName = t._context.deviceInfo.channel, e.platform = t._context.deviceInfo.platform, 
                        e.network = t._context.deviceInfo.network, e.sdkVersion = t._context.SDK_VERSION, 
                        e.signature = "", e.random = Date.now());
                    }) ]);
                }
            } ]), e;
        }();
        n.default = d, e.exports = n.default;
    }, function(e, n, o) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, n) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
        }
        function c(e, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
            e.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, u = function() {
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
        }(), f = r(o(0)), l = o(3), h = r(o(17)), p = function(t) {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                i(this, e);
                var o = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return o.ackHandler = function(t) {
                    var e = o.findTask(t);
                    if (e && !e.state) {
                        var n = t.status;
                        switch (++o.seqId, n) {
                          case -1:
                            o._context.emit("REPORT_ACTION", "Pike Proxy Server Unavailable", 2), o._context.close();
                            break;

                          case -2:
                            o.proxyErr({
                                task: e
                            });
                            try {
                                var r = e.data, i = r.url, s = r.data, c = r.method, a = r.headers;
                                o._context.emit("REPORT_ACTION", "Pike Proxy Request Downgrade", 2, {
                                    content: "url/method/headers/data: " + i + ", " + c + ", " + a + ", " + s
                                });
                            } catch (t) {}
                            break;

                          case 0:
                            e.status = n;
                            break;

                          default:
                            e.status = n, o._context.emit("REPORT_ACTION", "Pike Proxy Unkown Ack Status " + n, 2);
                        }
                    }
                }, o.resHandler = function(t) {
                    var e = o.findTask(t, !0);
                    e && !e.state && ((0, l.isUndefined)(e.status) && (e.status = 0), o.emit(o.eventPrefix + "SUCC", {
                        task: e,
                        rawData: t
                    }));
                }, o.proxySucc = function(t) {
                    var e = t.task, n = t.rawData;
                    e && !e.state && ((0, l.isFunction)(e.succ) && e.succ(n, e), e.dispose(), e.state = 1, 
                    o._context.emit("REPORT_ACTION", "Pike Proxy E2E", 0, {
                        startDT: e.startDT
                    }));
                }, o.proxyFail = function(t) {
                    var e = t.task, n = t.rawData;
                    if (e && !e.state && (0, l.isFunction)(e.fail)) {
                        o.findTask(e, !0), e.fail(n, e), e.dispose(), e.state = -1;
                        var r = e.status;
                        o._context.emit("REPORT_ACTION", "Pike Proxy E2E", 0, {
                            startDT: e.startDT,
                            code: (0, l.isUndefined)(r) ? 501 : 0 !== r ? 502 : 500
                        });
                    }
                }, o.proxyErr = function(t) {
                    var e = t.task;
                    e && !e.state && (e = o.findTask(e, !0) || e, e.status = -1, (0, l.isFunction)(e.fail) && e.fail({
                        statusCode: 500
                    }, e), (0, l.isFunction)(e.dispose) && e.dispose(), e.state = -1, o._context.emit("REPORT_ACTION", "Pike Client Abort Task", 0, {
                        code: 400
                    }));
                }, o.destroy = function() {
                    if (o.subs) {
                        for (var t = 0; t < o.subs.length; t++) o.subs[t].destroy();
                        o.subs = null;
                    }
                    for (var e, n, r = o.waitResQueue.length - 1; r >= 0; r--) (n = o.waitResQueue[r]).status || (n.status = -2), 
                    e = n.fail || n.retryInfo.fail, (0, l.isFunction)(e) && e({
                        code: 402
                    }, n), o.waitResQueue.pop();
                    o.counter = 0, o.seqId = 0;
                }, o.waitResQueue = [], o.LIMIT_SEND_MAX = 1e3, o.counter = 0, o.eventPrefix = "PROXY_", 
                o.seqId = 0, o.ctx = t, o.registry(n), o.subs = [ (0, l.on)(o, "PROXY_ACK_SUCC", o.ackHandler), (0, 
                l.on)(o, "PROXY_RES_SUCC", o.resHandler), (0, l.on)(o, o.eventPrefix + "SUCC", o.proxySucc), (0, 
                l.on)(o, o.eventPrefix + "FAIL", o.proxyFail) ], o;
            }
            return c(e, f.default), u(e, [ {
                key: "registry",
                value: function(t) {
                    (0, l.isObject)(t) && (this._context = t._context || this.ctx, this.retryInfo = t.retryInfo);
                }
            }, {
                key: "sendMessage",
                value: function(t) {
                    var e = this;
                    if (t.succ = function(t, e) {
                        var n = t.httpResponse;
                        if (e && e.data) {
                            var o = e.data, r = o.success, i = o.complete, s = o.dataType, c = void 0 === s ? "json" : s, a = void 0, u = {
                                connectType: "pike长连",
                                responseTime: e.startDT ? Date.now() - e.startDT : 0
                            };
                            if ("json" === c) try {
                                n.body = JSON.parse(n.body);
                            } catch (t) {}
                            a = Object.assign({
                                header: n.headers,
                                data: n.body,
                                statusCode: 200
                            }, u), (0, l.isFunction)(r) && r(a), (0, l.isFunction)(i) && i(a);
                        }
                    }, t.fail = function(t, n) {
                        if (n && n.data) {
                            var o = n.startDT || Date.now(), r = n.data, i = r.fail, s = r.complete, c = r.method, a = void 0 === c ? "GET" : c, u = r.allowDowngrade, f = void 0, h = {
                                connectType: "pike长连",
                                responseTime: Date.now() - o
                            };
                            if (0 !== n.status && (-1 === n.status || "GET" === a || u)) {
                                var p = n.data, d = p.success, y = p.fail;
                                return h.connectType = "pike短连", (0, l.isFunction)(d) && (n.data.success = function(t) {
                                    h.responseTime = Date.now() - o, d(Object.assign(t, h));
                                }), (0, l.isFunction)(y) && (n.data.fail = function(t) {
                                    h.responseTime = Date.now() - o, y(Object.assign(t, h));
                                }), e._context.httpReqwest(n.data, h);
                            }
                            f = Object.assign({
                                statusCode: 500
                            }, h), (0, l.isFunction)(i) && i(f), (0, l.isFunction)(s) && s(f);
                        }
                    }, this.counter >= this.LIMIT_SEND_MAX) return this.proxyErr({
                        task: t
                    });
                    t instanceof d || (this.retryInfo && (t.retryInfo = Object.assign({}, this.retryInfo, (0, 
                    l.isObject)(t.retryInfo) ? t.retryInfo : {})), t = new d(t)), this.waitResQueue.push(t), 
                    ++this.counter, this.reqwest(t);
                }
            }, {
                key: "reqwest",
                value: function(t) {
                    var e = this;
                    if (0 === t.state) try {
                        t.startDT = Date.now();
                        var n = t.retryInfo.retryDelay, o = t.data, r = o.url, i = o.method, s = void 0 === i ? "GET" : i, c = o.header, u = o.data;
                        if (setTimeout(function() {
                            e.emit(e.eventPrefix + "FAIL", {
                                task: t,
                                rawData: {
                                    code: 601
                                }
                            }), (0, l.isUndefined)(t.status) && e._context.emit("PROXY_ACK_TIMEOUT", ++e.seqId);
                        }, n || 0), "GET" === s && (0, l.isObject)(u)) {
                            var f = [], h = void 0;
                            for (var p in u) {
                                h = "object" === a(u[p]) ? JSON.stringify(u[p]) : u[p];
                                try {
                                    decodeURIComponent(h);
                                } catch (t) {
                                    h = encodeURIComponent(h);
                                }
                                "string" != typeof h || h === encodeURIComponent(h) || h !== decodeURIComponent(h) ? f.push(p + "=" + h) : f.push(p + "=" + encodeURIComponent(h || ""));
                            }
                            if (f.length) {
                                if (!(r = r.match(/([a-z0-9._\-~:\/]*)(?:\?([^#]*))?/i))) return;
                                r = r[1] + "?" + (r[2] ? r[2] + "&" : "") + f.join("&");
                            }
                        } else "POST" === s && ((0, l.isObject)(c) || (c = {}), c["Content-Type"] = c["content-type"] || "application/json");
                        this.doSend({
                            requestId: t.requestId,
                            timeout: n,
                            httpRequest: {
                                url: r,
                                method: s,
                                headers: c,
                                body: u
                            }
                        });
                    } catch (e) {
                        this.proxyErr({
                            task: t
                        });
                    }
                }
            }, {
                key: "doSend",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 101;
                    this.ctx.doSend(t, e);
                }
            }, {
                key: "findTask",
                value: function(t, e) {
                    if (t && t.requestId) {
                        for (var n = 0, o = void 0, r = this.waitResQueue, i = t.requestId; n < r.length; n++) if (o = r[n], 
                        i == o.requestId) return e && (r.splice(n, 1), --this.counter), o;
                        n === r.length && console.warn("[Proxy] invalid request(response) " + i);
                    }
                }
            } ]), e;
        }();
        n.default = p;
        var d = function(t) {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i(this, e);
                var n = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return n.requestId = t.requestId || "" + Date.now() + Math.floor(1e3 * Math.random()), 
                n.retryInfo = Object.assign({
                    retryMax: 0,
                    retryDelay: 1e4,
                    retry: 0
                }, t.retryInfo), n;
            }
            return c(e, h.default), e;
        }();
        e.exports = n.default;
    }, function(t, e, n) {
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
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
        }(), i = n(3), s = n(5), c = 6, a = function() {
            function t(e, n) {
                var r = this;
                o(this, t), this.proxyStatus = -1, this.ackCounter = 0, this.curseqId = 0, this._context = e, 
                this.subs = [ (0, i.on)(this._context, "PROXY_ACK_TIMEOUT", function(t) {
                    t && (r.ackCounter && r.curseqId != t - 1 ? r.ackCounter = 0 : (r.curseqId = t, 
                    ++r.ackCounter >= c && (r.proxyStatus = 2, r._context.close(), r._context.emit("REPORT_ACTION", "Ack Timeout Accumulate " + c))));
                }) ], n && n.customFilter ? (this.proxyStatus = 0, this.proxyConfig = {}) : this.getProxyFilter().then(function(t) {
                    t && (2 === t.source && r._context.StorageService.update(r._context.bizId, "proxy", t, void 0, void 0, !0), 
                    r.proxyStatus = 0, r.proxyConfig = Object.assign({}, t, {
                        apiBlackList: (0, i._listRegParse)(t.apiBlackList),
                        apiWhiteList: (0, i._listRegParse)(t.apiWhiteList)
                    }));
                }).catch(function(t) {
                    r._context.emit("REPORT_ACTION", "Fetch Pike Proxy Config Err", 2, {
                        content: JSON.stringify(t)
                    });
                });
            }
            return r(t, [ {
                key: "getProxyFilter",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._context.bizId;
                    if (-1 === this.proxyStatus) {
                        var e = this._context, n = e.StorageService, o = e.HttpReqwest, r = e.SDK_VERSION;
                        return n.query(t, "proxy", !0).then(function(t) {
                            return t ? Object.assign(t, {
                                source: 1
                            }) : Promise.reject();
                        }).catch(function() {
                            return new Promise(function(e, n) {
                                o({
                                    url: s.URLManager.query("proxyConfig"),
                                    data: {
                                        bizId: t,
                                        version: r
                                    },
                                    success: function(t) {
                                        var o = t.data, r = t.statusCode;
                                        if (200 == r && o) {
                                            var i = o.code, s = o.data;
                                            200 === i && s ? e(Object.assign(s, {
                                                source: 2
                                            })) : n("Pike Config Response illegal: " + i);
                                        } else n("Pike Config Request Network Err: " + r);
                                    },
                                    fail: function(t) {
                                        n(t ? t.message || t.errMsg || t : "Pike Config Request Fail");
                                    }
                                });
                            });
                        });
                    }
                }
            }, {
                key: "check",
                value: function(t) {
                    var e = t.url, n = t.method, o = void 0 === n ? "GET" : n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.proxyConfig;
                    if (this.proxyStatus || !e) return !1;
                    try {
                        var s = r.domainWhiteList, c = r.domainBlackList, a = r.apiWhiteList, u = r.apiBlackList, f = r.methods, l = r.defaultRatio, h = void 0 === l ? 1 : l;
                        if (f && !~f.indexOf(o)) return !1;
                        var p = (0, i.formatUrl)(e), d = p.host, y = p.pathname;
                        return !(c && ~c.indexOf(d) || s && !~s.indexOf(d) || u && ~(0, i._indexOf)(u, y) || a && !~(0, 
                        i._indexOf)(a, y) || !(h >= Math.random()));
                    } catch (t) {}
                    return !1;
                }
            }, {
                key: "destroy",
                value: function() {
                    if (this.subs) {
                        for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                        this.subs = null;
                    }
                }
            } ]), t;
        }();
        e.default = a, t.exports = e.default;
    } ]);
});