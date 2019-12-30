var e = require("../../npm/@dp/sparrow/index.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/@mtfe/wx-rc-finger/dist/finger.js")), i = require("../../npm/@dp/owl-wxapp/es6/index.js"), a = require("../../npm/@dp/logan-wxapp/build/wxlogan.js"), n = require("./param_check"), r = void 0, o = {
    webviewInfo: {},
    url: ""
};

Component({
    properties: {
        accountDomain: {
            type: String,
            value: "https://maccount.dianping.com"
        },
        initWebview: {
            type: Boolean,
            value: !1,
            observer: "initWebview"
        },
        openUrl: {
            type: Object,
            value: {}
        },
        tokenDomain: {
            type: String,
            value: "https://m.dianping.com"
        },
        appName: {
            type: String,
            value: ""
        },
        appVersion: {
            type: String,
            value: ""
        },
        tokenUrl: {
            type: String,
            value: "/wxmapi/redirect"
        },
        lxsdkParams: {
            type: String,
            value: ""
        }
    },
    data: {
        url: "",
        showArea: 0,
        loginConfig: {
            retry: 0,
            loginStep: 0,
            domain: "https://maccount.dianping.com",
            sourceType: 0,
            needLogin: !0,
            loginType: 1,
            onloginHandler: "loginHandler",
            cx: ""
        }
    },
    methods: {
        initWebview: function() {
            var e = this.data.openUrl.url;
            if (!e) {
                var t = "缺少url参数，即将跳转首页，当前参数：" + JSON.stringify(this.data.openUrl);
                return a.log("缺少url参数，即将跳转首页，当前参数：" + JSON.stringify(this.data.openUrl)), this.triggerEvent("webviewMsg", {
                    code: 301,
                    msg: t
                });
            }
            e = decodeURIComponent(e), a.log("webview即将打开H5页面：" + e), console.log("webview打开URL", e), 
            this.setData({
                url: e,
                loginConfig: Object.assign(this.data.loginConfig, {
                    domain: this.data.accountDomain
                })
            }), this.getCache(), wx.canIUse && wx.canIUse("web-view") ? (wx.showShareMenu({
                withShareTicket: !0
            }), o.url = e, this.injectURLParams(e)) : (i.owl.error.addError("当前微信版本过低，webview不能使用"), 
            wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
                success: function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            }));
        },
        injectURLParams: function(r, o) {
            var s = this;
            if (r) {
                var c = e.url.parseUrl(r), l = c.uri, d = c.query, w = c.hash, g = w;
                w = w || "wechat_redirect", d.utm_source || (d.utm_source = this.data.appName), 
                d.mina_name || (d.mina_name = this.data.appName), d.mina_version || (d.mina_version = this.data.appVersion), 
                d.__lxsdk_params = this.data.lxsdkParams || "";
                var p = e.url.stringify(l, d, w);
                if (n.checkParams(d)) a.log("webview开始注入参数"), n.needAuthLogin(d, o).then(function(r) {
                    r && r.params ? n.inject(r.params).then(function(t) {
                        if (101 === t.code) {
                            var i = t && t.msg || "打开异常", n = "参数注入未知错误";
                            t && t.msg && (n = t.msg);
                            var r = new Error(n);
                            s.handleException("注入参数失败", r, i);
                        } else 200 === t.code ? (p = s.shouldUpdateWebviewCookie() ? s.createWebviewSrcForCookie(l, t.params, g) : e.url.stringify(l, t.params, w), 
                        s.setWebviewSrc(p), a.log("参数注入成功,webviewSrc", p)) : s.handleException("注入参数失败", JSON.stringify(t));
                    }).catch(function(e) {
                        s.handleException("参数注入异常", e, "页面打开异常");
                    }) : t.default.g(function(e) {
                        e || i.owl.error.addError("webView getFigureFail", "cx is empty"), s.setData({
                            showArea: 1,
                            loginConfig: Object.assign(s.data.loginConfig, {
                                cx: e
                            })
                        });
                    });
                }).catch(function(e) {
                    s.handleException("webview打开异常", e, "页面打开异常，请重试");
                }); else try {
                    this.shouldUpdateWebviewCookie() && (p = this.createWebviewSrcForCookie(l, d, g)), 
                    a.log("webview注入参数后的webviewSrc", p), this.setWebviewSrc(p);
                } catch (e) {
                    this.handleException("打开异常，请重试", e);
                }
            }
        },
        handleException: function(e, t, n) {
            "string" == typeof t && (t = new Error(t)), i.owl.error.addError(e, t, !0), a.log("webview打开异常: " + e + (t && t.message)), 
            this.triggerEvent("webviewMsg", {
                code: 302,
                msg: n || e
            });
        },
        shouldUpdateWebviewCookie: function() {
            var t = e.login.getTokenSync();
            if (o.webviewInfo.token !== t) return this.setCache({
                token: t
            }), !0;
        },
        getCache: function() {
            try {
                var e = wx.getStorageSync("webview");
                e && this.setDataset({
                    webviewInfo: e
                });
            } catch (e) {}
        },
        setDataset: function(e) {
            o = Object.assign({}, o, e);
        },
        setCache: function(e) {
            try {
                var t = Object.assign({}, this.data.webviewInfo, e);
                this.setDataset({
                    webviewInfo: t
                }), wx.setStorageSync("webview", t);
            } catch (e) {}
        },
        loginHandler: function(t) {
            var i = t.detail;
            if (501 === i.code) return wx.showToast({
                title: "需要授权才能继续使用服务",
                icon: "none",
                duration: 2e3
            });
            if (502 === i.code) return wx.showToast({
                title: i.msg,
                icon: "none",
                duration: 2e3
            });
            if (i.isSuccess) {
                var a = i.token, n = i.openId;
                n && e.login.setOpenId(n), e.login.setToken(a), this.injectURLParams(o.url, a);
            } else {
                var r = i.errinfo || i.msg, s = getCurrentPages();
                s && s.length && (r += "。页面访问堆栈: ", s.forEach(function(e, t) {
                    r += t + 1 + ":" + e.route + "; ";
                }));
                var c = new Error(r);
                this.handleException("webviewloginFail", c, "登录失败");
            }
        },
        createWebviewSrcForCookie: function(t, i, a) {
            var n = e.login.getTokenSync(), r = e.url.stringify(t, i, a);
            return r = e.url.stringify(this.data.tokenDomain + this.data.tokenUrl, {
                appversion: this.data.appVersion,
                appname: this.data.appName,
                token: n || "",
                originalUrl: encodeURIComponent(r)
            });
        },
        setWebviewSrc: function(e) {
            r = Date.now(), a.log("webview即将打开H5页面：" + e), console.log("即将打开的webview===>,", e), 
            this.setData({
                url: e,
                showArea: 2
            });
        },
        messageHandler: function(e) {
            for (var t = e.detail.data || [], i = void 0, a = [], n = 0; n < t.length; n++) "share" === (i = t[n] || {}).action && a.push(i.data);
            this.triggerEvent("webviewMsg", {
                code: 200,
                type: "share",
                data: a
            });
        },
        loadHander: function(t) {
            var n = Date.now() - r, o = t && t.detail && t.detail.src || "";
            if (o.indexOf("mp.weixin.qq.com/mp/waerrpage") > -1) {
                var s = e.url.parseUrl(decodeURIComponent(o)), c = e.pageUtil.getPageRoutes(), l = e.pageUtil.getCurrentPage(), d = l && l.options && l.options.url, w = "appid:" + s.query.appid + ", domain:" + s.query.domain + ", routes:" + c.text + ", webviewUrl:" + decodeURIComponent(d);
                a.log("webviewDomainError:" + decodeURIComponent(d)), i.owl.error.addError("webviewDomainError", {
                    name: "不支持打开非业务域名",
                    msg: w,
                    level: "info"
                });
            }
            i.owl.resource.addApi({
                name: "webviewLoadStatus",
                statusCode: 200,
                responseTime: n
            });
        },
        errorHander: function(t) {
            var n = Date.now() - r;
            i.owl.resource.addApi({
                name: "webviewLoadStatus",
                statusCode: 500,
                responseTime: n
            });
            var o = e.pageUtil.getCurrentPage().route, s = t && t.detail && t.detail.src || "";
            a.log("webviewLoadError, pageurl: " + o + ", weburl: " + s);
        }
    }
});