var e = require("../../utils/npm/owl/index"), t = require("../../npm/@dp/sparrow/index.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../npm/@mtfe/wxapp-rohr/dist/rohr.js")), a = require("../../common/request"), o = require("../../config/index"), s = require("../../common/nav"), r = require("../../public/logan"), n = require("../../utils/page_url").getCurrentPageUrlWithArgs, d = getApp(), h = {
    reviewAllBid: "b_4sho1bz2"
};

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        reviewListParams: {
            type: Object,
            value: {}
        },
        lxData: {
            type: Object
        },
        needLogin: {
            type: Boolean,
            value: !1,
            observer: "_needLoginChange"
        },
        canLaunchApp: {
            type: Boolean
        },
        tagConfig: {
            type: Object,
            value: {
                headJump: !0,
                showHead: !0
            }
        },
        hasApp: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        reviewTags: [],
        listView: {},
        gotoApp: !1
    },
    created: function() {},
    ready: function() {
        this.getData();
    },
    methods: {
        getData: function(t) {
            var i = this, a = this.data.reviewListParams || {}, o = parseInt(a.shopId) || 0, s = a.shopUuid || "";
            (o || s) && (this.setData({
                shopId: o,
                shopUuid: s,
                listView: {
                    firstLoading: !0
                },
                shopOptions: {
                    shopId: o,
                    shopUuid: s
                }
            }), d.getFigure().then(function(e) {
                r.log("[review-list]获取诚信值: " + JSON.stringify(e)), i.fetchReviewList({
                    shopId: o,
                    shopUuid: s,
                    needLogin: t,
                    cx: e
                });
            }).catch(function(a) {
                r.log("[review-list]获取诚信值失败: " + JSON.stringify(a)), e.owl.error.addError("[review-list]获取诚信值失败: " + JSON.stringify(a)), 
                i.fetchReviewList({
                    shopId: o,
                    shopUuid: s,
                    needLogin: t
                });
            }));
        },
        handleClickTag: function(e) {
            var t = e.detail.target.dataset, i = t.type, a = t.keyword, o = t.hit;
            this.jump2List({
                type: i,
                keyword: a,
                hit: o
            }), this.triggerEvent("revieweventlisten", {
                hitTag: a,
                tagType: i,
                eventPosition: "listTagBtn"
            });
        },
        handleAllReview: function(e) {
            t.lxmina.moduleClick(h.reviewAllBid, this.data.lxData), this.triggerEvent("revieweventlisten", {
                eventPosition: "listHeadBtn",
                e: e
            });
        },
        jump2List: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = void 0, i = e.type, a = e.keyword, o = e.hit;
            this.data.shopUuid && (t = "shopUuid=" + this.data.shopUuid), this.data.shopId && (t = "shopId=" + this.data.shopId), 
            t && s({
                url: "/packages/ugc/pages/reviewlist/reviewlist?" + t + "&msource=wxappmain&hit=" + o + "&tagType=" + i + "&tag=" + encodeURIComponent(a)
            });
        },
        fetchReviewList: function(t) {
            var s = this, r = function() {
                s.setData({
                    isLoading: !1,
                    showTagLoading: !1
                }), wx.hideNavigationBarLoading(), wx.hideToast();
            }, d = function(t) {
                e.owl.error.addError("fetchReviewList fail:", t, !0), s.setData({
                    isError: !0,
                    listView: {
                        list: [],
                        listError: {
                            iconType: 2
                        },
                        isEnd: !1
                    }
                });
            }, h = {
                pageSize: 3,
                cx: t.cx,
                mtsiReferrer: n()
            };
            t.shopUuid ? h.shopUuid = t.shopUuid : h.shopId = t.shopId;
            var p = encodeURIComponent(i.default.r(h));
            h._token = p, a({
                url: o.DOMAIN + o.API.SHOP_REVIEW,
                data: h
            }).then(function(e) {
                if (r(), e && 200 == e.statusCode && e.data && 200 == e.data.code) if (e.data.shopReviewInfo) {
                    var t = e.data.shopReviewInfo, i = t.reviewTotalCount, a = t.reviewList, o = t.reviewTags, n = h.shopId || h.shopUuid;
                    s.setData({
                        totalCount: i,
                        listView: {
                            list: a || [],
                            showLoading: !1,
                            isEnd: !1,
                            firstLoading: !1
                        },
                        reviewTags: o || [],
                        isError: !1,
                        launchAppUrl: "dianping://review?refertype=0&referid=" + n + "&utm=c_1ilqz4n8:b_4sho1bz2:weixin:wxapp"
                    });
                } else d("加载评论出错"); else d("加载评论出错");
            }).catch(function(e) {
                d("网络出错了"), console.error("[review list]", e);
            });
        },
        allReviewTap: function(e) {
            t.lxmina.moduleClick(h.reviewAllBid, this.data.lxData);
            var i = this.data.tagConfig && this.data.tagConfig.gotoContact, a = void 0;
            try {
                a = JSON.parse(this.data.tagConfig && this.data.tagConfig.cardData);
                var o = JSON.parse(a && a.cardData), s = o.params;
                s && (s.id = this.data.reviewListParams && (this.data.reviewListParams.shopId || this.data.reviewListParams.shopUuid), 
                o.params = s, a.cardData = JSON.stringify(o));
            } catch (e) {}
            i && a ? (a.showPop = i, this.setData({
                cardData: a
            })) : (this.triggerEvent("revieweventlisten", {
                eventPosition: "listEndBtn",
                e: e
            }), this.jump2List({
                type: 0,
                keyword: "全部",
                hit: 0
            }));
        },
        handleHorizontalScroll: function() {
            this.triggerEvent("horizontalscroll");
        },
        handleFindLazyLoadComponents: function() {
            this.triggerEvent("lazyload");
        },
        launchAppTap: function() {
            this.triggerEvent("launchtap");
        },
        launchAppError: function() {
            console.log("唤起失败");
        }
    }
});