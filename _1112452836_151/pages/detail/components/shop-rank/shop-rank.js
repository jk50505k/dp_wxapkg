var a = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../common/request"), e = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), i = require("../../../../config/index"), n = {
    shopRankMCBid: "b_ij3jpacs",
    shopRankMVBid: "b_6ylb6wg4"
}, o = {
    SHOP_RANK: "/wxmapi/shop/rankinfo"
}, s = {};

Component({
    behaviors: [],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        },
        lxData: {
            type: Object
        }
    },
    data: {
        showModule: !1
    },
    ready: function() {},
    methods: {
        _shopOptionsChange: function(i, r) {
            var p = this;
            if (i) {
                var d = i.shopId, h = i.shopUuid;
                if (s[d] || s[h]) {
                    var l = s[h] || s[d], u = l.shareTitle;
                    this.setData({
                        rankInfo: l,
                        showModule: !0
                    }), u && this.triggerEvent("sharetitle", {
                        shareTitle: u
                    });
                } else {
                    var c = {};
                    h ? c.shopUuid = h : c.shopId = d, c.locatedCityId = a.geo.getLocCitySync().cityId || 1, 
                    c.appCityId = a.geo.getCitySync().cityId || 1, t({
                        url: this._getDomain() + o.SHOP_RANK,
                        data: c
                    }).then(function(t) {
                        if (t && t.data && 200 == t.data.code && t.data.rankInfo) {
                            var e = t.data.rankInfo, i = t.data.shareTitle;
                            e.shareTitle = i, p.setData({
                                rankInfo: e,
                                showModule: !0
                            });
                            var o = Object.assign({}, p.data.lxData, {
                                type: e.rankType
                            });
                            a.lxmina.moduleView(n.shopRankMVBid, o), s[h || d] = e, i && p.triggerEvent("sharetitle", {
                                shareTitle: i
                            });
                        } else p.setData({
                            showModule: !1
                        });
                    }).catch(function(a) {
                        p.setData({
                            showModule: !1
                        }), e.log("rank error: " + a);
                    });
                }
            }
        },
        shopRankTap: function(t) {
            var e = this.data.rankInfo, i = e.rankUrl;
            a.lxmina.moduleClick(n.shopRankMCBid, Object.assign(this.data.lxData || {}, {
                type: this.data.rankInfo.rankType
            })), i && (e.jumpH5 ? a.navigation.navigateTo({
                url: i,
                type: "h5"
            }) : a.navigation.navigateTo({
                url: i
            }));
        },
        _getDomain: function() {
            return i.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        }
    }
});