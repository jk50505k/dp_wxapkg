var e = require("../../utils/npm/lx-analytics"), i = require("../../common/nav"), t = require("../../public/logan"), a = {
    reviewTagBid: "b_qminz5z8",
    reviewAllBid: "b_4sho1bz2"
};

Component({
    behaviors: [],
    properties: {
        pageName: {
            type: String
        },
        reviewTags: {
            type: Array
        },
        reviewCount: {
            type: Number
        },
        launchAppUrl: {
            type: String
        },
        hitTag: {
            type: String
        },
        moduleConfig: {
            type: Object,
            value: {
                headJump: !0,
                showHead: !0
            }
        },
        lxData: {
            type: Object
        },
        isAndroid: {
            type: Boolean
        },
        isList: {
            type: Boolean
        },
        shopOptions: {
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
        showRightArrow: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        reviewTagAction: function(t) {
            var o = this.data, p = o.pageName, n = o.shopOptions, r = o.lxData;
            if (e.moduleClick(a.reviewTagBid, r), "detail" === p) {
                var l = t.currentTarget.dataset, s = l.keyword, d = l.type, u = l.hit, h = void 0;
                n && n.shopUuid && (h = "shopUuid=" + n.shopUuid), n && n.shopId && (h = "shopId=" + n.shopId), 
                h && i({
                    url: "/packages/ugc/pages/reviewlist/reviewlist?" + h + "&msource=wxappmain&hit=" + u + "&tagType=" + d + "&tag=" + encodeURIComponent(s)
                });
            } else this.triggerEvent("reviewTagAction", t);
        },
        allReviewTap: function() {
            this.triggerEvent("clickAllReview");
            var t = this.data, o = t.pageName, p = t.moduleConfig, n = p && p.headJump;
            if ("detail" === o || n) if (this.data.moduleConfig.gotoContact) this.triggerEvent("allReviewTap"); else {
                e.moduleClick(a.reviewAllBid, this.data.lxData);
                var r = void 0, l = this.data.shopOptions;
                l && l.shopUuid && (r = "shopUuid=" + l.shopUuid), l && l.shopId && (r = "shopId=" + l.shopId), 
                r && i({
                    url: "/packages/ugc/pages/reviewlist/reviewlist?" + r + "&msource=wxappmain&tagType=1&tag=" + encodeURIComponent("全部")
                });
            }
        },
        launchAppError: function(e) {
            var i = this;
            t.log("评论列表唤起app失败:" + JSON.stringify(e)), setTimeout(function() {
                i.allReviewTap();
            }, 1500);
        },
        launchAppTap: function() {
            console.log("全部评论模块唤起点击"), e.moduleClick(a.reviewAllBid, {
                from: "launchApp"
            }), this.triggerEvent("launchtap");
        }
    }
});