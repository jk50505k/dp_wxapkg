var e = require("../../../../npm/@dp/sparrow/index.js"), t = {
    dinevoteViewBid: "b_1w4xek51",
    dinevoteClickBid: "b_lzm1791h"
};

Component({
    properties: {
        shopOptions: {
            type: Object
        },
        moduleConfig: {
            type: Object
        },
        scene: {
            type: Number
        }
    },
    data: {
        showVote: !1,
        text: "聚餐投票"
    },
    ready: function() {
        var i = this.data.moduleConfig || {}, o = i.showDinevote, a = i.wdData, s = void 0 === a ? {} : a, d = i.type, n = void 0 === d ? 1 : d;
        if (o) {
            var p = this.data.shopOptions || {}, r = {
                type: n,
                wdData: s,
                showVote: !0,
                text: "聚餐投票"
            };
            "true" === p.inVoteList ? r = {
                type: n,
                wdData: s,
                showVote: !1,
                text: ""
            } : "false" === p.inVoteList && (r = {
                type: n,
                wdData: s,
                showVote: !0,
                text: "加入投票"
            }), this.setData(r), e.lxmina.moduleView(t.dinevoteViewBid);
        }
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _handleTap: function(i) {
            var o = i.currentTarget.dataset.type || 1;
            if (e.lxmina.moduleClick(t.dinevoteClickBid, {
                type: o
            }), 2 === o) return !1;
            var a = this.data.shopOptions || {}, s = a.shopUuid || a.shopId, d = a.voteShopList || "", n = "/packages/dinevote/pages/votelist/votelist";
            s && ("" === d ? d = s : -1 === d.indexOf(s) && (d += "," + s), n = "/packages/dinevote/pages/voteindex/voteindex?shopList=" + d + "&isFromGroup=true&fromsearch=true&isWxGroup=true&create=true"), 
            e.navigation.navigateTo({
                url: n
            });
        }
    }
});