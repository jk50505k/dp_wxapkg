function e(e, a, t) {
    if (r[e.name] && wx.showTabBarRedDot) {
        var n = e.id, i = e.name, d = r[i], c = o.indexOf(d);
        t[i] && t[i] == n || (d != a ? e.text ? wx.setTabBarBadge({
            index: c,
            text: e.text
        }) : wx.showTabBarRedDot({
            index: c
        }) : (e.text ? wx.removeTabBarBadge({
            index: c
        }) : wx.hideTabBarRedDot({
            index: c
        }), t[i] = n));
    }
}

var a = require("../npm/@dp/sparrow/index.js"), t = require("../config/index"), r = {
    "首页": "pages/index/index",
    "找好店": "pages/ranklist/ranklist",
    "找优惠": "pages/group/group",
    "我的": "pages/my/my"
}, o = a.config.getConfig("tabBars");

module.exports = function(r) {
    a.request.custom({
        url: t.DOMAIN + t.API.TABBAR_CONFIG
    }).then(function(t) {
        if (200 === t.statusCode && 200 === t.data.code && t.data.configList.length > 0) try {
            var o = t.data.configList, n = a.cache.getStorageSync("dp_clicked_tabbars") || {}, i = !0, d = !1, c = void 0;
            try {
                for (var s, g = o[Symbol.iterator](); !(i = (s = g.next()).done); i = !0) e(s.value, r, n);
            } catch (e) {
                d = !0, c = e;
            } finally {
                try {
                    !i && g.return && g.return();
                } finally {
                    if (d) throw c;
                }
            }
            Object.keys(n).length && a.cache.setStorage("dp_clicked_tabbars", n);
        } catch (e) {
            console.log("dealTabBarConfig error" + e);
        } else {
            var l = 200 !== t.statusCode || 200 !== t.data.code ? "获取tabbar配置失败" : "无tabbar配置";
            console.log(l);
        }
    }).catch(function(e) {
        console.log("获取tabbar配置出错:" + e);
    });
};