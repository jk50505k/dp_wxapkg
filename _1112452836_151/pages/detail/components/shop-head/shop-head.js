var a = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), e = require("../../../../config/business").DEFAULT_PIC, i = require("../../../../components/mina_lazyload_img/index.js").initInComponent, o = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), r = {
    defaultPicBid: "b_x2m7sy95",
    headPicMVBid: "b_srlhh5cy"
};

Component({
    behaviors: [],
    properties: {
        shopHeadData: {
            type: Object,
            observer: "_headDataChange"
        },
        shopOptions: {
            type: Object
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        },
        needLogin: {
            type: Boolean,
            value: !1
        },
        canLaunchApp: {
            type: Boolean,
            value: !1
        },
        mapiError: {
            type: Object,
            value: {},
            observer: "_mapiErrorChange"
        },
        showAddToVoteBtn: {
            type: Boolean
        }
    },
    data: {
        bigPics: [],
        defaultPic: e,
        moreTxt: "查看更多",
        imgClass: "width: 290rpx;height: 212rpx;border-radius: 14rpx;"
    },
    ready: function() {
        var t = this;
        a.wxp.getSystemInfo().then(function(a) {
            a && a.platform && "android" === a.platform && t.setData({
                isAndroid: !0,
                moreTxt: "点击查看更多"
            });
        }).catch(function() {
            console.log("获取手机系统信息失败");
        });
    },
    moved: function() {},
    detached: function() {},
    methods: {
        defaultPicTap: function() {
            var t = this.data.lxData || {};
            if (t.picMode = this.data.headData && this.data.headData.shopStyle && this.data.headData.shopStyle.picMode, 
            t.picMode && "bigpic" !== t.picMode && a.lxmina.moduleClick(r.defaultPicBid, t), 
            this.data.shopOptions && (this.data.shopOptions.shopId || this.data.shopOptions.shopUuid)) {
                var e = this.data.shopOptions, i = e.shopId, o = e.shopUuid, s = {
                    shopName: this.data.headData.name
                };
                this.data.headData.showPics && (o ? s.shopUuid = o : s.shopId = i, a.navigation.navigateTo({
                    url: a.url.stringify("/packages/ugc/pages/shopalbum/shopalbum", s)
                }));
            }
        },
        previewShopPic: function(t) {
            var e = t.currentTarget.dataset.index, i = this.data.headData.advancedPics;
            i = i.map(function(a) {
                return a.url;
            }), wx.previewImage({
                urls: i,
                current: i[e]
            });
            var o = this.data.lxData || {};
            o.picMode = this.data.headData && this.data.headData.shopStyle && this.data.headData.shopStyle.picMode, 
            a.lxmina.moduleClick(r.defaultPicBid, o);
        },
        _headDataChange: function(t) {
            var e = this;
            if (t && t.doFetch) {
                var s = "c_1ilqz4n8:" + r.defaultPicBid + ":weixin:wxapp", n = "dianping://ugcshopphoto?albumtype=1&shopid=" + (t.id || t.shopuuid) + "&utm=" + s;
                t.picCount && t.picCount > 1 && (t.showPics = !0);
                var d = void 0;
                try {
                    d = JSON.parse(t.shopStyle || ""), t.shopStyle = d;
                } catch (a) {
                    console.log("shopStyle parse error: ", t.shopStyle);
                }
                if (d && "bigpic" == d.picMode) {
                    var h = t.advancedPics && t.advancedPics.length ? t.advancedPics : [ {
                        url: t.defaultPic,
                        picLoad: !0
                    } ];
                    h = h.map(function(a, t) {
                        var i = e.data.picIndex || 2;
                        return a.picLoad = t < i, a;
                    }), this.setData({
                        bigPics: h || []
                    });
                }
                t.voteTotal = t.voteTotal ? parseInt(t.voteTotal) + "条" : "";
                var c = !(t.scoreText && t.scoreText.length > 21);
                c || (c = !((t.regionName ? t.regionName.length : 0) + (t.categoryName ? t.categoryName.length : 0) > 7)), 
                t.showRegion = c, this.setData({
                    hasLoad: !0,
                    headData: t,
                    launchAppUrl: n
                }, function() {
                    o.log("shophead launchAppUrl:", n), i(e), e.intersectionObserver();
                });
                var p = this.data.lxData || {};
                p.picMode = this.data.headData && this.data.headData.shopStyle && this.data.headData.shopStyle.picMode, 
                a.lxmina.moduleView(r.headPicMVBid, p);
            }
            t && t.fromListCache && this.setData({
                headData: t,
                bigPics: t.bigPics || []
            });
        },
        intersectionObserver: function() {
            var a = this, t = this.observer;
            try {
                t || (t = this.createIntersectionObserver({}).relativeToViewport(), this.observer = t), 
                this.haveObserved || (t.observe(".shop-head", function(t) {
                    t && t.intersectionRatio <= 0 ? a.triggerEvent("headhide") : a.triggerEvent("headshow");
                }), this.haveObserved = !0);
            } catch (a) {
                o.log("Observer 失败:", a);
            }
        },
        bindchange: function(a) {
            var t = a.detail.current;
            if (t && this.data.headData.advancedPics[t + 1]) {
                var e = this.data.bigPics;
                e[t + 1].picLoad = !0, this.setData({
                    bigPics: e,
                    picIndex: t + 2 || 1
                });
            }
        },
        scrollToRight: function(a) {
            var t = this;
            a.detail && "right" === a.detail.direction && (this.scrollTrigger || (this.defaultPicTap(), 
            this.scrollTrigger = !0, setTimeout(function() {
                t.scrollTrigger = !1;
            }, 500)));
        },
        _mapiErrorChange: function(a) {
            a && a.isError && this.setData({
                mapiError: a
            });
        },
        mapiErrorHandler: function() {
            this.triggerEvent("handleReLoad", "mapiError");
        },
        onHorizontalScroll: function() {
            this.triggerEvent("horizontalscroll");
        },
        launchAppError: function(a) {
            var e = this;
            o.log("头图模块唤起app失败:" + JSON.stringify(a)), this.data.moduleConfig && this.data.moduleConfig.openOwl && t.owl.error.addError("头图模块唤起app失败:" + a && a.detail && a.detail.errMsg), 
            setTimeout(function() {
                e.defaultPicTap();
            }, 1500);
        },
        launchAppTap: function() {
            console.log("头图模块唤起点击"), a.lxmina.moduleClick(r.defaultPicBid, {
                from: "launchApp"
            }), this.triggerEvent("launchtap");
        },
        addToVote: function(a) {
            this.triggerEvent("addToVote");
        }
    }
});