var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("./npm/@dp/sparrow/index.js"), n = require("./npm/@dp/owl-wxapp/es6/index.js"), o = require("./utils/lbs-report"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./npm/@mtfe/wxapp-rohr/dist/rohr.js")), i = require("./config/index"), a = require("./utils/compose"), s = require("./common/global"), c = require("./utils/lx_wrap"), p = require("./utils/extend"), u = require("./common/pinkie"), g = require("./public/logan"), l = require("./utils/scene");

require("./public/proxyadapter"), global && void 0 === global.Promise && (global.Promise = u);

var d = {
    name: "大众点评",
    version: "1.0.0",
    store: {},
    debug: i.DEBUG,
    isStart: !1,
    isCookieInValid: !1
};

!function() {
    var e = require("./npm/@mtfe/dynamic/config").default;
    e.project = "dpweapp", e.injections = {
        sparrow: require("./npm/@dp/sparrow/index.js"),
        owl: require("./npm/@dp/owl-wxapp/es6/index.js").owl,
        LX: require("./public/lx-analytics"),
        config: require("./config/index"),
        Logan: require("./npm/@dp/logan-wxapp/build/wxlogan.js"),
        lazyload: require("./components/mina_lazyload_img/index.js")
    }, r.config.setConfig({
        appid: "wx734c1ad7b3562129",
        appname: i.APP_NAME,
        appversion: i.VERSION,
        sourceType: 0,
        tabBars: [ "pages/index/index", "pages/group/group", "pages/ranklist/ranklist", "pages/my/my" ]
    });
}(), t.default.i(100);

var f = {
    data: p({}, d),
    onError: function(e) {
        this.loganOnError(e);
    },
    onLaunch: function(e) {
        try {
            try {
                g.log("App onLaunch:" + JSON.stringify(e));
            } catch (e) {}
            this.startOwl(), this.requestManager(), this.doCache(), this.updateManager(), this.initLx(e), 
            this.onMemoryWarning(), this.setDebug(), r.geo.onLocationChange(o.reportLBS, 500);
        } catch (e) {
            g.log("owl启动失败:" + JSON.stringify(e));
        }
    },
    onShow: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        g.log("App onShow:" + JSON.stringify(e) + "--\x3e minaVersion:" + i.VERSION), this.setWebviewCookieState(!0), 
        this.setShowOptions(e), c.setUTM(e, {
            39: "wechat_search",
            75: "enjoy_search",
            76: "beauty_seatch"
        });
        try {
            if (e.query && e.query.scene) {
                var r = l.parse(e.query.scene);
                c.setUTM({
                    query: r
                });
            }
        } catch (e) {
            g.log("onShow-Scene-fail" + e.toString());
        }
        c.start();
    },
    onHide: function() {
        g.log("App onHide"), c.quit();
    },
    onPageNotFound: function(e) {
        try {
            e.isEntryPage ? r.navigation.redirectTo({
                url: "/pages/index/index"
            }) : wx.showModal({
                content: "对不起，你访问的页面不存在",
                cancelText: "返回",
                confirmText: "去首页",
                success: function(e) {
                    e.confirm ? r.navigation.redirectTo({
                        url: "/pages/index/index"
                    }) : r.navigation.navigateBack();
                }
            });
        } catch (r) {
            n.owl.error.addError("pageFoundError:", {
                name: "pageFoundError",
                msg: JSON.stringify(e)
            }, !0);
        }
    },
    updateManager: function() {
        try {
            var e = wx.getSystemInfoSync();
            if (e && r.semver.compare(e.SDKVersion, "1.9.90") >= 0) {
                var o = wx.getUpdateManager();
                o.onCheckForUpdate(function(e) {
                    g.log("小程序校验更新：" + e.hasUpdate);
                }), o.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(e) {
                            e.confirm ? (g.log("用户：" + e.hasUpdate), o.applyUpdate()) : g.log("小程序请求更新是否成功：" + e.hasUpdate);
                        }
                    });
                }), o.onUpdateFailed(function(e) {
                    try {
                        n.owl.error.addError("更新小程序失败", JSON.stringify(e && e.message));
                    } catch (e) {}
                    wx.showModal({
                        content: "更新小程序失败，请关闭后重试",
                        icon: "none"
                    });
                });
            }
        } catch (e) {
            n.owl.error.addError("小程序更新异常:", e);
        }
    },
    loganOnError: function(e) {
        try {
            var r = void 0;
            e instanceof Error ? r = e.toString() : e instanceof String && (r = e), g.log(r);
        } catch (e) {
            g.log(e.toString());
        }
    },
    startOwl: function() {
        var e = i.APP_NAME;
        n.owl.start({
            project: e,
            devMode: !1,
            wxAppVersion: i.VERSION,
            page: {
                sample: .1
            }
        }), r.event.on("_openId_", function(e) {
            try {
                n.owl.cfgManager.update("unionId", e);
            } catch (e) {
                g.log(e.toString());
            }
        });
    },
    requestManager: function() {
        try {
            r.request.use({
                type: "response",
                resolve: function(r) {
                    var o = r.response, t = r.request;
                    try {
                        if (o) {
                            if ("object" !== e(o.data)) try {
                                g.log("接口" + t.url + "返回数据格式不是JSON对象: " + JSON.stringify(o.data)), n.owl.error.addError("接口响应异常", new Error("接口" + t.url + "返回数据格式不是JSON对象"));
                            } catch (e) {}
                            if (200 == o.statusCode) if (o.data.code) {
                                if (0 !== o.data.code.toString().indexOf(2)) {
                                    var i = t.data || {}, a = "业务状态码异常: " + t.url + ",参数: " + JSON.stringify(i) + "响应: " + JSON.stringify(o);
                                    console.error(a), g.log(a);
                                }
                            } else {
                                var s = t.url;
                                /https:\/\/m.(dianping|51ping).com\/wxmapi\//.test(s) ? console.error("接口不符合sparrow.request规范，接口" + s) : console.warn("建议使用sparrow.request组件要求的接口规范，接口" + s);
                            } else g.log("网络状态码异常" + o.statusCode + "：" + t.url);
                        } else g.log("URL响应异常： " + t.url + " 的response为空");
                    } catch (e) {
                        g.log(e.toString());
                    }
                    return r;
                },
                reject: function(e) {
                    return Promise.reject(e);
                }
            });
        } catch (e) {
            g.log(e.toString());
        }
    },
    doCache: function() {
        try {
            var e = void 0;
            try {
                r.login.verifyToken().then(function(e) {
                    g.log("App onLaunch token 校验:" + JSON.stringify(e));
                }), e = r.appEntry.getCacheSync();
            } catch (e) {
                g.log(e.toString());
            } finally {
                e && e.openId || r.login.getOpenId(), (0, o.reportLBS)();
            }
        } catch (e) {
            n.owl.error.addError("appOnLaunch", e);
        }
    },
    initLx: function(e) {
        c.init({
            appnm: "dianping_wxapp",
            rtnm: "dianping_mina",
            category: "dianping_nova",
            minaVersion: i.VERSION,
            utm_source: "dianping-wxapp"
        }), c.setEnv(), c.setUTM(e);
    },
    onMemoryWarning: function() {
        try {
            wx.onMemoryWarning(function(e) {
                g.log("MemoryWarning:" + JSON.stringify(e));
            });
        } catch (e) {}
    },
    setDebug: function() {
        try {
            if (i.DEBUG) {
                var e = wx.getStorageSync("debug");
                e && "test" === e.env && wx.clearStorageSync();
            }
        } catch (e) {
            g.log("设置debug信息有误");
        }
    }
};

f = a(f, s), (0, n.app)((0, r.appBase)(f));