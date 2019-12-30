var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o]);
    }
    return e;
}, t = require("../../../../npm/@dp/sparrow/index.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../npm/@mtfe/wxapp-rohr/dist/rohr.js")), o = require("../../../../common/nav.js"), d = require("../../../../config/index"), a = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), r = require("../../../../components/mina_lazyload_img/index.js").initInComponent, n = {
    FRIENDS_LIKE: "/wxmapi/shop/friendslike"
}, s = {
    itemClickBid: "b_6alqtrds",
    moudleMVBid: "b_dmzfm5it"
}, p = void 0;

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
    ready: function() {
        p = getApp();
    },
    data: {
        imgClass: "width:330rpx;height:250rpx;border-radius: 14rpx 14rpx 0 0;",
        spImgClass: "width:250rpx;height:250rpx;border-radius: 14rpx  0 0 14rpx;"
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _shopOptionsChange: function(e, i) {
            var o = this;
            if (e) {
                var d = e.shopId, p = e.shopUuid, u = t.lxmina.getLxCUID(), c = getApp().getOpenId(), l = getApp().getLocation(), h = getApp().getCity(), m = void 0;
                try {
                    m = wx.getSystemInfoSync();
                } catch (e) {
                    console.log("获取 systemInfo 有误", e);
                }
                var g = {
                    cuid: u,
                    cityId: h && h.cityId,
                    openId: c,
                    lng: l && l.longitude || 0,
                    lat: l && l.latitude || 0,
                    os: m && m.system
                };
                p ? g.shopUuid = p : g.shopId = d, a.log("friendlike fetch params " + g), t.request.custom({
                    url: this._getDomain() + n.FRIENDS_LIKE,
                    data: g
                }).then(function(e) {
                    if (e && e.data && 200 == e.data.code && e.data.data && e.data.data.recordList) {
                        var i = e.data.data.recordList, d = e.data.adMode || !1, n = e.data.data.queryId;
                        o.setData({
                            adMode: d,
                            recordList: i,
                            queryId: n
                        }, function() {
                            r(o);
                        }), t.lxmina.moduleView(s.moudleMVBid, {
                            query_id: n
                        });
                    } else o.setData({
                        recordList: []
                    }), a.log("小伙伴们喜欢数据error:", JSON.stringify(e.data.data));
                }).catch(function(e) {
                    a.log("friendlike error: " + e);
                });
            }
        },
        shopItemTap: function(e) {
            var i = e.currentTarget.dataset.item, d = i.schema, a = i.shopId, r = i.bizId, n = e.currentTarget.dataset.index, p = d || "/pages/detail/detail?shopId=" + a;
            (p += "&from=default") && o({
                url: p
            }), t.lxmina.moduleClick(s.itemClickBid, {
                poi_id: a,
                biz_id: r,
                index: n,
                query_id: this.data.queryId
            });
        },
        adShopTap: function(e) {
            var i = e.detail, d = this.data.recordList[i], a = d.schema;
            a += "&from=default", this.preFetchDetail(), a && o({
                url: a
            }), t.lxmina.moduleClick(s.itemClickBid, {
                poi_id: d && d.shopId,
                biz_id: d && d.bizId,
                index: i,
                query_id: this.data.queryId
            });
        },
        preFetchDetail: function() {
            var o = this.data.shopOptions, a = o.shopUuid || o.shopId, r = {};
            o.shopUuid ? r.shopUuid = o.shopUuid : r.shopId = o.shopId;
            var n = t.geo.getLocationSync(), s = e({}, r);
            s.shopId && (s.shopid = s.shopId, delete s.shopId), s.cookieId = t.login.getOpenIdSync() || t.login.getOpenIdCacheSync(), 
            n && (s.lat = n && n.latitude || "", s.lng = n && n.longitude || ""), s.mtsiReferrer = encodeURIComponent(t.url.stringify("/pages/detail/detail", s)), 
            s._token = encodeURIComponent(i.default.r(s));
            var u = d.MAPI_DOMAIN + d.API.MAPI_SHOP_INFO;
            t.request.mapi({
                url: u,
                data: s
            }, {
                prefetch: "dp_detail_shopmapi_" + a
            });
            var c = p.getShowOptions() && p.getShowOptions().scene ? p.getShowOptions().scene : null;
            r.scene = c, r.utm_source = p.getUtmSource(), r.from = "detail";
            var l = d.DOMAIN + d.API.SHOP_INFO;
            t.request.mina({
                url: l,
                data: r
            }, {
                prefetch: "dp_detail_shopinfo_" + a
            });
        },
        _getDomain: function() {
            return d.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        }
    }
});