var i = require("../../../../npm/@dp/sparrow/index.js"), t = require("../../../../config/index"), e = {}, n = {
    defaultMCBid: "b_dianping_nova_5v15jkob_mc",
    popMCBid: "b_dianping_nova_qk0oko9r_mc",
    blackPerlMCBid: "b_dianping_nova_7094xoum_mc",
    mustEatMCBid: "b_dianping_nova_dobk2u9x_mc"
};

Component({
    properties: {
        goodRankList: {
            type: Object,
            value: {}
        }
    },
    ready: function() {
        var t = this;
        i.event.on("cityChange", function(i) {
            console.log("===== cityChange choosenList");
            var e = i && i.cityId, n = i && i.cityName;
            e && t.cityId != e && (t.cityId = e, t.cityName = n, t.initGeo(), t.initConfig());
        }), this.initGeo(), this.initConfig();
    },
    methods: {
        initGeo: function() {
            var t = i.geo.getCitySync();
            console.log("=========> geoCity res:", t), this.cityId = this.cityId || t.cityId || 1, 
            this.cityName = this.cityName || t.cityName || "上海";
            var e = i.geo.getLocationSync();
            this.lat = e.latitude, this.lng = e.longitude;
        },
        initConfig: function() {
            e = {
                3: {
                    imgUrl: "//p0.meituan.net/dpgroup/984b07e8cd86565230fb5a1296b9f32311399.png",
                    titleUrl: "//p0.meituan.net/dpgroup/8523b6508581e644fca71554f462a28a2846.png",
                    rankUrl: t.DOMAIN + "/musteat2019/index?cityid=" + this.cityId + "&utm_source=zhd_miniapp"
                },
                6: {
                    imgUrl: "//p0.meituan.net/dpgroup/4cdf378ce04b71d1dacf82434fafd07437658.png",
                    titleUrl: "//p0.meituan.net/dpgroup/e80a1a1530351d96d1c9937d197340441878.png",
                    rankUrl: t.DOMAIN + "/city-billboard/hottest?cityId=" + this.cityId + "&latitude=" + this.lat + "&longitude=" + this.lng + "&notitlebar=1&noquery=1&wkwebview=1&utm_source=zhd_miniapp"
                },
                8: {
                    imgUrl: "//p0.meituan.net/dpgroup/01148521a633424a879a8a3b802ea42c38565.png",
                    titleUrl: "//p0.meituan.net/dpgroup/e66d0392fdc325a1e62fd0419f1612b32828.png",
                    rankUrl: t.DOMAIN + "/blackpearl2020/2019/index.html?cityId=" + this.cityId + "&utm_source=zhd_miniapp"
                },
                default: {
                    imgUrl: "//p0.meituan.net/dpgroup/7dfc9606300dfaeb01340ec0a5a0ffde39309.png",
                    titleUrl: "//p1.meituan.net/dpgroup/15b5cf1f0e05a5c676ea88640e425e913602.png",
                    rankUrl: t.DOMAIN + "/dishes/hot?msource=wxranklist&cityId=" + this.cityId + "&utm_source=zhd_miniapp"
                }
            };
        },
        setLX: function(t) {
            var e = {
                city_id: this.cityId
            };
            3 == t ? i.lxmina.moduleClick(n.mustEatMCBid, e) : 6 == t ? i.lxmina.moduleClick(n.popMCBid, e) : 8 == t ? i.lxmina.moduleClick(n.blackPerlMCBid, e) : i.lxmina.moduleClick(n.defaultMCBid, e);
        },
        gotoRank: function(t) {
            var n = t.currentTarget.dataset.type;
            if (this.setLX(n), !this.lat || !this.lng) {
                var a = i.geo.getLocationSync();
                this.lat = a.latitude, this.lng = a.longitude;
            }
            var o = (e[n] || {}).rankUrl || "";
            this.toWebView({
                url: o
            });
        },
        toWebView: function(t) {
            if (wx.canIUse && wx.canIUse("web-view") && t && t.url) {
                var e = t.url, n = new RegExp("([一-龥])", "g"), a = e.match(n);
                a && a.forEach(function(i) {
                    e = e.replace(i, encodeURIComponent(i));
                }), i.navigation.navigateTo({
                    url: "/pages/webview/webview?url=" + encodeURIComponent(e)
                });
            } else i.navigation.navigateTo({
                url: "/pages/index/index"
            });
        }
    }
});