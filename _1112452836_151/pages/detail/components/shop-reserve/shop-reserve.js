var e = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../config/index"), i = require("../../../../common/request"), a = require("../../../../public/login"), n = require("../../../../common/nav"), r = {
    bookingMVBid: "b_m7rml9y9",
    bookingMCBid: "b_7et5hfzv",
    detailMCBid: "b_6cb013s2",
    moreMCBid: "b_3kum0fvk",
    dateTimeMVBid: "b_oz2b9iml",
    dateMCBid: "b_03q2kehe",
    timeMCBid: "b_cqvzleom",
    nextMCBid: "b_jrminwyb"
}, s = (getApp().data.debug, []), o = [], d = {};

Component({
    behaviors: [],
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        lxData: {
            type: Object
        },
        moduleConfig: {
            type: Object
        }
    },
    data: {
        toMore: !1,
        showClose: !0,
        reserveData: {},
        serviceData: {},
        selectTimeVisible: !1,
        currentDayIndex: 0,
        currentHalfDayIndex: 0,
        currentTimePrice: {},
        currentDayItem: {},
        currentTimePriceIndex: null,
        cityid: 0,
        shopId: 0
    },
    ready: function() {
        console.log("【shop reserve ready】");
    },
    moved: function() {},
    detached: function() {},
    methods: {
        _shopOptionsChange: function(t, i) {
            if (t) {
                var a = e.geo.getCitySync();
                a && a.cityId && this.setData({
                    cityid: a.cityId
                }), this.fetchReserveList();
            }
        },
        catchEvent: function() {},
        setUTM: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).query;
            d.utm_campaign = e && e.utm_campaign || "Adianping-novaBdianping-n405";
        },
        selectTime: function(e) {
            var t = e.currentTarget.dataset.timeprice, i = e.currentTarget.dataset.latestcurrenttimeitem;
            if (t.status) {
                var a = e.currentTarget.dataset.timepriceindex;
                this.setData({
                    currentTimePrice: t,
                    currentTimePriceIndex: a,
                    latestCurrentTimeItem: i
                });
            }
        },
        changeDayIndex: function(t) {
            var i = t.currentTarget.dataset.dayindex;
            e.lxmina.moduleClick(r.dateMCBid), this.setData({
                currentDayIndex: i,
                currentDayItem: this.data.serviceData.list[i],
                currentHalfDayIndex: 0,
                currentTimePriceIndex: null
            });
        },
        changHalfDayIndex: function(t) {
            var i = t.currentTarget.dataset.halfdayindex;
            e.lxmina.moduleClick(r.timeMCBid), this.setData({
                currentHalfDayIndex: i,
                currentTimePriceIndex: null
            });
        },
        resetData: function() {
            this.setData({
                toMore: !1,
                showClose: !0,
                serviceData: {},
                selectTimeVisible: !1,
                currentDayIndex: 0,
                currentHalfDayIndex: 0,
                currentTimePrice: {},
                currentDayItem: {},
                currentTimePriceIndex: null
            });
        },
        goNextStep: function() {
            var i = this;
            if (e.lxmina.moduleClick(r.nextMCBid), this.data.currentTimePrice.status) {
                var s = this.data.currentTimePrice, o = s.nextDayText ? "true" : "false", d = new Date(s.actualTime).getTime();
                this.data.serviceData.serviceId;
                var c = this.data.cityid, u = this;
                a.ensure().then(function(e) {
                    var a = getApp().getUUID(), r = e.openId, s = "?arriveTime=" + d + "&productitemid=" + (i.data.currentDayItem && i.data.currentDayItem.scheduledId || "") + "&shopid=" + i.data.shopId + "&token=" + e.token + "&crossday=" + o + "&openId=" + r + "&appId=wx734c1ad7b3562129&cityId=" + c + "&uuid=" + a, l = ("product" == t.ENV ? "https://m.dianping.com/stitching/trading-next/uno/2083609" : "https://m.51ping.com/stitching/trading-next/uno/1307554") + s;
                    u.closeModal(), n({
                        type: "h5",
                        url: l
                    });
                }).catch(function() {
                    wx.showToast({
                        icon: "none",
                        title: "登录失败，请稍后再试",
                        duration: 3e3
                    });
                });
            }
        },
        closeModal: function() {
            this.triggerEvent("hideMask"), this.setData({
                selectTimeVisible: !1,
                currentDayIndex: 0,
                currentHalfDayIndex: 0,
                currentTimePrice: {},
                currentDayItem: {},
                currentTimePriceIndex: null
            });
        },
        openSpuPage: function(t) {
            e.lxmina.moduleClick(r.detailMCBid);
            var i = t.currentTarget.dataset.serviceid;
            wx.navigateTo({
                url: "/packages/joy/pages/spu/spu?shopid=" + this.data.shopId + "&serviceid=" + i + "&cityid=" + this.data.cityid
            });
        },
        showModal: function(a) {
            var n = this, s = "product" == t.ENV ? "https://mapi.dianping.com" : "https://mapi.51ping.com";
            e.lxmina.moduleClick(r.bookingMCBid), setTimeout(function() {
                n.setData({
                    selectTimeVisible: !0
                });
            }, 120), this.triggerEvent("promptMask");
            var o = a.currentTarget.dataset.serviceid;
            i({
                url: s + "/mapi/joy/serviceselecttime.joy",
                data: {
                    shopId: this.data.shopId,
                    cityid: this.data.cityid,
                    serviceId: o
                }
            }).then(function(t) {
                e.lxmina.moduleView(r.dateTimeMVBid), n.setData({
                    serviceData: t.data,
                    currentDayItem: t.data.list[n.data.currentDayIndex]
                });
            });
        },
        goDetail: function() {
            e.lxmina.moduleClick(r.detailMCBid);
        },
        fetchReserveList: function() {
            var a = this, n = "product" == t.ENV ? "https://mapi.dianping.com" : "https://mapi.51ping.com";
            i({
                url: n + "/mapi/joy/massagereservation.joy",
                data: {
                    shopId: this.data.shopOptions.shopId || 0,
                    shopuuid: this.data.shopOptions.shopUuid || "",
                    cityid: this.data.cityid
                }
            }).then(function(t) {
                a.dataFilter(t), e.lxmina.moduleView(r.bookingMVBid), (s = t.data.list) && (s && s.length && (o = s.slice(0, 2)), 
                a.setData({
                    shopId: a.data.shopOptions.shopId || t.data.shopId || 0,
                    reserveData: t.data,
                    reserveList: o,
                    toMore: s.length > 2,
                    toMoreText: s.length > 2 ? "查看其他" + (s.length - 2) + "项服务" : ""
                }));
            }).catch(function(e) {
                console.log(e);
            });
        },
        dataFilter: function(e) {
            e.data && (e.data.list && e.data.list.forEach(function(e) {
                e.firstAvailableDate = JSON.parse(e.firstAvailableDate);
            }), e.data.refundTip && (e.data.refundTip = JSON.parse(e.data.refundTip)), e.data.joyIconTips && (e.data.joyIconTips.forEach(function(e) {
                e.tip && (e.tip = JSON.parse(e.tip));
            }), e.data.joyIconTips = e.data.joyIconTips.slice(0, 3)));
        },
        toMoreOrLess: function(t) {
            this.data.showClose ? (e.lxmina.moduleClick(r.moreMCBid), this.setData({
                showClose: !1,
                toMoreText: "收起",
                reserveList: s
            })) : this.setData({
                showClose: !0,
                toMoreText: "查看其他" + (this.data.reserveData.list.length - 2) + "项服务",
                reserveList: o
            });
        },
        launchAppError: function(e) {
            console.log("launchAppError", e), this.data.launchFailUrl && this.triggerEvent("reserveItemTap", this.data.launchFailUrl);
        }
    }
});