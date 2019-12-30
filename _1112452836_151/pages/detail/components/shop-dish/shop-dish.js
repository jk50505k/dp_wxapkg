var a = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../components/mina_lazyload_img/index.js").initInComponent, i = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), n = {
    shopDishMVBid: "b_dianping_nova_shopdish_mv",
    dishListBid: "b_o7m768g1",
    singleDishBid: "b_ozguly4j"
};

Component({
    behaviors: [],
    properties: {
        hasApp: {
            type: Boolean,
            value: !1
        },
        dishData: {
            type: Object,
            observer: "_dishDataChange"
        },
        shopOptions: {
            type: Object
        },
        moduleConfig: {
            type: Object
        },
        canLaunchApp: {
            type: Boolean,
            value: !1,
            observer: "_canLaunchAppChange"
        },
        needLogin: {
            type: Boolean,
            value: !1
        },
        lxData: {
            type: Object
        }
    },
    data: {
        showModule: 1,
        imgClass: "width: 290rpx;height: 188rpx;border-radius: 14rpx;"
    },
    ready: function() {
        getApp().data._appLaunchCount || (getApp().data._appLaunchCount = 0);
    },
    moved: function() {},
    detached: function() {},
    methods: {
        shopAllDishTap: function() {
            a.lxmina.moduleClick(n.dishListBid, this.data.lxData);
            var t = this.data.moduleConfig && this.data.moduleConfig.gotoContact, i = void 0;
            try {
                i = JSON.parse(this.data.moduleConfig && this.data.moduleConfig.cardData);
                var o = JSON.parse(i && i.cardData), s = o.params;
                s && (s.id = this.data.shopOptions && (this.data.shopOptions.shopId || this.data.shopOptions.shopUuid), 
                o.params = s, i.cardData = JSON.stringify(o));
            } catch (a) {}
            if (t && i) return i.showPop = t, void this.setData({
                cardData: i
            });
            var e = this.data.dishData.recommendUrl;
            e && a.navigation.navigateTo({
                url: e,
                type: "h5"
            });
        },
        shopSingleDishTap: function(t) {
            var i = t.currentTarget.dataset.url;
            a.lxmina.moduleClick(n.singleDishBid, this.data.lxData), i && a.navigation.navigateTo({
                url: i,
                type: "h5"
            });
        },
        _dishDataChange: function(o) {
            var s = this;
            if (o && (o.dishTags && o.dishTags.length || o.tags && o.tags.length)) {
                var e = o.dishAppSchema + "&utm=" + ("c_1ilqz4n8:" + n.dishListBid + ":weixin:wxapp");
                o.dishTitle = "推荐菜", o.recommendTitle = "网友推荐", this.setData({
                    canLaunchApp: this.data.hasApp || this.data.canLaunchApp,
                    launchAppUrl: e,
                    showModule: 2,
                    dishData: o
                }, function() {
                    a.lxmina.moduleView(n.shopDishMVBid, s.data.lxData), i.log("shopdish launchAppUrl:", e), 
                    t(s);
                });
            } else this.setData({
                showModule: 0
            });
        },
        _canLaunchAppChange: function(a) {
            this.data.hasApp && this.setData({
                canLaunchApp: !0
            });
        },
        onHorizontalScroll: function() {
            this.triggerEvent("horizontalscroll");
        },
        launchAppError: function(a) {
            var t = this;
            i.log("推荐菜唤起app失败:" + JSON.stringify(a)), this.data.hasApp ? ++getApp().data._appLaunchCount >= 2 && wx.showToast({
                title: "没有找到大众点评APP哦\n快到手机应用商店下载吧",
                icon: "none",
                duration: 2e3
            }) : setTimeout(function() {
                t.shopAllDishTap();
            }, 1500);
        },
        launchAppTap: function() {
            console.log("推荐菜模块唤起点击"), a.lxmina.moduleClick(n.dishListBid, {
                from: "launchApp"
            }), this.triggerEvent("launchtap");
        }
    }
});