var t = require("../../../../npm/@dp/sparrow/index.js"), i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js")), e = require("../../../../config/index"), a = {
    OVERSEA_BUSINESS: "/mapi/wechat/shoptelephone.overseas"
};

Component({
    properties: {
        shopOptions: {
            type: Object,
            observer: "_shopOptionsChange"
        },
        moduleConfig: {
            type: Object
        }
    },
    data: {
        isIpx: !1,
        animationData: {},
        showPop: !1,
        popEnd: !1,
        moduleData: {
            showModule: !1,
            hasDetail: !1,
            title: "营业时间"
        },
        detailData: {
            title: "营业时间",
            tipTitle: "温馨提示",
            timeList: [],
            tipList: []
        }
    },
    ready: function() {
        var t = wx.getSystemInfoSync() || {};
        t.model && -1 != t.model.indexOf("iPhone X") && this.setData({
            isIpx: !0
        });
    },
    methods: {
        _shopOptionsChange: function(i) {
            var e = this;
            if (!this.data.showPop && i) {
                var a = {}, n = i.shopId;
                a.shopid = n;
                var o = t.geo.getLocationSync();
                o ? (a.lat = o && o.latitude || 0, a.lng = o && o.longitude || 0, this.fetchData(a)) : t.geo.getLocation().then(function(t) {
                    a.lat = t && t.latitude, a.lng = t && t.longitude, e.fetchData(a);
                }).catch(function(t) {
                    console.log("获取经纬度失败：", t);
                });
            }
        },
        fetchData: function(n) {
            var o = this;
            t.request.mina({
                url: e.MAPI_DOMAIN + a.OVERSEA_BUSINESS,
                data: n
            }).then(function(t) {
                if (t.data.businessHour && t.data.businessHour.show) {
                    var i = t.data.businessHour, e = i.businessHourPopDetailInfo;
                    o.setData({
                        moduleData: {
                            showModule: i.show,
                            hasDetail: i.needPopDetail,
                            title: (i.title || "") + (i.businessHoursNew || "")
                        },
                        detailData: {
                            title: e.detailTitle || "",
                            tipTitle: e.warmTipsTitle,
                            timeList: o.getTimeListInfo(e.openTimeList),
                            tipList: e.warmTipList
                        }
                    });
                } else o.setData({
                    moduleData: {
                        showModule: !1
                    }
                });
            }).catch(function(t) {
                o.setData({
                    moduleData: {
                        showModule: !1
                    }
                }), i.default.log("获取境外营业时间失败", t);
            });
        },
        getTimeListInfo: function(t) {
            var i = this;
            return t ? t.map(function(t) {
                return {
                    title: t.monthTimeUnit,
                    dayList: i.getDayListInfo(t.dayTimeUnitList)
                };
            }) : [];
        },
        getDayListInfo: function(t) {
            return t ? t.map(function(t) {
                var i = [], e = [], a = !0, n = !1, o = void 0;
                try {
                    for (var s, r = t.hourTimeUnitList[Symbol.iterator](); !(a = (s = r.next()).done); a = !0) {
                        var l = s.value;
                        i.push(l.timeRange), e.push(l.mealTitle);
                    }
                } catch (t) {
                    n = !0, o = t;
                } finally {
                    try {
                        !a && r.return && r.return();
                    } finally {
                        if (n) throw o;
                    }
                }
                return {
                    dayTime: t.dayTimeUnit,
                    hourTime: i.join("\n"),
                    mealTitle: e.join("\n"),
                    needHighlight: t.needHighlight
                };
            }) : [];
        },
        showDetailInfoTap: function() {
            if (this.data.moduleData.hasDetail) {
                var t = wx.createAnimation({
                    duration: 200
                });
                this.animationContent = t;
                var i = this.data.isIpx ? 1002 : 934;
                t.translateY(i).step(), this.setData({
                    showPop: !0,
                    animationData: t.export()
                }), setTimeout(function() {
                    t.translateY(0).step(), this.setData({
                        animationData: t.export()
                    });
                }.bind(this), 100), setTimeout(function() {
                    this.setData({
                        popEnd: !0
                    });
                }.bind(this), 500), this.triggerEvent("promptMask");
            }
        },
        closeDetailInfoTap: function() {
            if (this.data.popEnd) {
                var t = wx.createAnimation({
                    duration: 200
                });
                this.animationContent = t;
                var i = this.data.isIpx ? 1002 : 934;
                t.translateY(i).step(), this.setData({
                    animationData: t.export()
                }), setTimeout(function() {
                    t.translateY(0).step(), this.setData({
                        animationData: t.export(),
                        showPop: !1,
                        popEnd: !1
                    });
                }.bind(this), 100), this.triggerEvent("hideMask");
            }
        },
        popContentTap: function() {}
    }
});