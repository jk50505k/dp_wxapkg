var e = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var o = arguments[n];
        for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t]);
    }
    return e;
}, n = require("../../npm/@dp/sparrow/index.js"), o = require("../../npm/@dp/owl-wxapp/es6/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/@dp/logan-wxapp/build/wxlogan.js")), r = [ "openId", "token", "wxOpenGroupId", "cityId", "cityid", "longitude", "latitude" ], i = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = {
        longitude: "",
        latitude: ""
    };
    return "*" === e.latitude || "*" === e.longitude ? new Promise(function(e) {
        n.geo.getLocationNoReject().then(function(n) {
            n && n.latitude ? (o.latitude = n.latitude, o.longitude = n.longitude, e({
                code: 200,
                params: o
            })) : e({
                code: 200,
                params: o
            });
        }).catch(function(n) {
            console.log("getLocation paramInject err:", n), e({
                code: 200,
                params: o
            });
        });
    }) : Promise.resolve({
        code: 200,
        params: o
    });
}, a = {
    token: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = {
            token: ""
        };
        return new Promise(function(t) {
            "!" === e.token ? n.login.ensure().then(function(e) {
                e && e.token ? (o.token = e.token, o.openId = e.openId, t({
                    code: 200,
                    params: o
                })) : t({
                    code: 101,
                    params: o,
                    msg: "账号登录失败"
                });
            }).catch(function(e) {
                console.log("getToken FAIL:", e), t({
                    code: 101,
                    params: o,
                    msg: "账号登录失败"
                });
            }) : "*" === e.token ? n.login.getUserInfo().then(function(e) {
                e && e.token ? (o.token = e.token, o.openId = e.openId, t({
                    code: 200,
                    params: o
                })) : t({
                    code: 200,
                    params: o
                });
            }) : t({
                code: 200,
                params: o
            });
        });
    },
    openId: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = {};
        return new Promise(function(i) {
            n.login.getUserInfo().then(function(a) {
                a && a.openId ? (r.openId = a.openId || "", i({
                    code: 200,
                    params: r
                }), t.default.log("LoginAPI.getUserInfo注入openId参数成功", JSON.stringify(r))) : "!" === e.token ? i({
                    code: 200,
                    params: r
                }) : "!" === e.openId ? n.login.getOpenId().then(function(e) {
                    e.openId ? r.openId = e.openId || "" : (o.owl.error.addError("LoginAPI.getOpenId()注入openId失败:", JSON.stringify(e)), 
                    t.default.log("LoginAPI.getOpenId()注入openId失败", JSON.stringify(r))), i({
                        code: 200,
                        params: r
                    });
                }).catch(function(e) {
                    console.log("getOpenId FAIL:", e), t.default.log("微信登陆失败，注入openId失败", JSON.stringify(r)), 
                    i({
                        code: 101,
                        params: r,
                        msg: "微信登陆失败"
                    });
                }) : i({
                    code: 200,
                    params: r
                });
            });
        });
    },
    wxOpenGroupId: function() {
        var e = {
            wxOpenGroupId: ""
        };
        if ("*" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).wxOpenGroupId) {
            var o = getApp().getShowOptions().shareTicket;
            return n.share.getOpenGroupId(o).then(function(n) {
                return n && n.openGId ? (n.openGId && (e.wxOpenGroupId = n.openGId), Promise.resolve({
                    code: 200,
                    params: e,
                    msg: n.msg
                })) : Promise.resolve({
                    code: 200,
                    params: e
                });
            }).catch(function(n) {
                return Promise.resolve({
                    code: 101,
                    params: e,
                    msg: !!n && n.msg
                });
            });
        }
        return Promise.resolve({
            code: 200,
            params: e
        });
    },
    cityId: function() {
        var e = {
            cityId: ""
        };
        return "*" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).cityId ? new Promise(function(o) {
            n.geo.getCity().then(function(n) {
                n && n.cityId ? (e.cityId = n.cityId, o({
                    code: 200,
                    params: e
                })) : o({
                    code: 200,
                    params: e
                });
            }).catch(function(n) {
                console.log("getCityId paramInject err:", n), o({
                    code: 200,
                    params: e
                });
            });
        }) : Promise.resolve({
            code: 200,
            params: e
        });
    },
    cityid: function() {
        var e = {
            cityid: ""
        };
        return "*" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).cityid ? new Promise(function(o) {
            n.geo.getCity().then(function(n) {
                n && n.cityId ? (e.cityid = n.cityId, o({
                    code: 200,
                    params: e
                })) : o({
                    code: 200,
                    params: e
                });
            }).catch(function(n) {
                console.log("getCityId paramInject err:", n), o({
                    code: 200,
                    params: e
                });
            });
        }) : Promise.resolve({
            code: 200,
            params: e
        });
    },
    longitude: i,
    latitude: i
};

module.exports = {
    inject: function(n) {
        if (n) {
            var t = e({}, n);
            return new Promise(function(e) {
                var r = {
                    code: 200
                }, i = [];
                Object.keys(a).map(function(e) {
                    if (n.hasOwnProperty(e) && ("*" === n[e] || "!" === n[e])) {
                        var o = a[e](n);
                        -1 === i.indexOf(o) && i.push(o);
                    }
                }), Promise.all(i).then(function(n) {
                    var i = !1;
                    n.map(function(e) {
                        e && 200 === e.code ? t = Object.assign({}, t, e.params || {}) : (r.code = 101, 
                        r.msg = e.msg, i = !0);
                    }), i && o.owl.error.addError("webview参数异常统计", JSON.stringify(n), !0), r.params = t, 
                    e(r);
                });
            });
        }
    },
    needAuthLogin: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments[1], t = {
            needLogin: !1
        };
        return new Promise(function(r) {
            if (o) e.token = o, e.openId = n.login.getOpenIdSync() || n.login.getOpenIdCacheSync(), 
            t.params = e, r(t); else if ("!" === e.token) {
                var i = n.login.getTokenSync();
                i ? n.login.parseToken(i).then(function(o) {
                    200 == o.code ? (e.token = i, e.openId = n.login.getOpenIdSync() || n.login.getOpenIdCacheSync(), 
                    t.params = e, r(t)) : (t.needLogin = !0, r(t));
                }) : (t.needLogin = !0, r(t));
            } else t.params = e, r(t);
        });
    },
    checkParams: function(e) {
        return r.some(function(n) {
            return e.hasOwnProperty(n) && ("*" == e[n] || "!" == e[n]);
        });
    }
};