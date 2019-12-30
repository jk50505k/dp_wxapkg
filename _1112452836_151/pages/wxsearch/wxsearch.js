var e = require("../../utils/npm/owl/index"), t = require("../../npm/@dp/sparrow/index.js"), i = require("../../utils/url_stringify"), a = require("../../utils/extend"), o = require("../../common/wxp"), n = require("../../utils/npm/lx-analytics"), r = require("../../config/index"), s = void 0, c = {
    data: {
        pageName: "wxsearch",
        pageBid: "c_carwcxzr"
    },
    onLoad: function(t) {
        var i = this;
        s = getApp(), console.log(" ========== wxsearch Page Load ========== "), console.log("onLoad options:", t), 
        s.init([ {
            name: "city",
            level: 1
        }, {
            name: "location",
            level: 1
        }, {
            name: "locCity",
            level: 1
        } ]).then(function() {
            i.loading();
            var e = i.getWidgetParam("widgetData", t), o = i.getWidgetParam("wxParamData", t), n = a({}, e, o);
            console.log("wxSearchData:", n), n.slot_list ? (n.slotList = i.formatwxParamData(n.slot_list), 
            i.fetchSearchData(n)) : console.log("wxSearchData slot_list 有误");
        }).catch(function(t) {
            e.owl.error.addError("wxsearch page => app init: ", t);
        });
    },
    fetchSearchData: function(e) {
        var i = this, c = {
            slot_list: e.slot_list,
            latitude: e.latitude,
            longitude: e.longitude
        };
        s.getSetting().then(function(d) {
            c.hasUserLocation = d["scope.userLocation"] || !1, console.log("landing page params:", c);
            try {
                o.request({
                    url: r.DOMAIN + r.API.SEARCH_WIDGET,
                    data: c,
                    method: "POST"
                }).then(function(t) {
                    if (i.hideLoading(), t && 200 == t.statusCode) {
                        var o = t.data;
                        console.log("landing page res data:", o), e = a({}, e, o);
                        var r = {};
                        r.cityId = e.cityId, r.cityName = e.cityName, r.cityId && r.cityName && (console.log("设置城市信息：", r), 
                        s.setCity(r, {
                            noStorage: !1,
                            isGeo: !1
                        })), console.log("wxSearchData:", e);
                        var c = e.slotList || {};
                        c.pageType = e.data_type || "", n.pageView(i.data.pageBid, c), "rank" == e.data_type && i.wxJump("rank", e), 
                        "business" == e.data_type && i.wxJump("business", e);
                    }
                }).catch(function(e) {
                    console.log("微信搜索直达服务数据请求失败", e), t.navigation.redirectTo({
                        url: "/pages/index/index"
                    });
                });
            } catch (e) {
                console.log("微信搜索直达服务数据请求失败", e), t.navigation.redirectTo({
                    url: "/pages/index/index"
                });
            }
        });
    },
    formatwxParamData: function(e) {
        var t = {
            keyword: "美食",
            intentionWord: "美食",
            city: "",
            district: "",
            businessDistrict: ""
        };
        return e.forEach(function(e) {
            var i = e.key, a = e.value;
            "city" == i && (t.city = a), "name" == i && (t.keyword = a), "intention_word" === i && (t.intentionWord = a), 
            "district" === i && (t.district = a), "business_district" === i && (t.businessDistrict = a);
        }), t;
    },
    isEncodeJson: function(e) {
        return "string" == typeof e && "%" === e.trim()[0];
    },
    getWidgetParam: function(e, t) {
        if ("query" === e) return "wxSearchQuery" in t ? decodeURIComponent(t.wxSearchQuery) : t.query;
        if (t[e]) return "widgetData" === e || "wxParamData" === e || "data" === e ? this.isEncodeJson(t[e]) ? JSON.parse(decodeURIComponent(t[e])) : JSON.parse(t[e]) : void 0;
    },
    wxJump: function(e, a) {
        var o = {
            cityId: a.cityId || 1,
            regionId: a.regionId,
            categoryId: a.categoryId || 0,
            keyword: a.keyword || "",
            latitude: a.latitude,
            longitude: a.longitude,
            activity_flag: a.activity_flag || 0,
            is_single: a.is_single,
            utm_source: "wechat_search"
        };
        console.log("==== goto pages params:", o), "business" === e ? (o.slotList = encodeURIComponent(JSON.stringify(a.slot_list)), 
        o.categoryId = a.category_id || 0, o.is_category_search = a.is_category_search || !1, 
        o.regionId = 0, o.businessResultList = encodeURIComponent(JSON.stringify(a.business_result_list)), 
        t.navigation.redirectTo({
            url: i("/pages/list/list", o)
        })) : "rank" === e ? t.navigation.redirectTo({
            url: i("/pages/ranklist/ranklist", o)
        }) : t.navigation.redirectTo({
            url: i("/pages/index/index", o)
        });
    },
    loading: function() {
        wx.showToast({
            title: "正在跳转...",
            icon: "loading",
            duration: 5e3
        });
    },
    hideLoading: function() {
        wx.hideToast();
    }
};

c = require("../../utils/compose")(c), (0, e.page)(c);