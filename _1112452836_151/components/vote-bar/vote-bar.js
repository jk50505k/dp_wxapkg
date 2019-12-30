var t = require("../../utils/lx_wrap"), o = require("../../common/nav"), e = require("../../common/request"), a = require("../../config/index"), s = require("../../public/groupId"), r = require("../../public/logan"), h = {
    toVoteBid: "b_4e26m3mq"
};

Component({
    behaviors: [],
    properties: {
        shopOptions: {
            type: Object
        },
        showAddBtn: {
            type: Boolean
        },
        shopName: {
            type: String
        },
        shopIntro: {
            type: String
        },
        voteShopInfo: {
            type: Object,
            observer: "_shopOptionChange"
        }
    },
    data: {
        showBar: !1,
        shopId: 0,
        showGuide: !1,
        showVoteList: !1,
        showAll: !1,
        showIdx: 1,
        showAllBtn: !1,
        showAllBtnTxt: "显示更多"
    },
    ready: function() {
        console.log("【vote bar ready】");
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _shopOptionChange: function(t, o) {
            if (t && (t.shopUuid || t.shopId)) {
                var e = getApp().getShowOptions();
                console.log("scene:", e.scene), !e || 1044 != e.scene && 1036 != e.scene || 1 === getCurrentPages().length && this._fetchWeChatGroupShop(e.shareTicket, t);
            }
        },
        _fetchWeChatGroupShop: function(t, o) {
            var e = this;
            try {
                r.log("查询微信商户"), s(t).then(function(t) {
                    if (t && t.openGId) {
                        console.log(t.openGId), r.log(t.openGId);
                        var a = o.shopUuid || o.shopId;
                        o && a && 10 == o.shopType && e._addGroupShop(t.openGId, a);
                    } else r.log("获取微信群ID失败");
                });
            } catch (t) {
                r.log("查询微信商户异常" + JSON.stringify(t));
            }
        },
        toVotePage: function(e) {
            var a = this.data.shopId || "";
            t.moduleClick(h.toVoteBid), this.data.chatGroupId && o({
                url: "/packages/dinevote/pages/voteindex/voteindex?shopList=" + a + "&isFromGroup=true&fromsearch=true&isWxGroup=true&create=true&chatGroupId=" + this.data.chatGroupId
            });
        },
        toVoteIndexPage: function(t) {
            if (t.currentTarget.dataset) {
                var e = t.currentTarget.dataset.voteid, a = t.currentTarget.dataset.vote;
                e && (a && 1 == a.masterGuestState ? o({
                    url: "/packages/dinevote/pages/voteshare/voteshare?voteId=" + e + "&showAddBtn=true"
                }) : a && 2 == a.masterGuestState && o({
                    url: "/packages/dinevote/pages/voteshare/voteshare?voteId=" + e
                }));
            }
        },
        addToVote: function(t) {
            this.triggerEvent("addToVote");
        },
        showMore: function() {
            var t = this;
            this.data.showAll = !this.data.showAll, Array.isArray(this.data.voteList) && this.data.voteList.forEach(function(o, e) {
                e > t.data.showIdx ? o.show = t.data.showAll : o.show = !0;
            }), this.setData({
                voteList: this.data.voteList,
                showAllBtnTxt: this.data.showAll ? "收起" : "显示更多"
            });
        },
        _addGroupShop: function(t, o) {
            var s = this;
            r.log("[vote-bar]上报微信群商户"), e({
                url: a.DOMAIN + a.API.ADD_GROUP_SHOP,
                data: {
                    chatGroupId: t,
                    shopUuid: o,
                    token: getApp().getToken() ? getApp().getToken() : ""
                }
            }).then(function(e) {
                e && 200 === e.data.code ? r.log("[vote-bar]上报微信群商户成功") : r.log("[vote-bar]上报微信群商户错误"), 
                s._queryGroupShop(t, o);
            }).catch(function(t) {
                r.log("[vote-bar]上报微信群商户异常:" + JSON.stringify(t));
            });
        },
        _queryGroupShop: function(t, o) {
            var s = this;
            r.log("[vote-bar]查询微信群商户"), e({
                url: a.DOMAIN + a.API.QUERY_GROUP_SHOP,
                data: {
                    chatGroupId: t,
                    noPro: !0,
                    shopUuid: o
                }
            }).then(function(o) {
                if (o && 200 === o.data.code && Array.isArray(o.data.data)) {
                    for (var e = o.data.data, a = !1, h = 0, n = [], i = [], d = [], p = 0; p < e.length; p++) {
                        var u = e[p];
                        p <= s.data.showIdx && (u.show = !0), 0 === u.masterGuestState ? (h = u.shopIds.length, 
                        i = u.shopIds) : (a = !0, n.push(u), !1 === u.includeShopId && 1 == u.masterGuestState && d.push(u));
                    }
                    var c = !1, l = !1;
                    a ? l = !0 : h >= 2 && (c = !0), s.triggerEvent("handleVoteList", {
                        voteList: n,
                        myValidVoteList: d,
                        shouldShowAddToVoteBtn: d.length > 0,
                        showGuide: c
                    }), s.setData({
                        chatGroupId: t,
                        showGuide: c,
                        showVoteList: l,
                        voteList: n,
                        voteShopNum: h,
                        shopId: i.join(","),
                        showAllBtn: n.length > 2
                    });
                } else r.log("[vote-bar]查询微信群商户错误");
            }).catch(function(t) {
                r.log("[vote-bar]查询微信群商户异常:" + JSON.stringify(t));
            });
        }
    }
});