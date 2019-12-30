var a = require("../../../../npm/@dp/sparrow/index.js"), e = require("../../../../modules/map"), t = require("./sheet"), i = require("../../../../npm/@dp/logan-wxapp/build/wxlogan.js"), o = require("../../../../utils/url_stringify"), n = require("../../../../common/relation-behavior"), s = {
    addressBid: "b_fhsmyz6u",
    callBid: "b_i7ojv4l3",
    carMVBid: "b_dianping_nova_vnizs792_mv",
    carMCBid: "b_dianping_nova_vnizs792_mc"
};

Component({
    relations: {
        "../shop-slot/shop-slot": {
            type: "ancestor"
        }
    },
    behaviors: [ n ],
    properties: {
        moduleConfig: {
            type: Object
        },
        carData: {
            type: Object,
            observer: "_carDataChange"
        },
        shopMapData: {
            type: Object,
            observer: "_shopMapDataChange"
        },
        shopOptions: {
            type: Object
        },
        needLogin: {
            type: Boolean,
            value: !1
        },
        canLaunchPoi: {
            type: Boolean,
            value: !1
        },
        canLaunchApp: {
            type: Boolean,
            value: !1
        },
        lxData: {
            type: Object
        },
        route: {
            type: String
        }
    },
    data: {
        showModule: 1
    },
    ready: function() {},
    moved: function() {},
    detached: function() {},
    methods: {
        _shopMapDataChange: function(a) {
            if (a && a.hasShopMap) {
                var e = void 0, t = "c_1ilqz4n8:" + s.addressBid + ":weixin:wxapp";
                e = this.data.canLaunchPoi ? a.shopSchema + "&utm=" + t : a.mapSchema + "&utm=" + t, 
                this.setData({
                    showModule: 2,
                    shopMapData: a,
                    launchAppUrl: e
                });
            } else a && !a.fromListCache && this.setData({
                showModule: 0
            });
        },
        _carDataChange: function(e) {
            var t = this.data.moduleConfig && this.data.moduleConfig.hasDache;
            e && e.hasDache && t && a.lxmina.moduleView(s.carMVBid, this.data.lxData);
        },
        openShopMap: function() {
            var t = this.data.shopMapInfo, i = void 0;
            if (t) i = t; else {
                i = {};
                var n = this.data.shopOptions, p = n.shopId, r = n.shopUuid;
                r ? i.shopUuid = r : i.shopId = p;
            }
            i.mtsiReferrer = encodeURIComponent(o("pages/detail/detail", i)), e(i), a.lxmina.moduleClick(s.addressBid, this.data.lxData);
        },
        launchAppError: function(a) {
            var e = this;
            i.log("地图模块唤起app失败:" + JSON.stringify(a)), setTimeout(function() {
                e.openShopMap();
            }, 1500);
        },
        launchAppTap: function() {
            a.lxmina.moduleClick(s.addressBid, {
                from: "launchApp"
            }), this.triggerEvent("launchtap");
        },
        callPhone: function() {
            var e = this.data.shopMapData.phoneNos, i = this.data.shopMapData.cityAreaCode;
            if (this.data.shopMapData.isForeignShop || (e = e.map(function(a) {
                var e = a.split("-");
                (a && a.length < 9 || e.length > 1 && e[0].length < 9 && 400 !== e[0] && 0 !== a.indexOf(i)) && (a = i ? i + a : a);
                var t = wx.getSystemInfoSync();
                return (t && 0 === a.indexOf("400") && a.indexOf("-") > 0 || t && 2 === e.length && 400 !== e[0] && e[0] !== i) && (/ios/gi.test(t.system) ? a = a.replace(/-/, ",,") : /android/gi.test(t.system) && (a = a.replace(/-/, ","))), 
                a;
            })), e) {
                var o = [], n = this.getSiblingNode("../shop-slot/shop-slot", "../shop-service/shop-service"), p = n && n.data && n.data.serviceData;
                if (p && p.length) {
                    var r = p.filter(function(a) {
                        return "reserve" == a.serviceName;
                    }), h = r[0] && r[0].phoneUrl;
                    h && o.push(Object.assign({
                        type: "url",
                        showText: "立即在线订座",
                        data: h,
                        name: r[0].serviceName
                    }, {
                        showText: r[0].showText
                    }));
                }
                e.map(function(a) {
                    return o.push({
                        type: "phone",
                        data: a,
                        showText: a
                    });
                }), t(o), a.lxmina.moduleClick(s.callBid, this.data.lxData);
            }
        },
        callCar: function() {
            var e = this.data.carData && this.data.carData.skipUrl;
            e && a.navigation.navigateTo({
                url: e
            }), a.lxmina.moduleClick(s.carMCBid, this.data.lxData);
        }
    }
});