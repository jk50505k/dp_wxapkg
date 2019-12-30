var e = require("../../npm/@dp/sparrow/index.js"), a = require("../mina_lazyload_img/index.js").initInComponent, i = require("../../common/nav"), t = {
    photoBid: "b_6j5z6xfa",
    reviewMVBid: "b_dianping_nova_b_0vfknrak_mv",
    reviewBid: "b_0vfknrak",
    personalBid: "b_7l0ayuo7"
};

Component({
    behaviors: [],
    properties: {
        reviewList: {
            type: Object,
            vaule: {},
            observer: "_reviewListChange"
        },
        config: {
            type: Object,
            vaule: {}
        },
        reviewBid: {
            type: String
        },
        lxData: {
            type: Object
        },
        showReviewBottom: {
            type: Number,
            value: 0
        },
        shopId: {
            type: Number
        },
        shopUuid: {
            type: String
        },
        pageName: {
            type: String
        },
        shopOptions: {
            type: Object
        },
        lastReview: {
            type: Boolean
        },
        needLogin: {
            type: Boolean,
            value: !1
        },
        canLaunchApp: {
            type: Boolean,
            value: !1,
            observer: "_canLaunchAppChange"
        },
        hasApp: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        imgClass: "width: 160rpx;height: 160rpx;margin-right: 10rpx;border-radius: 6rpx;"
    },
    ready: function() {
        getApp().data._appLaunchCount || (getApp().data._appLaunchCount = 0);
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _reviewListChange: function(i) {
            var n = this;
            if (i) {
                var r = "c_1ilqz4n8:" + t.reviewBid + ":weixin:wxapp", p = i.reviewId, o = "width: 160rpx;height: 160rpx;margin-right: 10rpx;border-radius: 6rpx;";
                1 == i.length && (o = "width: 280rpx;height: 280rpx;border-radius: 12rpx;"), this.setData({
                    launchAppUrl: "dianping://feeddetail?mainid=" + p + "&type=1&styletype=1&utm=" + r,
                    imgClass: o,
                    canLaunchApp: this.data.hasApp || this.data.canLaunchApp
                }, function() {
                    e.lxmina.moduleView(t.reviewMVBid, n.data.lxData), a(n);
                });
            }
        },
        previewImage: function(a) {
            var n = a.target.dataset.id, r = this.data.reviewList.reviewPics, p = r[n];
            e.lxmina.moduleClick(t.photoBid, this.data.lxData), p && "video" == p.type ? i({
                url: "/packages/video-preview/pages/index/index?video=" + p.videoUrl
            }) : (r = r.map(function(e) {
                return e.bigurl;
            }), wx.previewImage({
                urls: r,
                current: r[n]
            }), this.triggerEvent("previewImage"));
        },
        jumpToDetail: function(a) {
            var i = a.currentTarget.dataset, n = i.review, r = i.url;
            this.gotoReviewDetail(n, r), e.lxmina.moduleClick(t.reviewBid, this.data.lxData);
        },
        gotoReviewDetail: function(e, a) {
            !a && e && (a = e.detailUrl || ""), i({
                url: a
            });
        },
        navToPersonal: function() {
            var a = this.data, n = a.reviewList, r = a.pageName, p = a.lxData, o = n.userId, s = n.anonymous, d = n.platform;
            s || 2 === d || o <= 0 || (i({
                url: "/packages/user/pages/personal/personal?offuserId=" + o + "&msource=" + r
            }), e.lxmina.moduleClick(t.personalBid, p));
        },
        launchAppError: function(e) {
            var a = this;
            if (this.data.hasApp) ++getApp().data._appLaunchCount >= 2 && wx.showToast({
                title: "没有找到大众点评APP哦\n快到手机应用商店下载吧",
                icon: "none",
                duration: 2e3
            }); else {
                var i = e.detail.reviewid;
                setTimeout(function() {
                    a.gotoReviewDetail(i);
                }, 1500);
            }
        },
        launchAppTap: function() {
            console.log("单条评论模块唤起点击"), e.lxmina.moduleClick(t.reviewBid, {
                from: "launchApp"
            }), this.triggerEvent("launchtap");
        },
        _canLaunchAppChange: function(e) {
            this.data.hasApp && this.setData({
                canLaunchApp: !0
            });
        }
    }
});