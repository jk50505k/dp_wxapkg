var e = require("../../../../npm/@dp/sparrow/index.js"), t = {
    MVBid: "b_dianping_nova_hboynm0m_mv",
    MCBid: "b_dianping_nova_hboynm0m_mc"
};

Component({
    properties: {
        item: {
            type: Object,
            value: {}
        },
        foodRankList: {
            type: Array,
            value: []
        }
    },
    data: {
        hideSpread: !0
    },
    ready: function() {
        this.timer = null, this.nearbyRects = [], this.lxviewIds = [];
        var e = wx.getSystemInfoSync() || {};
        this.windowWidth = e.windowWidth, this.lxview();
    },
    methods: {
        initlxviewIds: function() {
            this.lxviewIds = [];
        },
        scrollHandler: function() {
            this.lxview();
        },
        lxview: function() {
            var e = this;
            this.data.foodRankList.length && this.lxviewIds.length && this.data.foodRankList.length == this.lxviewIds.length || (this.timer && clearTimeout(), 
            this.timer = setTimeout(function() {
                clearTimeout(e.timer), e.querySelector && 0 != e.nearbyRects.length || (e.querySelector = wx.createSelectorQuery().selectAll(".food-list-wrapper >>> .food-card").boundingClientRect(function(i) {
                    e.nearbyRects = i, e.foodCardView(i, t.MVBid), e.timer = null;
                })), e.querySelector.exec();
            }));
        },
        foodCardView: function(i, n) {
            if (i && n && 0 != i.length) for (var a = 0; a < i.length; a++) {
                var o = i[a], r = o.id, d = o.left, s = o.dataset.name;
                this.lxviewIds.indexOf(r) > -1 || d < this.windowWidth && (this.lxviewIds.push(r), 
                e.lxmina.moduleView(t.MVBid, {
                    title: s,
                    index: a
                }));
            }
        },
        addLX: function(i) {
            var n = this.data.foodRankList && this.data.foodRankList[i] || {}, a = n && n.categoryName || "";
            i < 3 && (a = n.sortName);
            var o = {
                title: a,
                index: i
            };
            e.lxmina.moduleClick(t.MCBid, o);
        },
        gotoRank: function(e) {
            var t = e.currentTarget.dataset.url, i = e.currentTarget.dataset.index;
            this.addLX(i), this.toWebView({
                url: t
            });
        },
        toWebView: function(t) {
            if (wx.canIUse && wx.canIUse("web-view") && t && t.url) {
                var i = t.url, n = new RegExp("([一-龥])", "g"), a = i.match(n);
                a && a.forEach(function(e) {
                    i = i.replace(e, encodeURIComponent(e));
                }), e.navigation.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(i)
                });
            } else e.navigation.navigateTo({
                url: "/pages/index/index"
            });
        }
    }
});