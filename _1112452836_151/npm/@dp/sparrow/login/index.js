function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}();

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = n(require("../wxp/index")), r = n(require("../navigation/index")), d = n(require("../event/index")), u = n(require("../../../@mtfe/wx-rc-finger/dist/finger.js")), a = n(require("../cache/index")), s = n(require("../request/index")), c = n(require("../env/index")), f = n(require("../config/index")), g = n(require("../pageutil/index")), l = n(require("../../logan-wxapp/build/wxlogan.js")), h = require("../context/constants/index"), v = {
    SUCCESS: 200,
    FAIL: 500
}, p = "https://maccount.dianping.com", I = function() {
    function n(t) {
        var o = this;
        e(this, n), this.env = c.default.get(), this.token = void 0, this.dpUser = void 0, 
        this.openId = void 0, this.unionId = void 0, this.finger = void 0, this.thirdUidInfo = void 0, 
        this.domain = p, c.default.on("envChanged", function(e) {
            o.domain = "test" === e ? "https://m.51ping.com" : p;
        }), d.default.on("login", function(e) {
            e && (e.token && o.setToken(e.token), e.openId && o.setOpenId(e.openId));
        }), d.default.on("logout", function() {
            o.logout();
        }), t && this.config(t), this.channel = f.default.getConfig("channel");
    }
    return o(n, [ {
        key: "config",
        value: function(e) {
            var n = this;
            e && [ "env", "sourceType", "loginSchema", "finger" ].map(function(t) {
                void 0 !== e[t] && (n[t] = e[t]);
            });
        }
    }, {
        key: "verifyToken",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                var o = e._getDPUser_(), i = Date.parse(new Date()) / 1e3;
                if ("object" === (void 0 === o ? "undefined" : t(o))) {
                    var r = o.tempLogin ? 86400 : 2592e3;
                    if (o.timestamp && i - o.timestamp < r) return void n(o.verifyDate && i - o.verifyDate >= 86400 ? e.parseToken(o.token, {
                        dpUser: o,
                        noCache: !1
                    }) : {
                        code: 200,
                        token: o.token,
                        msg: "未到验证周期"
                    });
                    e._setToken(void 0), e.dpUser = void 0, a.default.removeStorageSync("token"), a.default.removeStorageSync("dp_user"), 
                    n({
                        code: 500,
                        msg: "token缓存已过期"
                    });
                } else n({
                    code: 500,
                    msg: "token缓存不存在"
                });
            });
        }
    }, {
        key: "getToken",
        value: function() {
            return this.getUserInfo();
        }
    }, {
        key: "getTokenSync",
        value: function() {
            if (this.token) return this.token;
            var e = this._getDPUser_();
            return e && e.token ? e.token : void 0;
        }
    }, {
        key: "getDPUserSync",
        value: function() {
            return this.dpUser ? this.dpUser : this._getDPUser_();
        }
    }, {
        key: "getDPUser",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                if (e.dpUser) n({
                    token: e.dpUser.token,
                    userId: e.dpUser.userId,
                    code: 200
                }); else {
                    var t = e._getDPUser_();
                    n(t && t.token ? {
                        token: e.dpUser.token,
                        userId: e.dpUser.userId,
                        code: 200
                    } : {
                        code: 500,
                        msg: "用户未登陆或登录态过期"
                    });
                }
            });
        }
    }, {
        key: "getOpenId",
        value: function() {
            var e = this, n = this.openId;
            if (this.getOpenIdPromise) return this.getOpenIdPromise;
            var t = new Promise(function(t) {
                if (e.channel != h.CHANNEL.WEIXIN) return t({
                    code: 500,
                    msg: "不支持非微信环境获取openId"
                });
                if (n) t({
                    code: 200,
                    openId: n
                }); else {
                    var o = void 0;
                    e._getFinger_().then(function(e) {
                        return o = e, i.default.login();
                    }).then(function(n) {
                        var t = n.code, i = e._getNodeDomain();
                        return s.default.base({
                            url: i + "/mina/api/user/openid",
                            data: {
                                code: t,
                                appId: f.default.getConfig("appid"),
                                directLogin: !0,
                                cx: o
                            }
                        });
                    }).then(function(n) {
                        if (n && 200 == n.statusCode) if (n.data && 200 === n.data.code) {
                            var o = n.data.openId;
                            e.setOpenId(o), t({
                                code: 200,
                                openId: o
                            });
                        } else t({
                            code: 500,
                            msg: "服务出错"
                        }); else t({
                            code: 500,
                            msg: "网络出错了"
                        });
                    }).catch(function(e) {
                        t({
                            code: 500,
                            msg: "出错了" + e.message
                        });
                    });
                }
            });
            return this.getOpenIdPromise = t, t;
        }
    }, {
        key: "getOpenIdSync",
        value: function() {
            return this.openId;
        }
    }, {
        key: "getUnionId",
        value: function() {
            var e = this, n = this.unionId;
            return new Promise(function(t) {
                if (n) t({
                    code: 200,
                    unionId: n
                }); else {
                    var o = e.getUnionIdCacheSync();
                    o ? t({
                        code: 200,
                        unionId: o
                    }) : e.niceToHave().then(function(n) {
                        n && n.unionId ? t({
                            code: 200,
                            unionId: n.unionId
                        }) : e.must().then(function(e) {
                            t(e && e.unionId ? {
                                code: 200,
                                unionId: e.unionId
                            } : {
                                code: 500,
                                msg: "获取unionId失败"
                            });
                        }).catch(function() {
                            t({
                                code: 500,
                                msg: "获取unionId失败"
                            });
                        });
                    }).catch(function() {
                        t({
                            code: 500,
                            msg: "获取unionId失败"
                        });
                    });
                }
            });
        }
    }, {
        key: "getUnionIdSync",
        value: function() {
            return this.unionId;
        }
    }, {
        key: "getUserInfo",
        value: function() {
            var e = this.token, n = this.dpUser, t = this.openId, o = this.unionId;
            return new Promise(function(i) {
                i(e ? {
                    code: 200,
                    token: e,
                    dpUser: n,
                    openId: t,
                    unionId: o
                } : {
                    code: 500,
                    msg: "未登录"
                });
            });
        }
    }, {
        key: "niceToHave",
        value: function() {
            var e = this, n = f.default.getConfig("sourceType");
            if (this.niceToHavePromise) return this.niceToHavePromise;
            var t = new Promise(function(t) {
                if (e.channel != h.CHANNEL.WEIXIN) return t({
                    code: 500,
                    msg: "不支持非微信环境登录"
                });
                var o = void 0;
                e._getFinger_().then(function(e) {
                    return o = e, i.default.login();
                }).then(function(t) {
                    var i = t.code, r = e._getDomain();
                    return s.default.base({
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        url: r + "/thirdlogin/ajax/auth",
                        data: {
                            code: i,
                            sourceType: n,
                            directLogin: !0,
                            cx: o
                        }
                    });
                }).then(function(n) {
                    if (n && 200 == n.statusCode && n.data) {
                        var o = n.data.msg, i = n.data, r = void 0, d = void 0;
                        o && (o.eod && (r = o.eod, e.setOpenId(r)), o.eud && (d = o.eud, e.setUnionId(d)));
                        var u = i.thirdUid, a = i.thirdUidAuth;
                        if (u && a && e._setThirdUidInfo({
                            thirdUid: u,
                            thirdUidAuth: a
                        }), 100 == i.resultCode) t({
                            code: 500,
                            msg: "需要微信授权登陆"
                        }); else if (101 == i.resultCode) t({
                            code: 101,
                            msg: "登录流程依赖的服务长期不可用,改走降级登录"
                        }); else if (200 == i.resultCode) if (o && o.token) {
                            var s = o.token;
                            e.setToken(s).then(function(n) {
                                t(200 == n.code ? {
                                    code: 200,
                                    token: s,
                                    openId: r || e.openId,
                                    unionId: d || e.unionId
                                } : {
                                    code: 500,
                                    msg: n.msg
                                });
                            });
                        } else t({
                            code: 500,
                            openId: r || e.openId,
                            unionId: d || e.unionId,
                            msg: "未绑定手机号"
                        }); else t({
                            code: 500,
                            msg: "服务出错，微信登陆失败"
                        });
                    } else t({
                        code: 500,
                        msg: "接口出错了"
                    });
                    e.niceToHavePromise = void 0;
                }).catch(function() {
                    e.niceToHavePromise = void 0, t({
                        code: 500,
                        msg: "静默登陆出错了"
                    });
                });
            });
            return this.niceToHavePromise = t, t;
        }
    }, {
        key: "goToLoginPage",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = Object.assign({}, n, {
                redirectUrl: e
            });
            this._navAfterLogin(t);
        }
    }, {
        key: "must",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this.openId;
            return new Promise(function(o, i) {
                var u = g.default.getCurrentPage();
                if (e.channel != h.CHANNEL.WEIXIN) return i({
                    code: 500,
                    msg: "不支持非微信环境登录"
                });
                var a = function(t) {
                    if (t) return e._bindWxMobile(Object.assign(t, e.thirdUidInfo)).then(function(t) {
                        t && t.code == v.SUCCESS && t.token ? (l.default.log("微信一键登录获取到token" + JSON.stringify(t)), 
                        e.setToken(t.token, n).then(function(t) {
                            200 == t.code ? (d.default.trigger("loginEnd", {
                                isSuccess: !0,
                                token: t.token,
                                openId: e.openId
                            }), o({
                                code: v.SUCCESS,
                                token: t.token,
                                userId: e.dpUser && e.dpUser.userId,
                                unionId: e.unionId,
                                openId: e.openId
                            }), l.default.log("微信一键登录成功~"), n.redirectUrl && (n.close ? r.default.redirectTo({
                                url: n.redirectUrl
                            }) : r.default.navigateTo({
                                url: n.redirectUrl
                            }))) : (o({
                                code: v.FAIL,
                                errMsg: t.msg
                            }), l.default.log("解析token失败" + JSON.stringify(t)));
                        }).catch(function(e) {
                            o({
                                code: v.FAIL,
                                errMsg: "微信一键登录失败" + JSON.stringify(e)
                            });
                        })) : (l.default.log("微信一键登录失败" + JSON.stringify(t)), o({
                            code: v.FAIL,
                            errMsg: t.errMsg || t.errinfo || "微信一键登录失败"
                        }));
                    }).catch(function(e) {
                        l.default.log("微信一键登录失败" + JSON.stringify(e)), o({
                            code: v.FAIL,
                            errMsg: "一键登录失败"
                        });
                    });
                }, s = function(r) {
                    101 == r.code && (n.loginStep = 3);
                    n.onlyAuth = !0, e._navAfterLogin(n), n.redirectUrl || d.default.on("loginEnd", function n(r) {
                        d.default.off("loginEnd", n);
                        try {
                            var a = setInterval(function() {
                                if (g.default.getCurrentPage().__route__ === u.__route__) if (clearInterval(a), 
                                a = void 0, r.isSuccess) {
                                    t = t || r.openId, e.setOpenId(t);
                                    var n = {
                                        tempLogin: r.tempLogin
                                    };
                                    e.setToken(r.token, n).then(function(e) {
                                        200 == e.code ? o({
                                            code: 200,
                                            token: r.token,
                                            openId: t,
                                            unionId: r.unionId
                                        }) : i({
                                            code: 500,
                                            msg: e.msg
                                        });
                                    });
                                } else i({
                                    code: 500,
                                    msg: r.msg
                                });
                            }, 100);
                        } catch (e) {
                            i({
                                code: 500,
                                msg: e && e.message
                            });
                        }
                    });
                };
                e.niceToHave().then(function(e) {
                    if (200 === e.code) o(e); else {
                        var t = n.loginType, i = n.loginData, r = void 0 === i ? {} : i;
                        r && 4 === t ? a(r) : s(e);
                    }
                }).catch(function(e) {
                    i({
                        code: 500,
                        msg: e && e.message
                    });
                });
            });
        }
    }, {
        key: "ensure",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(t, o) {
                e.getUserInfo().then(function(t) {
                    return t && 200 === t.code ? {
                        code: 200,
                        token: t.token,
                        openId: t.openId,
                        unionId: t.unionId
                    } : e.must(n);
                }).then(function(e) {
                    t(e && e.token ? {
                        code: v.SUCCESS,
                        token: e.token,
                        openId: e.openId,
                        unionId: e.unionId
                    } : {
                        code: e && e.code || v.FAIL,
                        errMsg: e && e.errMsg || "获取token失败"
                    });
                }).catch(function(e) {
                    o({
                        code: 500,
                        msg: "登录失败，请稍后再试" + e.message
                    });
                });
            });
        }
    }, {
        key: "_bindWxMobile",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = n.iv, o = n.encryptedData, r = n.thirdUid, d = n.thirdUidAuth;
            return new Promise(function(u) {
                var a = {
                    needBind: !1,
                    needMerge: n.needMerge || !1,
                    sourceType: n.sourceType || 0
                };
                t && o ? (a.encryptedData = o, a.iv = t, e._getFinger_().then(function(e) {
                    return a.cx = e, r && d ? (a.thirdUid = r, a.thirdUidAuth = d, a) : (a.hasCode = !0, 
                    i.default.login());
                }).then(function(n) {
                    var t = n.code;
                    if (a.hasCode) {
                        if (!t) throw new Error("微信一键登录code缺失");
                        a.code = t, delete a.hasCode;
                    }
                    return s.default.base({
                        method: "POST",
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        url: e.domain + "/thirdlogin/ajax/bindWxMobile",
                        data: a
                    });
                }).then(function(e) {
                    if (e && 200 == e.statusCode) if (200 == e.data.resultCode) u({
                        code: v.SUCCESS,
                        token: e.data.msg && e.data.msg.token
                    }); else {
                        var n = e.data.msg && (e.data.msg.showMsg || e.data.msg.err) || "一键登录服务出错";
                        u({
                            code: v.FAIL,
                            errMsg: n,
                            errinfo: "一键登录服务出错,错误码:" + e.data.resultCode + ",错误信息:" + e.data.msg.err
                        });
                    } else u({
                        code: v.FAIL,
                        errMsg: e.errMsg || "一键登录失败",
                        errinfo: "一键登录失败,响应状态码:" + e.statusCode
                    });
                }).catch(function(e) {
                    u({
                        code: v.FAIL,
                        errMsg: e.errMsg || "一键登录失败",
                        errinfo: "一键登录失败,错误信息" + JSON.stringify(e)
                    });
                })) : u({
                    code: v.FAIL,
                    errMsg: "一键登录失败",
                    errinfo: "一键登录失败,手机号加密数据缺失"
                });
            });
        }
    }, {
        key: "tryHard",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                e.getUserInfo().then(function(t) {
                    t && 200 == t.code ? n(t) : e.niceToHave().then(function(e) {
                        n(e);
                    });
                });
            });
        }
    }, {
        key: "logout",
        value: function() {
            this.setToken(void 0, {
                type: "logout"
            }), a.default.removeStorageSync("token"), a.default.removeStorageSync("dp_user");
        }
    }, {
        key: "setOpenId",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            e && "string" == typeof e && (this._setOpenId(e), d.default.trigger("_openId_", e), 
            n.noCache || a.default.setStorage("openid", e));
        }
    }, {
        key: "setUnionId",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            e && (this.unionId = e, d.default.trigger("_unionId_", e), n.noCache || a.default.setStorage("unionid", e));
        }
    }, {
        key: "setToken",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (e) {
                if ("string" == typeof e) return this.parseToken(e, n);
            } else this._setToken(e);
        }
    }, {
        key: "_setToken",
        value: function(e) {
            this.token = e, f.default.setConfig({
                token: e
            }), d.default.trigger("_token_", e);
        }
    }, {
        key: "_setOpenId",
        value: function(e) {
            this.openId = e, f.default.setConfig({
                openId: e
            });
        }
    }, {
        key: "_setThirdUidInfo",
        value: function(e) {
            this.thirdUidInfo = e;
        }
    }, {
        key: "getThirdUidInfo",
        value: function() {
            return this.thirdUidInfo;
        }
    }, {
        key: "parseToken",
        value: function(e) {
            var n = this, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = this._getNodeDomain();
            return this._setToken(e), new Promise(function(i) {
                s.default.base({
                    url: o + "/mina/api/parsetoken",
                    data: {
                        token: e
                    }
                }).then(function(o) {
                    if (o && 200 == o.statusCode && o.data) {
                        var r = Date.parse(new Date()) / 1e3;
                        if (200 == o.data.code) {
                            var u = t.dpUser;
                            if (u ? u.verifyDate = r : u = {
                                token: e,
                                userId: o.data.userId,
                                verifyDate: r,
                                timestamp: r
                            }, u.tempLogin = !!u.tempLogin, !t.noCache) try {
                                a.default.setStorageSync("token", e), a.default.setStorageSync("dp_user", u);
                            } catch (e) {}
                            n.dpUser = u, d.default.trigger("_userId_", u.userId), i({
                                code: 200,
                                token: e,
                                userId: o.data.userId
                            });
                        } else {
                            n._setToken(void 0), n.dpUser = void 0;
                            try {
                                a.default.removeStorageSync("token"), a.default.removeStorageSync("dp_user");
                            } catch (e) {}
                            i({
                                code: 500,
                                msg: "解析 token 出错"
                            });
                        }
                    } else i({
                        code: 500,
                        msg: "网络出错了"
                    });
                }).catch(function() {
                    i({
                        code: 500,
                        msg: "解析 token 异常"
                    });
                });
            });
        }
    }, {
        key: "setUserInfo",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.token && this.setToken(e.token), e.openId && this.setOpenId(e.openId), e.unionId && this.setUnionId(e.unionId);
        }
    }, {
        key: "getTokenCache",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                if (e.token) n(e.token); else {
                    var t = e._getDPUser_();
                    t && t.token ? (e._setToken(t.token), n(t.token)) : n();
                }
            });
        }
    }, {
        key: "getOpenIdCache",
        value: function() {
            return this._getCache_("openId", "openid");
        }
    }, {
        key: "getUnionIdCache",
        value: function() {
            return this._getCache_("unionId", "unionid");
        }
    }, {
        key: "_getCache_",
        value: function(e, n) {
            var t = this;
            return new Promise(function(o) {
                a.default.getStorage(n).then(function(n) {
                    "string" == typeof n && n ? ("openId" === e ? t.setOpenId(n, {
                        noCache: !0
                    }) : "unionId" === e && t.setUnionId(n, {
                        noCache: !0
                    }), o(n)) : (a.default.removeStorageSync(e), o());
                }).catch(function() {
                    o();
                });
            });
        }
    }, {
        key: "getTokenCacheSync",
        value: function() {
            if (this.token) return this.token;
            var e = this._getDPUser_();
            return e && e.token ? (this._setToken(e.token), e.token) : void 0;
        }
    }, {
        key: "getOpenIdCacheSync",
        value: function() {
            if (this.openId) return this.openId;
            var e = a.default.getStorageSync("openid");
            if ("string" == typeof e) return e && void 0 === this.openId ? (this.setOpenId(e, {
                noCache: !0
            }), e) : e;
            a.default.removeStorage("openid");
        }
    }, {
        key: "getUnionIdCacheSync",
        value: function() {
            if (this.unionId) return this.unionId;
            var e = a.default.getStorageSync("unionid");
            if ("string" == typeof e) {
                if (e && void 0 === this.unionId) return this.setUnionId(e, {
                    noCache: !0
                }), e;
            } else a.default.removeStorage("unionid");
        }
    }, {
        key: "_getDPUser_",
        value: function() {
            var e = a.default.getStorageSync("dp_user"), n = Date.parse(new Date()) / 1e3;
            if ("object" === (void 0 === e ? "undefined" : t(e)) && e.timestamp) {
                var o = e.tempLogin ? 86400 : 2592e3;
                if (n - e.timestamp < o) return e && void 0 === this.dpUser && (this.dpUser = e), 
                e;
            }
            a.default.removeStorage("dp_user"), a.default.removeStorage("token");
        }
    }, {
        key: "_getFinger_",
        value: function() {
            var e = this;
            return new Promise(function(n) {
                e.finger ? n(e.finger) : u.default.g(function(t) {
                    e.finger = t, n(t);
                });
            });
        }
    }, {
        key: "getWxAuth",
        value: function() {
            var e = this;
            return new Promise(function(n, t) {
                wx.getSetting({
                    success: function(t) {
                        var o = function() {
                            d.default.on("getWxAuthEnd", function e(t) {
                                d.default.off("getWxAuthEnd", e), n(t);
                            }), e._navAfterLogin({
                                loginStep: 2
                            });
                        };
                        t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                n({
                                    userInfo: e.userInfo,
                                    code: 200,
                                    msg: "已微信授权,读取 userInfo 信息成功"
                                });
                            },
                            fail: function() {
                                o();
                            }
                        }) : o();
                    },
                    fail: function() {
                        t({
                            code: 500,
                            msg: "读取微信配置失败"
                        });
                    }
                });
            });
        }
    }, {
        key: "_navAfterLogin",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.redirectUrl, t = e.type, o = e.close, i = e.onlyAuth, d = e.loginStep, u = e.loginType;
            i = i ? 1 : 0, t = t || "", n = n ? encodeURIComponent(n) : "", d = d || "";
            var a = (f.default.getConfig("loginSchema") || "/pages/mobile/mobile") + "?onlyAuth=" + i + "&redirectUrl=" + n + "&type=" + t + "&env=" + this.env + "&loginStep=" + d + "&loginType=" + u;
            o ? wx.redirectTo({
                url: a
            }) : r.default.navigateTo({
                url: a
            });
        }
    }, {
        key: "_getDomain",
        value: function() {
            return this.domain;
        }
    }, {
        key: "_getNodeDomain",
        value: function() {
            return "https://maccount.dianping.com" == this.domain ? "https://m.dianping.com" : this.domain;
        }
    } ]), n;
}(), m = new I();

m.Login = I, exports.default = m;