function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var n = require("../../npm/@dp/sparrow/index.js"), e = require("../../npm/@dp/owl-wxapp/es6/index.js"), t = a(require("../../npm/@dp/logan-wxapp/build/wxlogan.js")), o = a(require("../../utils/shopid"));

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        launchAppUrl: {
            type: String,
            observer: "appUrlChange"
        },
        failLaunchUrl: {
            type: String
        },
        appConfig: {
            type: Object
        },
        canLaunchApp: {
            type: Boolean
        },
        hasApp: {
            type: Boolean
        },
        needLogin: {
            type: Boolean,
            value: !1
        },
        errorParams: {
            type: Object
        }
    },
    data: {},
    methods: {
        launchAppError: function(a) {
            if (t.default.log("app-launch:唤起app失败" + JSON.stringify(a) + "是否有app? " + this.data.hasApp), 
            this.data.hasApp || wx.showToast({
                title: "没有找到大众点评APP哦\n快到手机应用商店下载吧",
                icon: "none",
                duration: 2e3
            }), e.owl.resource.addApi({
                name: "owl_appLaunchComponent",
                statusCode: 500,
                content: a && a.detail && a.detail.errMsg || ""
            }), this.data.failLaunchUrl) n.navigation.navigateTo({
                url: this.data.failLaunchUrl
            }); else {
                var o = this.data.errorParams;
                this.triggerEvent("launcherror", o);
            }
        },
        launchAppTap: function() {
            e.owl.resource.addApi({
                name: "owl_appLaunchComponent",
                statusCode: 200
            }), console.log("点击唤起app"), this.triggerEvent("launchtap");
        },
        loginTap: function() {
            console.log("点击唤起登录"), n.login.ensure().then(function(a) {
                a && a.token && (n.lxmina.moduleClick("b_dianping_nova_chj9k7bu_mc"), console.log("applaunch--登录成功"), 
                t.default.log("applaunch--登录成功"));
            }).catch(function(a) {
                n.lxmina.moduleClick("b_dianping_nova_5ym7aohk_mc"), t.default.log("applaunch--登录失败" + JSON.stringify(a)), 
                console.log("applaunch--登录失败");
            });
        },
        appUrlChange: function(a) {
            var n = this;
            o.default.checkUrlUuid(a).hasUuid && o.default.transferShopId(a, "mina-app-launch").then(function(a) {
                n.setData({
                    launchAppUrl: a
                });
            });
        }
    }
});