var t = function() {
    function t(t, e) {
        var i = [], a = !0, n = !1, o = void 0;
        try {
            for (var r, l = t[Symbol.iterator](); !(a = (r = l.next()).done) && (i.push(r.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            n = !0, o = t;
        } finally {
            try {
                !a && l.return && l.return();
            } finally {
                if (n) throw o;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../../../npm/@dp/sparrow/index.js"), i = require("../../../../npm/@dp/owl-wxapp/es6/index.js"), a = require("../../../../common/pinkie"), n = require("../../../../common/formatpicurl"), o = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), r = "pages/index/index", l = {
    viewBid: "b_n5zad57z",
    clickBid: "b_e0ezux7r",
    cardViewBid: "b_dianping_nova_5vtwc047_mv",
    cardClickBid: "b_dianping_nova_5vtwc047_mc",
    moreViewBid: "b_dianping_nova_44obl0om_mv",
    moreClickBid: "b_dianping_nova_44obl0om_mc"
}, d = getApp();

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
        showModule: !1,
        showType: 0,
        groupSeckillData: null,
        cutdownData: null,
        seckillBeginTime: null
    },
    cutDownInterVal: null,
    attached: function() {
        this.getCache();
    },
    methods: {
        optionsChange: function(t, e) {
            t ? this.initMoudle() : this.setData({
                showModule: !1
            });
        },
        initMoudle: function(t) {
            var i = this;
            this.fetchData().then(function(a) {
                i.parsePage(a), i.setCache(a), !t && e.lxmina.moduleView(l.viewBid);
            });
        },
        fetchData: function() {
            var i = this, n = e.geo.getCitySync(), o = e.login.getDPUserSync(), r = wx.getSystemInfoSync(), l = e.geo.getLocationSync(), d = l.latitude, s = l.longitude, u = {
                city: n,
                user: o,
                sysInfo: r,
                latitude: d,
                longitude: s
            }, c = this.fetchPinTuan(u), p = this.fetchSeckill(u);
            return a.all([ c, p ]).then(function(a) {
                var o = t(a, 2), r = o[0], l = o[1], d = e.geo.getCitySync(), s = e.geo.getLocCitySync(), u = n && s && s.cityId === n.cityId;
                if (n && d && n.cityId === d.cityId) {
                    var c = i.formatGroup(r, u), p = i.formatSeckill(l, u);
                    return i.filterSamePoi(c, p), {
                        groupData: c,
                        seckillData: p
                    };
                }
                return null;
            });
        },
        filterSamePoi: function(t, e) {
            var i = e && e.dealList || null;
            if (i && t) {
                var a = i[0], n = t[0];
                a && n && a.shopId === n.shopId && (parseFloat(a.price) < parseFloat(n.price) ? t.shift() : i.shift());
            }
        },
        parsePage: function(t) {
            var a = this;
            if (console.log(t), t) {
                var n = t.groupData, o = t.seckillData, r = 0;
                n && o ? (r = 3, e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: n[0] && n[0].dealId || "",
                    title: 1
                }), e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: o.dealList && o.dealList[0] && o.dealList[0].dealId || "",
                    title: 2
                })) : n ? (r = 1, e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: n[0] && n[0].dealId || "",
                    title: 1
                }), e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: n[1] && n[1].dealId || "",
                    title: 1
                }), e.lxmina.moduleView(l.moreViewBid, {
                    title: 1
                })) : o && (r = 2, e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: o.dealList && o.dealList[0] && o.dealList[0].dealId || "",
                    title: 2
                }), e.lxmina.moduleView(l.cardViewBid, {
                    deal_id: o.dealList && o.dealList[1] && o.dealList[1].dealId || "",
                    title: 2
                }), e.lxmina.moduleView(l.moreViewBid, {
                    title: 2
                })), r ? this.setData({
                    showType: r,
                    groupSeckillData: t,
                    showModule: !0
                }, function() {
                    i.owl.pageSpeed.addFirstContentfulPaint("group", a.data.isFirstLoad ? Date.now() - a.data.initFinishTime : null);
                }) : this.setData({
                    showModule: !1,
                    showType: r
                });
            }
        },
        fetchSeckill: function(t) {
            var a = t.city, n = t.user, l = t.sysInfo, s = t.latitude, u = t.longitude, c = Date.now();
            return e.request.mina({
                url: "https://meishi.meituan.com/api/seckill/wx/entrance",
                data: {
                    cityId: a && a.cityId || 2,
                    userid: n && n.userId || 0,
                    uuid: d.getUUID(),
                    version: l.version || "",
                    os: l && l.system && l.system.split(" ")[0] || "",
                    lat: s || 0,
                    lng: u || 0,
                    platform: 2,
                    limit: 2,
                    wxToken: d.getToken() || ""
                }
            }).then(function(t) {
                return i.owl.pageSpeed.addPoint({
                    position: 14,
                    duration: Date.now() - c
                }, r), t && 200 == t.statusCode && 200 === t.data.code ? t.data : (i.owl.error.addError("fetch seckill data fail", {
                    statusCode: t.statusCode,
                    data: JSON.stringify(t.data)
                }, !0), o.log("获取首页秒杀数据失败:" + JSON.stringify(t.data)), null);
            });
        },
        fetchPinTuan: function(t) {
            var a = t.city, n = t.user, l = t.sysInfo, d = t.latitude, s = t.longitude, u = e.geo.getLocCitySync(), c = !!(d && s && a && u && a.cityId === u.cityId), p = Date.now();
            return e.request.mina({
                url: "https://apimobile.meituan.com/group/v1/deal/pintuans",
                data: {
                    offset: 0,
                    limit: 10,
                    ci: a && a.cityId,
                    mypos: void 0 !== d ? d + "," + s : "",
                    orderby: c ? "geodist" : "saleNum",
                    userid: n && n.userId || 0,
                    version_name: "10.5.0",
                    utm_medium: l && l.system.split(" ")[0].toLocaleLowerCase() || "",
                    userSys: "DP",
                    platform: "dpapp",
                    resource: "groupby",
                    source: 1,
                    reqFrom: "dp_index"
                }
            }).then(function(t) {
                return i.owl.pageSpeed.addPoint({
                    position: 11,
                    duration: Date.now() - p
                }, r), t && 200 == t.statusCode && 200 === t.data.code && t.data.totalNumber >= 20 && t.data.deals && t.data.deals.length >= 3 ? t.data : (200 == t.statusCode && 200 == t.data.code || (i.owl.error.addError("fetch group data fail", {
                    statusCode: t.statusCode,
                    data: JSON.stringify(t.data)
                }, !0), o.log("获取首页拼团数据失败:" + JSON.stringify(t.data))), null);
            }).catch(function(t) {
                return o.log("获取首页拼团数据异常:" + JSON.stringify(t)), null;
            });
        },
        getCache: function() {
            var t = this;
            return e.cache.getStorage("dp_index_group-seckill").then(function(e) {
                t.parsePage(e);
            });
        },
        setCache: function(t) {
            e.cache.setStorage("dp_index_group-seckill", t);
        },
        formatGroup: function(t, e) {
            if (t) {
                var a = t.deals.filter(function(t) {
                    return t.canBuy;
                });
                if (a && a.length >= 2) {
                    var n = Date.now(), o = this._formatGroupList(a.slice(0, 2), e);
                    return i.owl.pageSpeed.addPoint({
                        position: 12,
                        duration: Date.now() - n
                    }, r), o;
                }
            }
            return null;
        },
        _formatGroupList: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], a = [];
            return e && e.length && (a = e.map(function(e) {
                return {
                    campaignId: e.campaiginId,
                    dealId: e.dpGroupId,
                    shopId: e.shopId,
                    shopName: e.poiName,
                    distance: i ? t._getDistanceText(e.distance) : "",
                    image: n(e.image, {
                        width: 334,
                        height: 188,
                        needProtocol: !0
                    }),
                    title: e.title,
                    price: parseFloat(e.ptPrice),
                    value: parseFloat(e.price),
                    ptNumber: s(e.ptNumber) || e.ptNumber ? e.ptNumber + "人团" : "",
                    ptOrderCount: s(e.ptOrderCount) || e.ptOrderCount ? "已拼" + e.ptOrderCount : "",
                    discount: e.disCount ? e.disCount.replace(/\s+/g, "") : ""
                };
            })), a;
        },
        formatSeckill: function(t, e) {
            if (t && t.data) {
                var a = t.data.poiList, n = t.data.seckillShowVo;
                if (a && a.length >= 2) {
                    var o = Date.now(), l = this.formatSeckillList(a.slice(0, 2), e);
                    return this.startSeckillCutdown(n), i.owl.pageSpeed.addPoint({
                        position: 15,
                        duration: Date.now() - o
                    }, r), {
                        dealList: l
                    };
                }
            }
            return null;
        },
        startSeckillCutdown: function(t) {
            var e = Date.now(), i = t.startTime, a = t.endTime;
            if (this.stopInterval(), e > i) console.log("倒计时模式"), this.startCutDown(a); else {
                var n = this.getTime(i);
                this.setData({
                    seckillBeginTime: n
                });
            }
        },
        getTime: function(t) {
            var e = new Date();
            e.setTime(t);
            var i = e.getHours(), a = e.getMinutes();
            return (i < 10 ? "0" + i : i) + ":" + (a < 10 ? "0" + a : a);
        },
        startCutDown: function(t) {
            var e = this, i = function() {
                var i = new Date().getTime(), a = Math.floor((t - i) / 1e3);
                e.countDown(a);
            };
            i(), this.cutDownInterVal = setInterval(i, 1e3);
        },
        countDown: function(t) {
            if (t < 0) return this.setData({
                cutdownData: null
            }), void this.stopInterval();
            var e = parseInt(t / 3600), i = parseInt(t / 60 - 60 * e), a = parseInt(t - 3600 * e - 60 * i);
            this.setData({
                cutdownData: {
                    hours: "" + (e < 10 ? "0" + e : e),
                    mins: "" + (i < 10 ? "0" + i : i),
                    secs: "" + (a < 10 ? "0" + a : a)
                }
            });
        },
        stopInterval: function() {
            this.cutDownInterVal && (clearInterval(this.cutDownInterVal), this.setData({
                cutdownData: null,
                seckillBeginTime: null
            }), this.cutDownInterVal = null);
        },
        formatSeckillList: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], a = [];
            return e && e.length && (a = e.map(function(e) {
                var a = e.dealList && e.dealList[0] || {};
                return {
                    dealId: a.dealId || "",
                    shopId: e.poiId || "",
                    title: a.title || "",
                    shopName: e.shopName || "",
                    image: n(a.imgUrl, {
                        width: 334,
                        height: 188,
                        needProtocol: !0
                    }),
                    distance: i ? t._getDistanceText(e.distance || 0) : "",
                    price: t._getPirceText(a.finalPrice),
                    value: t._getPirceText(a.value)
                };
            })), a;
        },
        _getDistanceText: function(t) {
            if (t < 0 && (t = 0 - t), !t) return "";
            return (t = parseInt(t)) <= 100 ? "<100m" : t < 1e3 ? t + "m" : t < 1e5 ? parseFloat(t / 1e3).toFixed(1) + "km" : ">100km";
        },
        _getPirceText: function(t) {
            return t % 100 == 0 ? Math.round(t / 100) : (t / 100).toFixed(t % 10 == 0 ? 1 : 2);
        },
        viewToGroupPage: function(t) {
            e.navigation.navigateTo({
                url: "/packages/indextuan/pages/tuan/tuan"
            }), e.lxmina.moduleClick(l.clickBid), "more" === t.currentTarget.dataset.type ? e.lxmina.moduleClick(l.moreClickBid, {
                title: 1
            }) : e.lxmina.moduleClick(l.cardClickBid, {
                title: 1
            });
        },
        viewToSeckillPage: function(t) {
            e.navigation.navigateTo({
                url: "/packages/msdeal/pages/sec-kill-list/sec-kill-list"
            }), e.lxmina.moduleClick(l.clickBid), "more" === t.currentTarget.dataset.type ? e.lxmina.moduleClick(l.moreClickBid, {
                title: 2
            }) : e.lxmina.moduleClick(l.cardClickBid, {
                title: 2
            });
        }
    }
});

var s = function(t) {
    return 0 === t || 0 === t;
};