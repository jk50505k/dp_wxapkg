function t(t, e) {
    return (t || "").replace(new RegExp("(?:^|&)" + e + "=[^&=?]*", "ig"), "");
}

function e(t) {
    function e(d) {
        if (!(d > 5)) {
            var o = decodeURIComponent(wx.getStorageSync("openid") || "");
            o ? t(o) : setTimeout(function() {
                e(d + 1);
            }, 100);
        }
    }
    e(0);
}

function d(e, d, i, a) {
    var u = (a = a || {}).env || o.PRODUCT, c = (a.ishttp || !1 ? "http:" : "https:") + (n[u] || n[o.PRODUCT]), p = "", s = "";
    try {
        p = decodeURIComponent(wx.getStorageSync("_lx_sdk_lxcuid") || ""), s = decodeURIComponent(wx.getStorageSync("unionid") || "");
    } catch (t) {}
    var _ = d._fb_;
    /(%253d|%253D|%3d|%3D)/.test(_) && (_ = decodeURIComponent(_)), /^(http|https)/.test(_) && (_ = decodeURIComponent(_)), 
    _ = t(_, "act"), _ += "&act=4", e && (_ = (_ = t(_, "openid")) + "&openid=" + e), 
    p && (_ = (_ = t(_, "_lxsdk_cuid")) + "&_lxsdk_cuid=" + p), s && (_ = (_ = t(_, "unionid")) + "&unionid=" + s), 
    !/adshop_id/.test(_) && i.adshop_id && (_ = _ + "&adshop_id=" + i.adshop_id), "tuandetail" === i.pageName && !/addeal_id/.test(_) && i.addeal_id && (_ = _ + "&addeal_id=" + i.addeal_id), 
    d.utm && (_ = (_ = t(_, "utm")) + "&utm=" + d.utm), d.utm_source && (_ = (_ = t(_, "utm_source")) + "&utm_source=" + d.utm_source), 
    d.sub_media && (_ = (_ = t(_, "sub_media")) + "&sub_media=" + d.sub_media), wx.request({
        url: c + "?" + _,
        data: {},
        header: {
            "content-type": "application/json"
        }
    });
}

var o = {
    BETA: "beta",
    PPE: "ppe",
    PRODUCT: "product"
}, n = {};

n[o.BETA] = "//m.51ping.com/adp/log", n[o.PPE] = "//m.51ping.com/adp/log", n[o.PRODUCT] = "//m.dianping.com/adp/log", 
exports.init = function(t, o, n) {
    t && t._fb_ && e(function(e) {
        d(e, t, o, n);
    });
};