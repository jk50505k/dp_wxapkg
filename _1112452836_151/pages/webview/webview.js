var e = require("../../npm/@dp/sparrow/index.js"), a = require("../../utils/npm/owl/index"), t = require("../../config/index"), i = require("../../utils/lx_wrap"), n = {
    pageCid: "c_lplpry3i"
};

(0, a.page)({
    data: {
        lxParas: ""
    },
    onLoad: function(e) {
        var a = {
            initWebview: !0,
            accountDomain: t.ACCOUNT_DOMIAN,
            tokenDomain: t.DOMAIN,
            tokenUrl: t.API.WRITE_TOKEN,
            openUrl: e,
            appName: t.APP_NAME,
            appVersion: t.VERSION,
            webviewHandler: "webviewHandler"
        };
        this.setData({
            webviewInfo: a,
            lxParas: i.collectParamsToWeb(!0)
        });
    },
    webviewHandler: function(a) {
        if (a && a.detail) {
            var t = a.detail;
            200 == t.code && "share" == t.type && this.setData({
                shareMsgList: t.data
            }), 301 == t.code && e.navigation.navigateTo({
                url: "/pages/index/index"
            }), 302 == t.code && wx.showToast({
                icon: "none",
                title: t.msg,
                duration: 4e3,
                complete: function() {
                    var a = getCurrentPages();
                    a && a.length > 1 ? e.navigation.navigateBack({
                        delta: 1
                    }) : e.navigation.navigateTo({
                        url: "/pages/index/index"
                    });
                }
            });
        }
    },
    onShow: function() {
        this.setData({
            lxParas: i.collectParamsToWeb(!0)
        }), i.pageView(n.pageCid);
    },
    onShareAppMessage: function(a) {
        var t = a.webViewUrl;
        if (t) {
            t = decodeURIComponent(t).split("#")[0];
            for (var n = this.data.shareMsgList || [], r = void 0, o = n.length - 1; o >= 0; o--) if ((r = n[o].uri) && (r = decodeURIComponent(r).split("#")[0]) == t) {
                var s = n[o].path;
                return /^(https?)/.test(s) ? (s = encodeURIComponent(s), n[o].path = "/pages/webview/webview?url=" + s) : s || (n[o].path = "/pages/index/index"), 
                n[o].path = i.getSharePath(e.url.stringify(n[o].path)), n[o];
            }
            return {
                title: "大众点评，发现品质生活",
                path: i.getSharePath("/pages/index/index"),
                imageUrl: "https://p0.meituan.net/wxfood/e52c099a5aa0fb99f7418b9c4ac5dbbc10189.jpg"
            };
        }
    }
});