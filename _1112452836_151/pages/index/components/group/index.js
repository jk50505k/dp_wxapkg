var e = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), a = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), i = require("../../common/formatgroupreq"), o = require("../../common/formatgroup"), n = require("../../../../config/index"), d = {
    viewBid: "b_n5zad57z",
    clickBid: "b_e0ezux7r"
};

Component({
    properties: {
        options: {
            type: Object,
            value: null,
            observer: "optionsChange"
        },
        isFirstLoad: {
            type: Boolean,
            value: !1
        },
        initFinishTime: {
            type: Number,
            value: null
        }
    },
    data: {
        showModule: !1
    },
    attached: function() {
        this.getCache();
    },
    methods: {
        optionsChange: function(e, t) {
            e ? this.fetchData() : this.setData({
                showModule: !1
            });
        },
        fetchData: function() {
            var r = this, s = e.geo.getCitySync(), l = e.geo.getLocCitySync(), u = e.geo.getLocationSync(), c = u.latitude, p = u.longitude, g = !!(c && p && s && l && s.cityId === l.cityId), h = Date.now();
            return e.request.mina({
                url: "https://apimobile.meituan.com" + n.API.INDEX_TUAN,
                data: i({
                    offset: 0,
                    limit: 10,
                    ci: s && s.cityId,
                    mypos: void 0 !== c ? c + "," + p : "",
                    orderby: g ? "geodist" : "saleNum"
                })
            }).then(function(i) {
                if (t.owl.pageSpeed.addPoint({
                    position: 11,
                    duration: Date.now() - h
                }, "pages/index/index"), i && 200 == i.statusCode && 200 === i.data.code && i.data.totalNumber >= 20 && i.data.deals && i.data.deals.length >= 3) {
                    var n = i.data.deals.filter(function(e) {
                        return e.canBuy;
                    });
                    if (n && n.length >= 3) {
                        var l = Date.now(), u = o(n.slice(0, 3), g);
                        t.owl.pageSpeed.addPoint({
                            position: 12,
                            duration: Date.now() - l
                        }, "pages/index/index");
                        var c = e.geo.getCitySync();
                        s && c && s.cityId === c.cityId && (r.setData({
                            showModule: !0,
                            list: u
                        }, function() {
                            t.owl.pageSpeed.addFirstContentfulPaint("group", r.data.isFirstLoad ? Date.now() - r.data.initFinishTime : null);
                        }), r.setCache(u.slice(0, 2)), e.lxmina.moduleView(d.viewBid));
                    } else r.setData({
                        showModule: !1
                    });
                } else {
                    var p = e.geo.getCitySync();
                    s && p && s.cityId === p.cityId && (r.setData({
                        showModule: !1
                    }), r.setCache([])), 200 == i.statusCode && 200 == i.data.code || (t.owl.error.addError("fetch group data fail", {
                        statusCode: i.statusCode,
                        data: JSON.stringify(i.data)
                    }, !0), a.log("获取首页拼团数据失败:" + JSON.stringify(i.data)));
                }
            }).catch(function(e) {
                a.log("获取首页拼团数据异常:" + JSON.stringify(e));
            });
        },
        getCache: function() {
            var a = this;
            return e.cache.getStorage("dp_index_group").then(function(e) {
                e && e.length && a.setData({
                    showModule: !0,
                    list: e
                }, function() {
                    t.owl.pageSpeed.addFirstContentfulPaint("group", a.data.isFirstLoad ? Date.now() - a.data.initFinishTime : null);
                });
            });
        },
        setCache: function(t) {
            var a = t.map(function(e) {
                return delete e.distance, e;
            });
            e.cache.setStorage("dp_index_group", a);
        },
        onMoreTap: function() {
            e.navigation.navigateTo({
                url: "/packages/indextuan/pages/tuan/tuan"
            }), e.lxmina.moduleClick(d.clickBid);
        },
        onShopTap: function(t) {
            var a = t.currentTarget.dataset.id || "";
            e.navigation.navigateTo({
                url: "/pages/detail/detail?shopId=" + a
            }), e.lxmina.moduleClick(d.clickBid);
        },
        onGroupTap: function(t) {
            var a = t.currentTarget.dataset.group, i = a.dealId || "", o = a.campaignId || "", n = a.shopId || "";
            e.navigation.navigateTo({
                url: "/packages/msdeal/pages/deal-detail/deal-detail?dealGroupId=" + i + "&campaignId=" + o + "&shopId=" + n
            }), e.lxmina.moduleClick(d.clickBid);
        }
    }
});