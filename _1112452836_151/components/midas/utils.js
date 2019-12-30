function e() {
    try {
        return u || (u = decodeURIComponent(wx.getStorageSync("_lx_sdk_lxcuid") || ""));
    } catch (e) {}
}

function t() {
    try {
        return p || (p = decodeURIComponent(wx.getStorageSync("uuid") || ""));
    } catch (e) {}
}

function n() {
    try {
        return R || (R = decodeURIComponent(wx.getStorageSync("openid") || ""));
    } catch (e) {}
}

function r() {
    try {
        return E || (E = decodeURIComponent(wx.getStorageSync("unionid") || ""));
    } catch (e) {}
}

var i = require("./enum");

exports.getBaseUrl = function(e) {
    var t = e.serverType, n = e.env, r = i.SERVER_TYPE_URL[t] || i.SERVER_TYPE_URL[i.SERVER_TYPE.DIANPING];
    return (e.ishttps ? "https:" : "http:") + (r[n] || r[i.ENV.PRODUCT]);
};

var c = /(?:^|&)act=[^?&=]*/gi, a = /(?:^|&)openid=([^?&=]*)/i, o = /(?:^|&)dpid=[^?&=]*/gi, d = /(?:^|&)adidx=[^?&=]*/gi, u = "", p = "", R = "", E = "", g = 0;

exports.buildActionUrl = function(u, p, R, E) {
    var l = e(), v = t(), S = n(), s = "";
    s += "&unionid=" + r() + "&adidx=" + p;
    var _ = (u = u.replace(d, "")).match(a), h = _ && _[1] || "";
    return S && h.length < 10 && (u.match(a) && (u = u.replace(a, "")), s += "&openid=" + S), 
    u.replace(c, ""), u = u.replace(o, ""), u += "&adClient=miniapp", E.serverType === i.SERVER_TYPE.MEITUAN ? (s += "&mtdpid=" + l + "&iuuid=" + v, 
    u + "&act=" + R + s + "&t=" + new Date().valueOf() + "&i=v1_" + ++g) : (s += "&dpid=" + l, 
    u + "&act=" + R + s + "&t=" + new Date().valueOf() + "&i=v1_" + ++g);
};