var t = require("../../../npm/@dp/sparrow/index.js"), e = require("../../../npm/@dp/logan-wxapp/build/wxlogan.js"), o = require("../../../config/business"), i = {
    getCache: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.shopUuid || t.shopId, o = this.getStorageShop(e);
        if (o && o.shopInfo) {
            this.hitCache = !0;
            var i = o.shopInfo;
            return {
                slotItems: i.slotItems,
                mApiShopInfo: o.mApiShopInfo,
                shopInfo: i,
                isCache: !0
            };
        }
        var s = this.getListCache(t);
        if (s) return {
            mApiShopInfo: s.mApiShopInfo,
            slotItems: s.slotItems,
            islistcache: !0,
            bigPics: s.bigPics
        };
    },
    getListCache: function(t) {
        var e = void 0, i = t.shopUuid || t.shopId;
        try {
            var s = wx.getStorageSync("dp_shop");
            if ((s && s.shopInfo && (s.shopInfo.id || s.shopInfo.shopUuid)) == i) {
                e = (s = s.shopInfo).msource, s = this.parseShopInfo(s);
                var a = t && t.shopStyle;
                if (s.shopStyle = {
                    picMode: a
                }, "bigpic" === a && (s.bigPics = [ {
                    url: s.defaultPic,
                    picLoad: !0
                } ]), "multipic" === a) {
                    var r = o.DEFAULT_PIC;
                    s.advancedPics = [ {
                        thumbUrl: s.defaultPic
                    }, {
                        thumbUrl: r
                    }, {
                        thumbUrl: r
                    } ];
                }
                return s.fromListCache = !0, e ? {
                    mApiShopInfo: s,
                    slotItems: this.getShopStyleCache(e).slotItems || [],
                    bigPics: [ {
                        url: s.defaultPic,
                        picLoad: !0
                    } ],
                    islistcache: !0
                } : {
                    mApiShopInfo: s,
                    islistcache: !0
                };
            }
        } catch (t) {}
    },
    parseShopInfo: function(t) {
        var e = {}, o = t && t.tagList || [];
        o.length && (e.dishItems = o.map(function(t) {
            return t.text;
        }));
        var i = {
            name: "name",
            branchName: "branchName",
            shopPower: "shopPower",
            voteTotal: "reviewCount",
            regionName: "regionName",
            categoryName: "categoryName",
            priceText: "priceText",
            scoreText: "scoreText",
            defaultPic: "defaultPic",
            listPic: "defaultPic"
        };
        for (var s in i) i.hasOwnProperty(s) && (e[s] = t[i[s]]);
        return e.scoreText || (e.scoreText = " "), e;
    },
    getStorageShop: function(t) {
        t += "";
        try {
            return this.findCacheById(t).shopData.data;
        } catch (t) {
            e.log("detail getStorageShop error: " + JSON.stringify(t));
        }
    },
    setStorageShop: function(o, i) {
        o += "";
        try {
            var s = this.findCacheById(o), a = s.shopData, r = s.shopsCache, h = a && a.data;
            if (h) {
                var n = a.index;
                r[n] = {
                    shopId: o,
                    index: n,
                    data: Object.assign(h, i)
                };
            } else r.length < 10 ? r.push({
                shopId: o,
                data: i
            }) : (r.shift(), r.push({
                shopId: o,
                data: i
            }));
            t.cache.setStorageSync("dp_shop_list", JSON.stringify(r));
        } catch (t) {
            e.log("detail setStorageShop error: " + JSON.stringify(t));
        }
    },
    findCacheById: function(t) {
        var o = {}, i = void 0;
        try {
            (i = JSON.parse(wx.getStorageSync("dp_shop_list") || "[]")).length && (o = i.filter(function(e, o) {
                return e.shopId == t ? (e.index = o, e) : null;
            })[0]);
        } catch (t) {
            e.log("detail findCacheById error: " + JSON.stringify(t));
        }
        return {
            shopData: o,
            shopsCache: i || []
        };
    },
    getShopStyleCache: function(t) {
        var e = wx.getStorageSync("dp_shop_style");
        return e && e[t] ? {
            slotItems: e[t]
        } : {};
    },
    setShopStyleCache: function(e, o) {
        var i = void 0;
        t.cache.getStorage("dp_shop_style").then(function(s) {
            (i = s || {})[e] = o, t.cache.setStorage("dp_shop_style", i);
        });
    }
};

module.exports = i;