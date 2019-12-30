var e = require("../../npm/@dp/sparrow/index.js"), o = require("../../common/wxp"), t = require("../../utils/url_stringify"), a = require("../../config/index"), i = {
    shopid: "shopId",
    tablenum: "tableNum",
    orderViewId: "orderViewId",
    tableName: "tableName",
    flagNum: "flagNum"
};

Page({
    data: {
        shopId: "",
        tableNum: "",
        type: "",
        uuid: "",
        utm_medium: "offline-qrcode"
    },
    onLoad: function(i) {
        var n = this;
        console.log("=======orderfood Page onLoad ========"), console.log("onload options:", i);
        var r = this.paramsParse(i), d = Number(r.shopId);
        if (r.utm_medium = this.data.utm_medium, d) console.log("旧的桌码，自带shopId信息"), e.navigation.redirectTo({
            url: t("/pages/detail/detail", r)
        }); else {
            var s = r.qrUUID;
            s ? o.request({
                url: a.DOMAIN + a.API.PARSE_SHOPID,
                data: {
                    uuid: s
                }
            }).then(function(o) {
                if (n.hideLoading(), console.log("解码请求res:", o), o && 200 == o.statusCode && o.data && 200 == o.data.code) {
                    var a = o.data.data, i = a.shopId, d = a.shopUuid;
                    d ? r.shopUuid = d : r.shopId = i, r.tableNum = a.tableNum || "", delete r.q, console.log("detail页params:", r), 
                    i || d ? e.navigation.redirectTo({
                        url: t("/pages/detail/detail", r)
                    }) : n.showModal(o.data.viewMsg);
                } else n.showModal(o.data.viewMsg);
            }).catch(function(e) {
                console.log("解码err", e), n.showModal();
            }) : (console.log("获取uuid信息失败"), this.showModal());
        }
    },
    onShow: function() {},
    onHide: function() {},
    loading: function() {
        wx.showToast({
            title: "桌码识别中...",
            icon: "loading",
            duration: 5e3
        });
    },
    showModal: function(o) {
        wx.showModal({
            title: "温馨提示",
            content: o || "无效的桌码，请换一个桌码",
            showCancel: !1,
            success: function() {
                e.navigation.redirectTo({
                    url: "/pages/index/index"
                });
            }
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    queryParse: function(e) {
        var o = e, t = {};
        if (!o) return t;
        o = decodeURIComponent(o);
        var a = /\/hobbit\/\d\//, n = /\/wxm\/dp\//, r = a.test(o), d = n.test(o);
        if (r || d) {
            var s = (r ? a : n).exec(o)[0], l = o.split(s)[1].split("?");
            if (1 === l.length) t.qrUUID = l[0]; else if (l.length > 1) {
                t.qrUUID = l[0];
                var u = l[1].split("&");
                u && u.length && u.forEach(function(e) {
                    var o = e.split("="), a = o[0];
                    t[i[a] || a] = o[1];
                });
            }
            return t;
        }
        if (o.indexOf("?") > -1) {
            var c = o.split("?")[1];
            try {
                var h = c.split("&");
                return h && h.length && h.forEach(function(e) {
                    var o = e.split("="), a = o[0];
                    t[i[a] || a] = o[1];
                }), t;
            } catch (e) {
                console.error("[Parse QueryString]", e);
            }
        }
        return t;
    },
    paramsParse: function(e) {
        var o = {};
        return e ? (e.q && (o = this.queryParse(decodeURIComponent(e.q))), console.log("解码数据1:", o), 
        Object.keys(e).forEach(function(t) {
            o[i[t] || t] = decodeURIComponent(e[t]);
        }), console.log("解码数据:2", o), o) : {};
    }
});