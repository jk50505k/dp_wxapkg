var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, n) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" === ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports.Logan = n() : e.Logan = n();
}("undefined" != typeof self ? self : void 0, function() {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
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
        }, e.p = "./", e(e.s = 7);
    }([ function(t, e, n) {
        (function(e) {
            var r, o = n(2), i = n(12), a = n(13), u = Array.prototype.slice, c = {};
            r = void 0 !== e && e.console ? e.console : "undefined" != typeof window && window.console ? window.console : {};
            for (var s = [ [ function() {}, "log" ], [ function() {
                r.log.apply(r, arguments);
            }, "info" ], [ function() {
                r.log.apply(r, arguments);
            }, "warn" ], [ function() {
                r.warn.apply(r, arguments);
            }, "error" ], [ function(t) {
                c[t] = a();
            }, "time" ], [ function(t) {
                var e = c[t];
                if (!e) throw new Error("No such label: " + t);
                var n = a() - e;
                r.log(t + ": " + n + "ms");
            }, "timeEnd" ], [ function() {
                var t = new Error();
                t.name = "Trace", t.message = o.format.apply(null, arguments), r.error(t.stack);
            }, "trace" ], [ function(t) {
                r.log(o.inspect(t) + "\n");
            }, "dir" ], [ function(t) {
                if (!t) {
                    var e = u.call(arguments, 1);
                    i.ok(!1, o.format.apply(null, e));
                }
            }, "assert" ] ], f = 0; f < s.length; f++) {
                var l = s[f], d = l[0], p = l[1];
                r[p] || (r[p] = d);
            }
            t.exports = r;
        }).call(e, n(1));
    }, function(e) {
        var n = function() {
            return this;
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this");
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : t(window)) && (n = window);
        }
        e.exports = n;
    }, function(e, n, r) {
        (function(e, o, i) {
            function a(t, e) {
                var r = {
                    seen: [],
                    stylize: c
                };
                return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), 
                v(e) ? r.showHidden = e : e && n._extend(r, e), b(r.showHidden) && (r.showHidden = !1), 
                b(r.depth) && (r.depth = 2), b(r.colors) && (r.colors = !1), b(r.customInspect) && (r.customInspect = !0), 
                r.colors && (r.stylize = u), f(r, t, r.depth);
            }
            function u(t, e) {
                var n = a.styles[e];
                return n ? "[" + a.colors[n][0] + "m" + t + "[" + a.colors[n][1] + "m" : t;
            }
            function c(t) {
                return t;
            }
            function s(t) {
                var e = {};
                return t.forEach(function(t) {
                    e[t] = !0;
                }), e;
            }
            function f(t, e, r) {
                if (t.customInspect && e && T(e.inspect) && e.inspect !== n.inspect && (!e.constructor || e.constructor.prototype !== e)) {
                    var o = e.inspect(r, t);
                    return S(o) || (o = f(t, o, r)), o;
                }
                var i = l(t, e);
                if (i) return i;
                var a = Object.keys(e), u = s(a);
                if (t.showHidden && (a = Object.getOwnPropertyNames(e)), E(e) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return d(e);
                if (0 === a.length) {
                    if (T(e)) {
                        var c = e.name ? ": " + e.name : "";
                        return t.stylize("[Function" + c + "]", "special");
                    }
                    if (_(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
                    if (O(e)) return t.stylize(Date.prototype.toString.call(e), "date");
                    if (E(e)) return d(e);
                }
                var v = "", m = !1, w = [ "{", "}" ];
                if (y(e) && (m = !0, w = [ "[", "]" ]), T(e) && (v = " [Function" + (e.name ? ": " + e.name : "") + "]"), 
                _(e) && (v = " " + RegExp.prototype.toString.call(e)), O(e) && (v = " " + Date.prototype.toUTCString.call(e)), 
                E(e) && (v = " " + d(e)), 0 === a.length && (!m || 0 == e.length)) return w[0] + v + w[1];
                if (r < 0) return _(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
                t.seen.push(e);
                var b;
                return b = m ? p(t, e, r, u, a) : a.map(function(n) {
                    return g(t, e, r, u, n, m);
                }), t.seen.pop(), h(b, v, w);
            }
            function l(t, e) {
                if (b(e)) return t.stylize("undefined", "undefined");
                if (S(e)) {
                    var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return t.stylize(n, "string");
                }
                return w(e) ? t.stylize("" + e, "number") : v(e) ? t.stylize("" + e, "boolean") : m(e) ? t.stylize("null", "null") : void 0;
            }
            function d(t) {
                return "[" + Error.prototype.toString.call(t) + "]";
            }
            function p(t, e, n, r, o) {
                for (var i = [], a = 0, u = e.length; a < u; ++a) D(e, String(a)) ? i.push(g(t, e, n, r, String(a), !0)) : i.push("");
                return o.forEach(function(o) {
                    o.match(/^\d+$/) || i.push(g(t, e, n, r, o, !0));
                }), i;
            }
            function g(t, e, n, r, o, i) {
                var a, u, c;
                if ((c = Object.getOwnPropertyDescriptor(e, o) || {
                    value: e[o]
                }).get ? u = c.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : c.set && (u = t.stylize("[Setter]", "special")), 
                D(r, o) || (a = "[" + o + "]"), u || (t.seen.indexOf(c.value) < 0 ? (u = m(n) ? f(t, c.value, null) : f(t, c.value, n - 1)).indexOf("\n") > -1 && (u = i ? u.split("\n").map(function(t) {
                    return "  " + t;
                }).join("\n").substr(2) : "\n" + u.split("\n").map(function(t) {
                    return "   " + t;
                }).join("\n")) : u = t.stylize("[Circular]", "special")), b(a)) {
                    if (i && o.match(/^\d+$/)) return u;
                    (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), 
                    a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), 
                    a = t.stylize(a, "string"));
                }
                return a + ": " + u;
            }
            function h(t, e, n) {
                var r = 0;
                return t.reduce(function(t, e) {
                    return r++, e.indexOf("\n") >= 0 && r++, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1;
                }, 0) > 60 ? n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1] : n[0] + e + " " + t.join(", ") + " " + n[1];
            }
            function y(t) {
                return Array.isArray(t);
            }
            function v(t) {
                return "boolean" == typeof t;
            }
            function m(t) {
                return null === t;
            }
            function w(t) {
                return "number" == typeof t;
            }
            function S(t) {
                return "string" == typeof t;
            }
            function b(t) {
                return void 0 === t;
            }
            function _(t) {
                return x(t) && "[object RegExp]" === R(t);
            }
            function x(e) {
                return "object" === (void 0 === e ? "undefined" : t(e)) && null !== e;
            }
            function O(t) {
                return x(t) && "[object Date]" === R(t);
            }
            function E(t) {
                return x(t) && ("[object Error]" === R(t) || t instanceof Error);
            }
            function T(t) {
                return "function" == typeof t;
            }
            function R(t) {
                return Object.prototype.toString.call(t);
            }
            function A(t) {
                return t < 10 ? "0" + t.toString(10) : t.toString(10);
            }
            function k() {
                var t = new Date(), e = [ A(t.getHours()), A(t.getMinutes()), A(t.getSeconds()) ].join(":");
                return [ t.getDate(), B[t.getMonth()], e ].join(" ");
            }
            function D(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }
            var j = /%[sdj%]/g;
            n.format = function(t) {
                if (!S(t)) {
                    for (var e = [], n = 0; n < arguments.length; n++) e.push(a(arguments[n]));
                    return e.join(" ");
                }
                for (var n = 1, r = arguments, o = r.length, i = String(t).replace(j, function(t) {
                    if ("%%" === t) return "%";
                    if (n >= o) return t;
                    switch (t) {
                      case "%s":
                        return String(r[n++]);

                      case "%d":
                        return Number(r[n++]);

                      case "%j":
                        try {
                            return JSON.stringify(r[n++]);
                        } catch (t) {
                            return "[Circular]";
                        }

                      default:
                        return t;
                    }
                }), u = r[n]; n < o; u = r[++n]) m(u) || !x(u) ? i += " " + u : i += " " + a(u);
                return i;
            }, n.deprecate = function(t, r) {
                if (b(e.process)) return function() {
                    return n.deprecate(t, r).apply(this, arguments);
                };
                if (!0 === o.noDeprecation) return t;
                var a = !1;
                return function() {
                    if (!a) {
                        if (o.throwDeprecation) throw new Error(r);
                        o.traceDeprecation ? i.trace(r) : i.error(r), a = !0;
                    }
                    return t.apply(this, arguments);
                };
            };
            var M, z = {};
            n.debuglog = function(t) {
                if (b(M) && (M = o.env.NODE_DEBUG || ""), t = t.toUpperCase(), !z[t]) if (new RegExp("\\b" + t + "\\b", "i").test(M)) {
                    var e = o.pid;
                    z[t] = function() {
                        var r = n.format.apply(n, arguments);
                        i.error("%s %d: %s", t, e, r);
                    };
                } else z[t] = function() {};
                return z[t];
            }, n.inspect = a, a.colors = {
                bold: [ 1, 22 ],
                italic: [ 3, 23 ],
                underline: [ 4, 24 ],
                inverse: [ 7, 27 ],
                white: [ 37, 39 ],
                grey: [ 90, 39 ],
                black: [ 30, 39 ],
                blue: [ 34, 39 ],
                cyan: [ 36, 39 ],
                green: [ 32, 39 ],
                magenta: [ 35, 39 ],
                red: [ 31, 39 ],
                yellow: [ 33, 39 ]
            }, a.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, n.isArray = y, n.isBoolean = v, n.isNull = m, n.isNullOrUndefined = function(t) {
                return null == t;
            }, n.isNumber = w, n.isString = S, n.isSymbol = function(e) {
                return "symbol" === (void 0 === e ? "undefined" : t(e));
            }, n.isUndefined = b, n.isRegExp = _, n.isObject = x, n.isDate = O, n.isError = E, 
            n.isFunction = T, n.isPrimitive = function(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" === (void 0 === e ? "undefined" : t(e)) || void 0 === e;
            }, n.isBuffer = r(10);
            var B = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            n.log = function() {
                i.log("%s - %s", k(), n.format.apply(n, arguments));
            }, n.inherits = r(11), n._extend = function(t, e) {
                if (!e || !x(e)) return t;
                for (var n = Object.keys(e), r = n.length; r--; ) t[n[r]] = e[n[r]];
                return t;
            };
        }).call(n, r(1), r(9), r(0));
    }, function(t, e) {
        !function(n, r) {
            t.exports = e = r();
        }(0, function() {
            var t = t || function(t, e) {
                var n = Object.create || function() {
                    function t() {}
                    return function(e) {
                        var n;
                        return t.prototype = e, n = new t(), t.prototype = null, n;
                    };
                }(), r = {}, o = r.lib = {}, i = o.Base = {
                    extend: function(t) {
                        var e = n(this);
                        return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
                            e.$super.init.apply(this, arguments);
                        }), e.init.prototype = e, e.$super = this, e;
                    },
                    create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments), t;
                    },
                    init: function() {},
                    mixIn: function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString);
                    },
                    clone: function() {
                        return this.init.prototype.extend(this);
                    }
                }, a = o.WordArray = i.extend({
                    init: function(t, e) {
                        t = this.words = t || [], this.sigBytes = void 0 != e ? e : 4 * t.length;
                    },
                    toString: function(t) {
                        return (t || c).stringify(this);
                    },
                    concat: function(t) {
                        var e = this.words, n = t.words, r = this.sigBytes, o = t.sigBytes;
                        if (this.clamp(), r % 4) for (a = 0; a < o; a++) {
                            var i = n[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            e[r + a >>> 2] |= i << 24 - (r + a) % 4 * 8;
                        } else for (var a = 0; a < o; a += 4) e[r + a >>> 2] = n[a >>> 2];
                        return this.sigBytes += o, this;
                    },
                    clamp: function() {
                        var e = this.words, n = this.sigBytes;
                        e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4);
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t.words = this.words.slice(0), t;
                    },
                    random: function(e) {
                        for (var n, r = [], o = 0; o < e; o += 4) {
                            var i = function(e) {
                                var e = e, n = 987654321, r = 4294967295;
                                return function() {
                                    var o = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & r) & r;
                                    return o /= 4294967296, (o += .5) * (t.random() > .5 ? 1 : -1);
                                };
                            }(4294967296 * (n || t.random()));
                            n = 987654071 * i(), r.push(4294967296 * i() | 0);
                        }
                        return new a.init(r, e);
                    }
                }), u = r.enc = {}, c = u.Hex = {
                    stringify: function(t) {
                        for (var e = t.words, n = t.sigBytes, r = [], o = 0; o < n; o++) {
                            var i = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16));
                        }
                        return r.join("");
                    },
                    parse: function(t) {
                        for (var e = t.length, n = [], r = 0; r < e; r += 2) n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
                        return new a.init(n, e / 2);
                    }
                }, s = u.Latin1 = {
                    stringify: function(t) {
                        for (var e = t.words, n = t.sigBytes, r = [], o = 0; o < n; o++) {
                            var i = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            r.push(String.fromCharCode(i));
                        }
                        return r.join("");
                    },
                    parse: function(t) {
                        for (var e = t.length, n = [], r = 0; r < e; r++) n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
                        return new a.init(n, e);
                    }
                }, f = u.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(s.stringify(t)));
                        } catch (t) {
                            throw new Error("Malformed UTF-8 data");
                        }
                    },
                    parse: function(t) {
                        return s.parse(unescape(encodeURIComponent(t)));
                    }
                }, l = o.BufferedBlockAlgorithm = i.extend({
                    reset: function() {
                        this._data = new a.init(), this._nDataBytes = 0;
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
                    },
                    _process: function(e) {
                        var n = this._data, r = n.words, o = n.sigBytes, i = this.blockSize, u = o / (4 * i), c = (u = e ? t.ceil(u) : t.max((0 | u) - this._minBufferSize, 0)) * i, s = t.min(4 * c, o);
                        if (c) {
                            for (var f = 0; f < c; f += i) this._doProcessBlock(r, f);
                            var l = r.splice(0, c);
                            n.sigBytes -= s;
                        }
                        return new a.init(l, s);
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._data = this._data.clone(), t;
                    },
                    _minBufferSize: 0
                });
                o.Hasher = l.extend({
                    cfg: i.extend(),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t), this.reset();
                    },
                    reset: function() {
                        l.reset.call(this), this._doReset();
                    },
                    update: function(t) {
                        return this._append(t), this._process(), this;
                    },
                    finalize: function(t) {
                        return t && this._append(t), this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function(t) {
                        return function(e, n) {
                            return new t.init(n).finalize(e);
                        };
                    },
                    _createHmacHelper: function(t) {
                        return function(e, n) {
                            return new d.HMAC.init(t, n).finalize(e);
                        };
                    }
                });
                var d = r.algo = {};
                return r;
            }(Math);
            return t;
        });
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            send: function(t, e, n) {
                return new Promise(function(r, o) {
                    wx.request({
                        url: "" + t,
                        data: e,
                        method: n || "GET",
                        dataType: "json",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success: function(t) {
                            r && r(t);
                        },
                        fail: function(t) {
                            o(t);
                        }
                    });
                });
            }
        };
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function(t, e) {
            return {
                code: t,
                msg: e
            };
        };
        e.default = {
            SAVE_SUCC: n(200, "存储成功"),
            SAVE_LOG_FAIL: n(201, "存储日志失败"),
            EXCEED_DAY_LIMIT: n(302, "超出当天日志容量限额"),
            REPORT_SUCC: n(400, "上报成功"),
            REPORT_AJAX_ERROR: n(402, "上报接口失败"),
            REPORT_SERVER_ERROR: n(403, "上报服务端有错"),
            REPORT_UNKNOWN_ERROR: n(404, "上报未知错误"),
            UNKNOWN_ERROR: n(666, "未知错误")
        };
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = {
            enableShake: !1,
            appSource: "",
            devMode: !1,
            customReport: {}
        };
        e.default = {
            set: function(t) {
                var e = t || {};
                return void 0 !== e.enableShake && (n.enableShake = Boolean(e.enableShake)), void 0 !== e.appSource && (n.appSource = e.appSource), 
                void 0 !== e.devMode && (n.devMode = Boolean(e.devMode)), void 0 !== e.customReport && (n.customReport = e.customReport), 
                n;
            },
            get: function() {
                return n;
            }
        };
    }, function(t, e, n) {
        t.exports = n(8);
    }, function(t, e, n) {
        (function(e) {
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function o(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n;
                }
                return Array.from(t);
            }
            var i, a, u = r(n(14)), c = r(n(17)), s = r(n(18)), f = r(n(4)), l = r(n(19)), d = r(n(20)), p = r(n(21)), g = r(n(5)), h = r(n(6)), y = {
                default: 14,
                owl: 15,
                redux: 16
            }, v = 1 * c.default.M_BYTE, m = 1 * c.default.M_BYTE, w = [], S = !1, b = !1, _ = function(t, e, n) {
                return [ "loganlog", l.default.stringify(t), e, n ].join("_");
            }, x = function(t) {
                var e = t.split("_");
                if ("loganlog" == e[0]) return {
                    date: new Date(e[1]),
                    version: parseInt(e[2]),
                    pageNo: parseInt(e[3])
                };
                throw new Error("loganlog key parse error! key is not correct:" + t);
            }, O = function(t) {
                return t.getTime() < l.default.getOffsetDayTime(new Date(), -1);
            }, E = function(t, n, r) {
                e.log(t + ": " + (n.errMsg || n.message || n.stack || n.toString() || "")), "function" == typeof r && r();
            }, T = function() {
                return new Promise(function(t) {
                    s.default.getStorageInfo().then(function(t) {
                        t.keys.filter(function(t) {
                            return t.indexOf("loganlog") >= 0 && O(x(t).date);
                        }).map(function(t) {
                            s.default.remove(t).catch(function() {});
                        });
                    }).catch(t), s.default.get("logan_days_info").then(function(e) {
                        var n = Object.keys(e.data).reduce(function(t, n) {
                            return O(new Date(n)) || (t[n] = Object.assign({}, e.data[n])), t;
                        }, {});
                        s.default.set("logan_days_info", n).then(t).catch(t);
                    }).catch(t);
                });
            }, R = function() {
                return new Promise(function(t, e) {
                    s.default.getStorageInfo().then(function(n) {
                        n.keys.indexOf("logan_days_info") < 0 ? s.default.set("logan_days_info", {}).then(function() {
                            t();
                        }).catch(e) : t();
                    }).catch(e);
                });
            }, A = function(t) {
                return new Promise(function(e, n) {
                    var r = k(t);
                    s.default.get("logan_days_info").then(function(t) {
                        ((t.data[l.default.stringify(new Date())] || {}).totalSize || 0) + r.logSize > m ? (p.default.saveLogFail(g.default.EXCEED_DAY_LIMIT), 
                        n(new Error("单天日志总大小将超过" + c.default.readableByte(m) + "，无法继续写入"))) : s.default.getStorageInfo().then(function(t) {
                            var i = t.keys.filter(function(t) {
                                return t.indexOf("loganlog") >= 0 && l.default.isToday(x(t).date) && 1 === x(t).version;
                            }).reduce(function(t, e) {
                                return e > t ? e : t;
                            }, "");
                            i ? s.default.get(i).then(function(t) {
                                var a = t.data, u = t.data.totalSize || 0;
                                u + r.logSize > v ? s.default.set(_(new Date(), 1, x(i).pageNo + 1), {
                                    totalSize: r.logSize,
                                    logStringArray: [ r ]
                                }).then(function() {
                                    e(r.logSize);
                                }).catch(n) : s.default.set(i, {
                                    totalSize: u + r.logSize,
                                    logStringArray: [].concat(o(a.logStringArray), [ r ])
                                }).then(function() {
                                    e(r.logSize);
                                }).catch(n);
                            }).catch(function() {
                                s.default.set(_(new Date(), 1, x(i).pageNo + 1), {
                                    totalSize: r.logSize,
                                    logStringArray: [ r ]
                                }).then(function() {
                                    e(r.logSize);
                                }).catch(n);
                            }) : s.default.set(_(new Date(), 1, 0), {
                                totalSize: r.logSize,
                                logStringArray: [ r ]
                            }).then(function() {
                                e(r.logSize);
                            }).catch(n);
                        }).catch(n);
                    }).catch(n);
                });
            }, k = function(t) {
                var e = {
                    f: "" + (y[t.logType] || y.default),
                    c: "" + encodeURIComponent(t.logString),
                    d: "" + Date.now(),
                    l: "" + Date.now(),
                    m: "true",
                    s: "" + i
                }, n = JSON.stringify(e) + "\n";
                try {
                    n = u.default.changeToBase64(n);
                } catch (t) {
                    throw new Error("changeToBase64 error!");
                }
                var r = JSON.stringify({
                    log: n
                });
                return {
                    logString: r,
                    logSize: c.default.sizeOf(r)
                };
            }, D = function t() {
                var e = function() {
                    S = !1, t();
                };
                if (w.length > 0 && !S) {
                    S = !0;
                    var n = w.shift();
                    R().then(function() {
                        A(n).then(function(t) {
                            p.default.saveLogSucc(), s.default.get("logan_days_info").then(function(n) {
                                var r = n.data, o = r[l.default.stringify(new Date())] || {}, i = Object.assign(o, {
                                    totalSize: (o.totalSize || 0) + t
                                }), a = {};
                                a[l.default.stringify(new Date())] = i;
                                var u = Object.assign(r, a);
                                s.default.set("logan_days_info", u).then(function() {
                                    e();
                                }).catch(function(t) {
                                    E("set DaysInfo failed after insert loganlog, may result in capacity overflow: ", t, e);
                                });
                            }).catch(function(t) {
                                E("get DaysInfo failed after insert loganlog, may result in capacity overflow: ", t, e);
                            });
                        }).catch(function(t) {
                            p.default.saveLogFail(g.default.SAVE_LOG_FAIL, "err: " + (t.errMsg || t.message || t.stack || t.toString() || "")), 
                            E("updateLoganLog failed: ", t, e);
                        });
                    }).catch(function(t) {
                        p.default.saveLogFail(g.default.SAVE_LOG_FAIL, "initLoganDaysInfoWhenNotFound failed err: " + (t.errMsg || t.message || t.stack || t.toString() || "")), 
                        E("initLoganDaysInfoWhenNotFound failed: ", t, e);
                    });
                }
            }, j = function t(n, r) {
                var o = function(t) {
                    "function" == typeof n.errorHandler && n.errorHandler(t), b = !1;
                }, i = function(t, e) {
                    if (!e) return !0;
                    var n = x(t), r = x(e);
                    return l.default.stringify(n.date) !== l.default.stringify(r.date) || n.version !== r.version;
                };
                if (r.length > 0) {
                    var a = r.shift(), u = r.length > 0 ? r[0] : null;
                    s.default.get(a).then(function(c) {
                        var s = c.data.logStringArray.reduce(function(t, e) {
                            var n = JSON.parse(e.logString);
                            return t.logArray.push(n.log), t;
                        }, {
                            logArray: []
                        }), d = x(a), y = d.version, v = l.default.stringify(d.date), m = d.pageNo, w = "";
                        try {
                            var S = wx.getSystemInfoSync();
                            w = JSON.stringify({
                                version: S.version || "",
                                system: S.system || "",
                                model: S.model || "",
                                platform: S.platform || "",
                                sdkVersion: S.SDKVersion || ""
                            });
                        } catch (t) {
                            e.log("getSystemInfoSync error", t);
                        }
                        var b = i(a, u), _ = Date.now(), O = ("string" == typeof n.customReport ? n.customReport : JSON.stringify(n.customReport || {})).substring(0, 1024);
                        f.default.send(h.default.get().devMode ? "http://logan.plat.test.sankuai.com/logger/webLogUpload.json" : "https://logan.sankuai.com/logger/webLogUpload.json", {
                            webSource: h.default.get().appSource || "unknown",
                            unionId: n.unionId || "unknown",
                            environment: w,
                            version: y,
                            fileDate: v,
                            logArray: s.logArray,
                            ivArray: s.ivArray,
                            logPageNo: m + 1,
                            logPageEnd: b,
                            client: "wxapp",
                            unencrypted: !0,
                            uploadSource: n.uploadSource || "userToast",
                            customReportInfo: O
                        }, "POST").then(function(i) {
                            var u = Date.now() - _;
                            i.data && 200 === i.data.code ? (b && p.default.reportLogSucc(u), e.log("send succ! key: " + a), 
                            t(n, r)) : (p.default.reportLogFail(g.default.REPORT_SERVER_ERROR, "serverCode: " + (i.data && i.data.code), u), 
                            E("send failed!", "code:" + (i.data && i.data.code || "unknown"), function() {
                                o("问题反馈失败，错误代码:" + (i.data && i.data.code || 0));
                            }));
                        }).catch(function(t) {
                            var e = Date.now() - _;
                            p.default.reportLogFail(g.default.REPORT_AJAX_ERROR, "err: " + (t.errMsg || t.message || t.stack || t.toString() || ""), e), 
                            E("send failed!", t, function() {
                                o("网络请求错误，问题反馈失败，请稍后再试");
                            });
                        });
                    }).catch(function(t) {
                        p.default.reportLogFail(g.default.REPORT_UNKNOWN_ERROR, "err: " + (t.errMsg || t.message || t.stack || t.toString() || ""), 0), 
                        E("获取日志" + a + "失败", t, function() {
                            o("获取" + a + "日志失败了");
                        });
                    });
                } else "function" == typeof n.succHandler && n.succHandler(), b = !1;
            }, M = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                b ? e.log("日志还在上报过程中...") : (b = !0, s.default.getStorageInfo().then(function(e) {
                    var n = e.keys.filter(function(t) {
                        return t.indexOf("loganlog") >= 0;
                    });
                    n.length > 0 ? (n.sort(function(t, e) {
                        return t < e ? -1 : 1;
                    }), j(t, n)) : E("日志为空", "", function() {
                        "function" == typeof t.errorHandler && t.errorHandler("没有相关日志需要上报~"), b = !1;
                    });
                }).catch(function(e) {
                    E("Get StorageInfo before report failed", e, function() {
                        "function" == typeof t.errorHandler && t.errorHandler("获取存储信息失败了T^T，请稍后再试~"), b = !1;
                    });
                }));
            }, z = function() {
                a.stop();
                var t = "", n = h.default.get().customReport;
                n && n.unionId ? t = n.biz ? n.biz + "|" + n.unionId : n.unionId : s.default.getSync("token") ? t = "token|" + s.default.getSync("token") : s.default.getSync("openid") ? t = "openid|" + s.default.getSync("openid") : s.default.getSync("openId") ? t = "openId|" + s.default.getSync("openId") : s.default.getSync("_lx_sdk_lxcuid") && (t = "lxcuid|" + s.default.getSync("_lx_sdk_lxcuid")), 
                t = t.substring(0, 256);
                var r = function(t, n) {
                    wx.showModal({
                        confirmText: "继续反馈",
                        cancelText: "取消",
                        title: h.default.get().devMode ? "dev模式问题反馈" : "问题反馈",
                        content: n ? "点击继续反馈，将上传当前小程序日志作为反馈问题的参考" : "建议在 Wi-Fi 环境下点击继续反馈，将上传当前小程序日志作为反馈问题的参考",
                        success: function(n) {
                            if (n.confirm) {
                                wx.showLoading({
                                    title: "问题正在反馈..",
                                    mask: !1
                                });
                                var r = setTimeout(function() {
                                    E("反馈超时，", "", function() {
                                        wx.showToast({
                                            title: "反馈超时了，请稍后再试试",
                                            icon: "none",
                                            duration: 2e3
                                        }), b = !1;
                                    }), r = null;
                                }, 2e4);
                                M({
                                    customReport: h.default.get().customReport,
                                    unionId: t,
                                    succHandler: function() {
                                        clearTimeout(r), wx.hideLoading(), a.start(), t ? wx.showModal({
                                            title: "提示",
                                            confirmText: "复制",
                                            cancelText: "关闭",
                                            content: "问题反馈成功！您的反馈号码为：" + t + "，点击复制后该号会存入剪贴板，您可粘贴提供给客服或相关技术人员。感谢您的反馈。",
                                            success: function(n) {
                                                n.confirm ? wx.setClipboardData({
                                                    data: t,
                                                    success: function() {
                                                        wx.showToast({
                                                            title: "Id复制成功!",
                                                            icon: "success",
                                                            duration: 2e3
                                                        });
                                                    }
                                                }) : n.cancel && e.log("用户点击取消");
                                            }
                                        }) : wx.showToast({
                                            title: "感谢您的反馈！",
                                            icon: "success",
                                            duration: 2e3
                                        });
                                    },
                                    errorHandler: function(t) {
                                        clearTimeout(r), wx.hideLoading(), a.start(), wx.showToast({
                                            title: t || "反馈出错了T^T，请稍后再试试",
                                            icon: "none",
                                            duration: 2e3
                                        });
                                    }
                                });
                            } else n.cancel && (a.start(), e.log("用户点击取消反馈"));
                        }
                    });
                };
                wx.getNetworkType({
                    success: function(e) {
                        r(t, e.networkType && "wifi" === e.networkType);
                    },
                    fail: function() {
                        r(t, !1);
                    }
                });
            }, B = function(t, e) {
                t.enableShake !== e.enableShake && (!0 === e.enableShake ? a.start() : a.stop());
            };
            i = s.default.setSync("logan_session_token", c.default.generateRandomBytes(20)), 
            a = new d.default({
                threshold: 2,
                timeout: 2e3,
                shakeHandler: z
            });
            var I = {
                config: function(t) {
                    var e = Object.assign({}, h.default.get()), n = Object.assign({}, h.default.set(t));
                    return B(e, n), I;
                },
                log: function(t, n) {
                    var r = c.default.sizeOf(t || "");
                    r <= 0 ? e.log("日志内容为空") : r >= v ? e.log("日志内容超过单条容量限制：" + c.default.readableByte(v) + ",无法写入") : (h.default.get().devMode && e.log("[log in Logan][logType: " + (n || "default") + "]: " + t), 
                    w.push({
                        logString: t,
                        logType: n || "default"
                    }), T().then(D).catch(function() {}));
                },
                report: M
            };
            t.exports = I;
        }).call(e, n(0));
    }, function(t) {
        function e() {
            throw new Error("setTimeout has not been defined");
        }
        function n() {
            throw new Error("clearTimeout has not been defined");
        }
        function r(t) {
            if (s === setTimeout) return setTimeout(t, 0);
            if ((s === e || !s) && setTimeout) return s = setTimeout, setTimeout(t, 0);
            try {
                return s(t, 0);
            } catch (e) {
                try {
                    return s.call(null, t, 0);
                } catch (e) {
                    return s.call(this, t, 0);
                }
            }
        }
        function o(t) {
            if (f === clearTimeout) return clearTimeout(t);
            if ((f === n || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t);
            try {
                return f(t);
            } catch (e) {
                try {
                    return f.call(null, t);
                } catch (e) {
                    return f.call(this, t);
                }
            }
        }
        function i() {
            g && d && (g = !1, d.length ? p = d.concat(p) : h = -1, p.length && a());
        }
        function a() {
            if (!g) {
                var t = r(i);
                g = !0;
                for (var e = p.length; e; ) {
                    for (d = p, p = []; ++h < e; ) d && d[h].run();
                    h = -1, e = p.length;
                }
                d = null, g = !1, o(t);
            }
        }
        function u(t, e) {
            this.fun = t, this.array = e;
        }
        function c() {}
        var s, f, l = t.exports = {};
        !function() {
            try {
                s = "function" == typeof setTimeout ? setTimeout : e;
            } catch (t) {
                s = e;
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : n;
            } catch (t) {
                f = n;
            }
        }();
        var d, p = [], g = !1, h = -1;
        l.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            p.push(new u(t, e)), 1 !== p.length || g || r(a);
        }, u.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", 
        l.versions = {}, l.on = c, l.addListener = c, l.once = c, l.off = c, l.removeListener = c, 
        l.removeAllListeners = c, l.emit = c, l.prependListener = c, l.prependOnceListener = c, 
        l.listeners = function() {
            return [];
        }, l.binding = function() {
            throw new Error("process.binding is not supported");
        }, l.cwd = function() {
            return "/";
        }, l.chdir = function() {
            throw new Error("process.chdir is not supported");
        }, l.umask = function() {
            return 0;
        };
    }, function(e) {
        e.exports = function(e) {
            return e && "object" === (void 0 === e ? "undefined" : t(e)) && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
        };
    }, function(t) {
        "function" == typeof Object.create ? t.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
        } : t.exports = function(t, e) {
            t.super_ = e;
            var n = function() {};
            n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
        };
    }, function(e, n, r) {
        (function(n) {
            function o(t, e) {
                if (t === e) return 0;
                for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o) if (t[o] !== e[o]) {
                    n = t[o], r = e[o];
                    break;
                }
                return n < r ? -1 : r < n ? 1 : 0;
            }
            function i(t) {
                return n.Buffer && "function" == typeof n.Buffer.isBuffer ? n.Buffer.isBuffer(t) : !(null == t || !t._isBuffer);
            }
            function a(t) {
                return Object.prototype.toString.call(t);
            }
            function u(t) {
                return !i(t) && ("function" == typeof n.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : !!t && (t instanceof DataView || !!(t.buffer && t.buffer instanceof ArrayBuffer))));
            }
            function c(t) {
                if (b.isFunction(t)) {
                    if (O) return t.name;
                    var e = t.toString().match(T);
                    return e && e[1];
                }
            }
            function s(t, e) {
                return "string" == typeof t ? t.length < e ? t : t.slice(0, e) : t;
            }
            function f(t) {
                if (O || !b.isFunction(t)) return b.inspect(t);
                var e = c(t);
                return "[Function" + (e ? ": " + e : "") + "]";
            }
            function l(t) {
                return s(f(t.actual), 128) + " " + t.operator + " " + s(f(t.expected), 128);
            }
            function d(t, e, n, r, o) {
                throw new E.AssertionError({
                    message: n,
                    actual: t,
                    expected: e,
                    operator: r,
                    stackStartFunction: o
                });
            }
            function p(t, e) {
                t || d(t, !0, e, "==", E.ok);
            }
            function g(e, n, r, c) {
                if (e === n) return !0;
                if (i(e) && i(n)) return 0 === o(e, n);
                if (b.isDate(e) && b.isDate(n)) return e.getTime() === n.getTime();
                if (b.isRegExp(e) && b.isRegExp(n)) return e.source === n.source && e.global === n.global && e.multiline === n.multiline && e.lastIndex === n.lastIndex && e.ignoreCase === n.ignoreCase;
                if (null !== e && "object" === (void 0 === e ? "undefined" : t(e)) || null !== n && "object" === (void 0 === n ? "undefined" : t(n))) {
                    if (u(e) && u(n) && a(e) === a(n) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === o(new Uint8Array(e.buffer), new Uint8Array(n.buffer));
                    if (i(e) !== i(n)) return !1;
                    var s = (c = c || {
                        actual: [],
                        expected: []
                    }).actual.indexOf(e);
                    return -1 !== s && s === c.expected.indexOf(n) || (c.actual.push(e), c.expected.push(n), 
                    y(e, n, r, c));
                }
                return r ? e === n : e == n;
            }
            function h(t) {
                return "[object Arguments]" == Object.prototype.toString.call(t);
            }
            function y(t, e, n, r) {
                if (null === t || void 0 === t || null === e || void 0 === e) return !1;
                if (b.isPrimitive(t) || b.isPrimitive(e)) return t === e;
                if (n && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1;
                var o = h(t), i = h(e);
                if (o && !i || !o && i) return !1;
                if (o) return t = x.call(t), e = x.call(e), g(t, e, n);
                var a, u, c = R(t), s = R(e);
                if (c.length !== s.length) return !1;
                for (c.sort(), s.sort(), u = c.length - 1; u >= 0; u--) if (c[u] !== s[u]) return !1;
                for (u = c.length - 1; u >= 0; u--) if (a = c[u], !g(t[a], e[a], n, r)) return !1;
                return !0;
            }
            function v(t, e, n) {
                g(t, e, !0) && d(t, e, n, "notDeepStrictEqual", v);
            }
            function m(t, e) {
                if (!t || !e) return !1;
                if ("[object RegExp]" == Object.prototype.toString.call(e)) return e.test(t);
                try {
                    if (t instanceof e) return !0;
                } catch (t) {}
                return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
            }
            function w(t) {
                var e;
                try {
                    t();
                } catch (t) {
                    e = t;
                }
                return e;
            }
            function S(t, e, n, r) {
                var o;
                if ("function" != typeof e) throw new TypeError('"block" argument must be a function');
                "string" == typeof n && (r = n, n = null), o = w(e), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), 
                t && !o && d(o, n, "Missing expected exception" + r);
                var i = "string" == typeof r, a = !t && b.isError(o), u = !t && o && !n;
                if ((a && i && m(o, n) || u) && d(o, n, "Got unwanted exception" + r), t && o && n && !m(o, n) || !t && o) throw o;
            }
            var b = r(2), _ = Object.prototype.hasOwnProperty, x = Array.prototype.slice, O = "foo" === function() {}.name, E = e.exports = p, T = /\s*function\s+([^\(\s]*)\s*/;
            E.AssertionError = function(t) {
                this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, 
                this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = l(this), 
                this.generatedMessage = !0);
                var e = t.stackStartFunction || d;
                if (Error.captureStackTrace) Error.captureStackTrace(this, e); else {
                    var n = new Error();
                    if (n.stack) {
                        var r = n.stack, o = c(e), i = r.indexOf("\n" + o);
                        if (i >= 0) {
                            var a = r.indexOf("\n", i + 1);
                            r = r.substring(a + 1);
                        }
                        this.stack = r;
                    }
                }
            }, b.inherits(E.AssertionError, Error), E.fail = d, E.ok = p, E.equal = function(t, e, n) {
                t != e && d(t, e, n, "==", E.equal);
            }, E.notEqual = function(t, e, n) {
                t == e && d(t, e, n, "!=", E.notEqual);
            }, E.deepEqual = function(t, e, n) {
                g(t, e, !1) || d(t, e, n, "deepEqual", E.deepEqual);
            }, E.deepStrictEqual = function(t, e, n) {
                g(t, e, !0) || d(t, e, n, "deepStrictEqual", E.deepStrictEqual);
            }, E.notDeepEqual = function(t, e, n) {
                g(t, e, !1) && d(t, e, n, "notDeepEqual", E.notDeepEqual);
            }, E.notDeepStrictEqual = v, E.strictEqual = function(t, e, n) {
                t !== e && d(t, e, n, "===", E.strictEqual);
            }, E.notStrictEqual = function(t, e, n) {
                t === e && d(t, e, n, "!==", E.notStrictEqual);
            }, E.throws = function(t, e, n) {
                S(!0, t, e, n);
            }, E.doesNotThrow = function(t, e, n) {
                S(!1, t, e, n);
            }, E.ifError = function(t) {
                if (t) throw t;
            };
            var R = Object.keys || function(t) {
                var e = [];
                for (var n in t) _.call(t, n) && e.push(n);
                return e;
            };
        }).call(n, r(1));
    }, function(t) {
        t.exports = function() {
            return new Date().getTime();
        };
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = r(n(15)), i = r(n(16));
        e.default = {
            changeToBase64: function(t) {
                return o.default.parse(t).toString(i.default);
            }
        };
    }, function(t, e, n) {
        !function(r, o) {
            t.exports = e = o(n(3));
        }(0, function(t) {
            return t.enc.Utf8;
        });
    }, function(t, e, n) {
        !function(r, o) {
            t.exports = e = o(n(3));
        }(0, function(t) {
            return function() {
                function e(t, e, n) {
                    for (var o = [], i = 0, a = 0; a < e; a++) if (a % 4) {
                        var u = n[t.charCodeAt(a - 1)] << a % 4 * 2, c = n[t.charCodeAt(a)] >>> 6 - a % 4 * 2;
                        o[i >>> 2] |= (u | c) << 24 - i % 4 * 8, i++;
                    }
                    return r.create(o, i);
                }
                var n = t, r = n.lib.WordArray;
                n.enc.Base64 = {
                    stringify: function(t) {
                        var e = t.words, n = t.sigBytes, r = this._map;
                        t.clamp();
                        for (var o = [], i = 0; i < n; i += 3) for (var a = e[i >>> 2] >>> 24 - i % 4 * 8 & 255, u = e[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255, c = e[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; s < 4 && i + .75 * s < n; s++) o.push(r.charAt((a << 16 | u << 8 | c) >>> 6 * (3 - s) & 63));
                        var f = r.charAt(64);
                        if (f) for (;o.length % 4; ) o.push(f);
                        return o.join("");
                    },
                    parse: function(t) {
                        var n = t.length, r = this._map, o = this._reverseMap;
                        if (!o) {
                            o = this._reverseMap = [];
                            for (var i = 0; i < r.length; i++) o[r.charCodeAt(i)] = i;
                        }
                        var a = r.charAt(64);
                        if (a) {
                            var u = t.indexOf(a);
                            -1 !== u && (n = u);
                        }
                        return e(t, n, o);
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                };
            }(), t.enc.Base64;
        });
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.default = {
            sizeOf: function(t, e) {
                var n, r, o, i = 0;
                if ("utf-16" === (e = e ? e.toLowerCase() : "") || "utf16" === e) for (r = 0, o = t.length; r < o; r++) i += (n = t.charCodeAt(r)) <= 65535 ? 2 : 4; else for (r = 0, 
                o = t.length; r < o; r++) i += (n = t.charCodeAt(r)) <= 127 ? 1 : n <= 2047 ? 2 : n <= 65535 ? 3 : 4;
                return i;
            },
            readableByte: function(t, e) {
                return e = e || 0, t >= 1073741824 ? (t / 1073741824).toFixed(e) + "G" : t >= 1048576 ? (t / 1048576).toFixed(e) + "M" : t >= 1024 ? (t / 1024).toFixed(e) + "K" : (t || 0) + "B";
            },
            K_BYTE: 1024,
            M_BYTE: 1048576,
            G_BYTE: 1073741824,
            generateRandomBytes: function(t) {
                for (var e = "", n = parseInt(t / 8) + 1, r = 0; r < n; r++) {
                    var o = r === n - 1 ? t % 8 : 8;
                    e += Math.random().toString(36).substr(2, o);
                }
                return e;
            }
        };
    }, function(t, e, n) {
        (function(t) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = function(t) {
                return new Promise(function(e, n) {
                    t(function(t) {
                        e(t);
                    }, function(t) {
                        n(t);
                    });
                });
            };
            e.default = {
                set: function(t, e) {
                    return n(function(n, r) {
                        wx.setStorage({
                            key: t,
                            data: e,
                            success: n,
                            fail: r
                        });
                    });
                },
                setSync: function(e, n) {
                    try {
                        return wx.setStorageSync(e, n), n;
                    } catch (n) {
                        return t.log("setSync by key: " + e + " failed, " + (n.errMsg || n.message || n.toString())), 
                        "";
                    }
                },
                get: function(t) {
                    return n(function(e, n) {
                        wx.getStorage({
                            key: t,
                            success: e,
                            fail: n
                        });
                    });
                },
                getSync: function(e) {
                    try {
                        return wx.getStorageSync(e);
                    } catch (n) {
                        return t.log("getSync by key: " + e + " failed, " + n.errMsg), "";
                    }
                },
                remove: function(t) {
                    return n(function(e, n) {
                        wx.removeStorage({
                            key: t,
                            success: e,
                            fail: n
                        });
                    });
                },
                getStorageInfo: function() {
                    return n(function(t, e) {
                        wx.getStorageInfo({
                            success: t,
                            fail: e
                        });
                    });
                }
            };
        }).call(e, n(0));
    }, function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function(t) {
            if ("Invalid Date" == t) throw new Error("Invalid Date");
            return !0;
        }, r = function(t) {
            return n(t), new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
        }, o = function(t, e) {
            return n(t), r(new Date(t.getTime() + 864e5 * e));
        };
        e.default = {
            ONE_DAY_TIME_SPAN: 864e5,
            checkDate: n,
            stringify: function(t) {
                return n(t), t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate());
            },
            getDawnTime: r,
            isToday: function(t) {
                n(t);
                var e = r(new Date());
                return t.getTime() >= e && t.getTime() < o(new Date(), 1);
            },
            getOffsetDayTime: o,
            dayTimeWithinRange: function(t, e, n) {
                return t <= n && t >= e;
            }
        };
    }, function(e, n, r) {
        (function(e) {
            function r(t) {
                if (this.hasDeviceMotion = wx.onAccelerometerChange, this.options = {
                    threshold: 3,
                    timeout: 2e3,
                    shakeHandler: function() {
                        e.log("shaked!");
                    }
                }, "object" === (void 0 === t ? "undefined" : o(t))) for (var n in t) t.hasOwnProperty(n) && (this.options[n] = t[n]);
                this.lastTime = new Date(), this.lastX = null, this.lastY = null, this.lastZ = null;
            }
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
                return void 0 === e ? "undefined" : t(e);
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
            };
            r.prototype.reset = function() {
                this.lastTime = new Date(), this.lastX = null, this.lastY = null, this.lastZ = null;
            }, r.prototype.start = function() {
                var t = this;
                this.reset(), this.hasDeviceMotion && (wx.startAccelerometer && wx.startAccelerometer(), 
                wx.onAccelerometerChange(function(e) {
                    t.devicemotion(e);
                }));
            }, r.prototype.stop = function() {
                this.hasDeviceMotion && wx.stopAccelerometer && wx.stopAccelerometer(), this.reset();
            }, r.prototype.devicemotion = function(t) {
                var e = t, n = 0, r = 0, o = 0;
                if (null === this.lastX && null === this.lastY && null === this.lastZ) return this.lastX = e.x, 
                this.lastY = e.y, void (this.lastZ = e.z);
                n = Math.abs(this.lastX - e.x), r = Math.abs(this.lastY - e.y), o = Math.abs(this.lastZ - e.z), 
                (n > this.options.threshold && r > this.options.threshold || n > this.options.threshold && o > this.options.threshold || r > this.options.threshold && o > this.options.threshold) && new Date().getTime() - this.lastTime.getTime() > this.options.timeout && ("function" == typeof this.options.shakeHandler && this.options.shakeHandler(), 
                this.lastTime = new Date()), this.lastX = e.x, this.lastY = e.y, this.lastZ = e.z;
            }, n.default = r;
        }).call(n, r(0));
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = r(n(4)), i = r(n(5)), a = r(n(6)), u = [ "resourceUrl", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "statusCode", "firstCategory", "secondCategory", "logContent" ], c = !1, s = !1, f = function(t) {
            var e = [], n = u.map(function(e) {
                return t[e];
            });
            return e.push("S\t"), e.push(n.join("\t")), e = e.join("\n");
        }, l = function(t, e, n, r) {
            var i = {
                resourceUrl: t,
                timestamp: Date.now(),
                requestbyte: 0,
                responsebyte: 0,
                responsetime: r || 0,
                project: "logan-wxapp",
                pageUrl: a.default.get().appSource || "",
                statusCode: "|" + e,
                firstCategory: null === n ? "" : "ajaxError",
                secondCategory: null === n ? "" : t,
                logContent: n || ""
            };
            o.default.send(a.default.get().devMode ? "https://catfront.51ping.com/api/batch?v=1&sdk=1.7.8" : "https://catfront.dianping.com/api/batch?v=1&sdk=1.7.8", "c=" + encodeURIComponent(f(i)), "POST").then(function() {}).catch(function() {});
        };
        e.default = {
            saveLogSucc: function() {
                c || (c = !0, s = !1, l(i.default.SAVE_SUCC.msg, i.default.SAVE_SUCC.code, null, 0));
            },
            saveLogFail: function(t, e) {
                s || (s = !0, c = !1, l(t && t.msg || i.default.UNKNOWN_ERROR.msg, t && t.code || i.default.UNKNOWN_ERROR.code, e || "", 0));
            },
            reportLogSucc: function(t) {
                l(i.default.REPORT_SUCC.msg, i.default.REPORT_SUCC.code, null, t || 0);
            },
            reportLogFail: function(t, e, n) {
                l(t && t.msg || i.default.REPORT_UNKNOWN_ERROR.msg, t && t.code || i.default.REPORT_UNKNOWN_ERROR.code, e || "", n || 0);
            }
        };
    } ]);
});