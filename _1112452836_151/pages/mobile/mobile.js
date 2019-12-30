var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/owl")), n = require("../../npm/@dp/sparrow/index.js"), o = require("../../common/event"), i = require("../../public/url"), t = require("../../common/wxp"), r = require("../../public/logan"), a = n.login, d = n.semver, g = n.env, l = void 0, s = void 0, c = void 0, u = {
    data: {
        isSupportComponent: !0
    },
    onLoad: function() {
        var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        l = getApp(), s = !1, r.log("Mobile: 打开Mobile页");
        var o = n.onlyAuth;
        c = 2 != n.loginStep, o ? this.renderPanel(n) : a.niceToHave().then(function(o) {
            r.log("Mobile: Mobile页走 niceToHave 静默登录: " + JSON.stringify(o)), o && 200 === o.code ? e.loginRedict({
                token: o.token,
                openId: o.openId
            }, n) : e.renderPanel(n);
        }).catch(function(o) {
            e.renderPanel(n), l.log("Login fail" + o.message);
        });
    },
    onShow: function() {
        wx.setNavigationBarTitle({
            title: c ? "登录" : "微信授权"
        });
    },
    renderPanel: function(n) {
        var o = this, i = n.redirectUrl, t = n.type, r = n.loginType, l = void 0, s = !0;
        try {
            l = wx.getSystemInfoSync();
        } catch (e) {
            console.log(e);
        } finally {
            l && l.SDKVersion && (s = 1 === d.compare(l.SDKVersion, "1.6.3"));
        }
        this.setData({
            isSupportComponent: s,
            type: t || "",
            redirectUrl: i || "",
            options: n
        });
        var c = g.get() === g.ENV_PRODUCT ? "https://maccount.dianping.com" : "https://m.51ping.com", u = a.getOpenIdSync(), p = {
            thirdUidInfo: a.getThirdUidInfo(),
            retry: 0,
            loginStep: parseInt(n.loginStep || 1, 10),
            domain: c,
            sourceType: 0,
            needLogin: !0,
            loginType: r || 1,
            needMerge: !0,
            onloginHandler: "loginHandler"
        };
        u ? p.openId = u : a.getOpenId().then(function(e) {
            p.openId = e.openId;
        }), s ? getApp().getFigure().then(function(n) {
            p.cx = n, n || e.default.error.addError("getFigureFail", "cx is empty"), o.setData({
                loginConfig: p
            });
        }) : wx.showToast({
            title: "当前微信版本可能过低，请您升级!",
            icon: "none",
            duration: 3e3
        });
    },
    loginRedict: function(e, n) {
        var o = void 0;
        if (n && n.redirectUrl && (o = decodeURIComponent(n.redirectUrl)), e.token) {
            this.setData({
                isLogin: !0
            });
            var i = l.getOpenId();
            i || (i = e.openId), "h5" === n.type && o ? this.goToWebView(o, e.token, i) : o ? wx.redirectTo({
                url: o
            }) : wx.navigateBack({
                delta: 1
            });
        } else e.thirdUid ? (this.setData({
            thirdUser: e
        }), o ? wx.redirectTo({
            url: o
        }) : wx.navigateBack({
            delta: 1
        })) : (wx.showToast({
            title: n.msg || "登录失败，请稍后重试",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
        }, 2e3));
    },
    loginHandler: function(n) {
        r.log("Mobile: Mobile页进入 loginHandler 事件: " + JSON.stringify(n));
        var i = n.detail;
        if (501 === i.code) return t.showToast({
            title: "需要授权才能继续使用服务",
            icon: "none",
            duration: 2e3
        });
        if (502 === i.code) return t.showToast({
            title: i.msg,
            icon: "none",
            duration: 2e3
        });
        if (300 === i.code) return o.trigger("getWxAuthEnd", {
            code: 200,
            userInfo: i.userInfo,
            msg: i.msg
        }), s = !0, void wx.navigateBack({
            delta: 1
        });
        if (i.isSuccess) {
            var a = i.token, d = i.tempLogin;
            d = !!d;
            var g = i.openId || l.getOpenId();
            l.setOpenId(g), l.setToken(a), o.trigger("loginEnd", {
                isSuccess: !0,
                token: a,
                openId: g,
                tempLogin: d
            }), s = !0, d && e.default.error.addError("tempLogin", {
                name: "登录",
                msg: "已启用降级登录方案",
                level: "info"
            });
        } else {
            var c = i.errinfo || i.msg, u = getCurrentPages();
            u && u.length && (c += "。页面访问堆栈: ", u.forEach(function(e, n) {
                c += n + 1 + ":" + e.route + "; ";
            })), e.default.error.addError("loginFail", c, !0), o.trigger("loginEnd", {
                isSuccess: !1,
                msg: "登陆失败"
            }), s = !0;
        }
        this.loginRedict({
            token: i.token,
            openId: i.openId
        }, Object.assign({}, this.data.options, {
            msg: i.msg && i.msg.showMsg
        }));
    },
    goToWebView: function(e, n, o) {
        var t = i.parse(e), r = t.uri, a = t.query, d = t.hash;
        (a = a || {}).token = n || l.getToken(), a.openId = o || l.getOpenId();
        var g = i.stringify(r, a, d);
        console.log("mobilePage page redirect:", g), wx.redirectTo({
            url: "/pages/webview/webview?url=" + encodeURIComponent(g)
        });
    },
    onUnload: function() {
        if (r.log("Mobile: Mobile页面卸载 onUnload 事件: " + JSON.stringify(this.data)), !s) {
            o.trigger("loginEnd", {
                isSuccess: !1,
                code: 500,
                msg: "用户已取消"
            }), e.default.error.addError("cancelLogin", {
                name: "登录",
                msg: "用户已取消",
                level: "info"
            });
        }
    }
};

Page(u);