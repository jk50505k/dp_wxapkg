var t = require("../../npm/@dp/sparrow/index.js"), a = require("../../config/index"), e = require("../../utils/lx_wrap"), n = {
    rainbowMVBid: "b_et2lvx3l",
    rainbowMCbid: "b_4687gd6y"
}, i = {
    RAINBOW: "/wxmapi/shop/rainbow"
};

Component({
    behaviors: [],
    properties: {
        loadOptions: {
            type: Object,
            vaule: null
        },
        rainBowData: {
            type: Object,
            vaule: null,
            observer: "_rainBowDataChange"
        }
    },
    ready: function() {
        var t = this;
        this.data.rainBowData ? this._dealRainBowData(this.data.rainBowData) : this.data.loadOptions && this.fetchData(this.data.loadOptions || {}).then(function(a) {
            a && t._dealRainBowData(a);
        });
    },
    methods: {
        _rainBowDataChange: function(t) {
            this._dealRainBowData(t);
        },
        fetchData: function(a) {
            var e = this, n = {};
            if (n = this._dealParams(a)) return new Promise(function(a) {
                var i = t.geo.getCitySync();
                i ? (n.cityId = i.cityId, e.getRainBowData(n).then(function(t) {
                    a(t);
                })) : t.geo.getCity().then(function(t) {
                    n.cityId = t.cityId, e.getRainBowData(n).then(function(t) {
                        a(t);
                    });
                }).catch(function(t) {
                    a(), console.log("getRainBowData定位失败:", t);
                });
            });
        },
        getRainBowData: function(a) {
            var e = this;
            return new Promise(function(n) {
                t.request.mina({
                    url: e._getDomain() + i.RAINBOW,
                    data: a
                }).then(function(t) {
                    t && t.data && 200 === t.data.code && t.data.rainBowData ? n(t.data.rainBowData) : n();
                }).catch(function() {
                    n();
                });
            });
        },
        _dealParams: function(t) {
            var a = {}, e = t.shopId, n = t.shopUuid;
            if (t.dealGroupId) a.dealGroupId = t.dealGroupId; else if (n) a.shopUuid = n; else {
                if (!a.shopId) return null;
                a.shopId = e;
            }
            return a;
        },
        _dealRainBowData: function(t) {
            if (t.showModule = !1, t.endTime && t.urls && t.urls.length > 0) {
                var a = (Date.parse(new Date(t.endTime)) - Date.parse(new Date())) / 1e3;
                if (a > 0) {
                    t.showModule = !0, this.initSeconds(a, t), e.moduleView(n.rainbowMVBid);
                    var i = setInterval(function() {
                        var e = a;
                        this.updateSeconds(e), --a <= 0 && (clearInterval(i), t.showModule = !1, this.setData({
                            rainBowData: t
                        }));
                    }.bind(this), 1e3);
                }
            }
        },
        initSeconds: function(t, a) {
            var e = this._dealSecond(t), n = e.dayStr, i = e.hrStr, o = e.minStr, r = e.secStr;
            t > 86400 ? this.setData({
                rainBowData: a,
                dayStr: n,
                hrStr: i,
                dayModel: !0,
                hourModel: !1,
                minModel: !1
            }) : t > 3600 ? this.setData({
                rainBowData: a,
                hrStr: i,
                minStr: o,
                dayModel: !1,
                hourModel: !0,
                minModel: !1
            }) : this.setData({
                rainBowData: a,
                minStr: o,
                secStr: r,
                dayModel: !1,
                hourModel: !1,
                minModel: !0
            });
        },
        updateSeconds: function(t) {
            var a = this._dealSecond(t), e = a.dayStr, n = a.hrStr, i = a.minStr, o = a.secStr;
            t >= 86400 ? t % 3600 == 0 && this.setData({
                dayStr: e,
                hrStr: n,
                dayModel: !0,
                hourModel: !1,
                minModel: !1
            }) : t >= 3600 && t < 86400 ? (t + 1) % 60 == 0 && this.setData({
                hrStr: n,
                minStr: i,
                dayModel: !1,
                hourModel: !0,
                minModel: !1
            }) : this.setData({
                minStr: i,
                secStr: o,
                dayModel: !1,
                hourModel: !1,
                minModel: !0
            });
        },
        _dealSecond: function(t) {
            var a = Math.floor(t / 3600 / 24), e = a.toString();
            1 == e.length && (e = "0" + e);
            var n = Math.floor((t - 3600 * a * 24) / 3600), i = n.toString();
            1 == i.length && (i = "0" + i);
            var o = Math.floor((t - 3600 * a * 24 - 3600 * n) / 60), r = o.toString();
            1 == r.length && (r = "0" + r);
            var d = (t - 3600 * a * 24 - 3600 * n - 60 * o).toString();
            return 1 == d.length && (d = "0" + d), {
                dayStr: e,
                hrStr: i,
                minStr: r,
                secStr: d
            };
        },
        _getDomain: function() {
            return a.DOMAIN.indexOf("51ping") > 0 ? "https://m.51ping.com" : "https://m.dianping.com";
        },
        rainBowTap: function() {
            e.moduleClick(n.rainbowMCbid);
        }
    }
});