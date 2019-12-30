function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("./axios/axios")), r = t(require("./interceptors/index")), i = t(require("../config/index")), a = [ "appname", "appversion", "token", "openId" ], u = function() {
    function t(n) {
        e(this, t), this.data = {
            LIMIT: 10,
            count: 0,
            config: {
                level: 1,
                checkToken: !0
            }
        }, this.queue = [], this.context = {}, this.minaenv = {
            token: "",
            openId: ""
        }, this._addInterceptor(), this.config(n);
    }
    return n(t, [ {
        key: "_addInterceptor",
        value: function() {
            var e = this;
            [ r.default.prefetchInterceptor, r.default.minaRequestInterceptor, r.default.mapiRequestInterceptor, r.default.logoutInterceptor, r.default.mapiResponseInterceptor, r.default.owlInterceptor, r.default.preyodaInterceptor, r.default.postyodaInterceptor ].map(function(t) {
                e.use(t);
            });
        }
    }, {
        key: "config",
        value: function(e) {
            var t = this;
            e && a.map(function(n) {
                void 0 !== e[n] && (t.minaenv[n] = e[n]);
            });
        }
    }, {
        key: "_createMinaEnv",
        value: function() {
            return {
                token: i.default.getConfig("token") || this.minaenv.token || "",
                openId: i.default.getConfig("openId") || this.minaenv.openId || "",
                appname: i.default.getConfig("appname") || "",
                appversion: i.default.getConfig("appversion") || "",
                channel: i.default.getConfig("channel") || ""
            };
        }
    }, {
        key: "_setDebug_",
        value: function() {}
    }, {
        key: "_enableMock_",
        value: function(e) {
            return this._updateBaseContext({
                mock: {
                    path: e
                }
            }), this.use(r.default.mockInterceptor);
        }
    }, {
        key: "_disableMock_",
        value: function(e) {
            this._updateBaseContext({
                mock: void 0
            }), this.eject(e);
        }
    }, {
        key: "ignoreTokenCheck",
        value: function() {}
    }, {
        key: "addMiddleware",
        value: function() {}
    }, {
        key: "handleReject",
        value: function() {}
    }, {
        key: "_wrapPromise",
        value: function(e, t) {
            var n = this;
            return t = Object.assign({}, this.data.config, t), new Promise(function(o, r) {
                n._push(e, {
                    resolve: o,
                    reject: r
                }, t);
            });
        }
    }, {
        key: "_push",
        value: function(e, t, n) {
            var o = n.level;
            void 0 === o && (o = 5);
            for (var r = -1, i = this.queue, a = 0; a < i.length; a++) if (i[a].opts.level > o) {
                r = a;
                break;
            }
            var u = {
                request: e,
                userPromise: t,
                opts: n
            };
            -1 === r ? this.queue.push(u) : this.queue.splice(r, 0, u), this._run();
        }
    }, {
        key: "_run",
        value: function() {
            var e = this.queue, t = this.data;
            if (t.count < t.LIMIT && e.length) {
                var n = e.shift();
                this._doRequest(n);
            }
        }
    }, {
        key: "_doRequest",
        value: function(e) {
            var t = this;
            ++this.data.count;
            var n = e.request, r = e.userPromise, i = e.opts, a = function() {
                --t.data.count, t._run();
            }, u = this._createAxiosContext(n, i);
            return o.default.request(u).then(function(e) {
                a();
                var t = e.response;
                r.resolve(t);
            }, function(e) {
                a(), r.reject(e);
            }).catch(function(e) {
                r.reject("fail: " + (e && e.message));
            });
        }
    }, {
        key: "_createAxiosContext",
        value: function(e, t) {
            return t = Object.assign({}, this.data.config, t), Object.assign({}, this.context, {
                minaenv: this._createMinaEnv(),
                request: e,
                options: t
            });
        }
    }, {
        key: "_updateBaseContext",
        value: function(e) {
            this.context = Object.assign(this.context, e);
        }
    }, {
        key: "custom",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t._type_ = "mina", this._wrapPromise(e, t);
        }
    }, {
        key: "mina",
        value: function() {
            return this.custom.apply(this, arguments);
        }
    }, {
        key: "mapi",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t._type_ = "mapi", this._wrapPromise(e, t);
        }
    }, {
        key: "base",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return this._wrapPromise(e, t);
        }
    }, {
        key: "use",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return "request" === e.type ? "request-" + o.default.interceptors.request.use(e.resolve, e.reject) : "response" === e.type ? "response-" + o.default.interceptors.response.use(e.resolve, e.reject) : void 0;
        }
    }, {
        key: "eject",
        value: function(e) {
            try {
                var t = e.split("-"), n = t[0], r = t[1];
                return o.default.interceptors[n].eject(r);
            } catch (t) {
                console.log("未找到拦截器: " + e);
            }
        }
    } ]), t;
}();

exports.default = new u();