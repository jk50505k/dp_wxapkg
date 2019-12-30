var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = require("../common/request"), t = require("../config/index"), r = {};

module.exports = function(n) {
    if (n) {
        var i = n.shopId, a = n.shopUuid, s = void 0;
        "object" === (void 0 === n ? "undefined" : o(n)) && n.lat && (s = n);
        var f = function(o) {
            wx.openLocation({
                latitude: o.lat,
                longitude: o.lng,
                name: o.shopName,
                address: o.address
            });
        };
        if (s) f(s); else if (a || i) if (r[i] || r[a]) f(r[i] || r[a]); else {
            var u = {};
            a ? u.shopUuid = a : u.shopId = i, n.mtsiReferrer && (u.mtsiReferrer = n.mtsiReferrer);
            var d = t.API.SHOP_MAP;
            e({
                url: t.DOMAIN + d,
                data: u
            }).then(function(o) {
                if (o && 200 == o.statusCode && 200 == o.data.code) {
                    var e = o.data.shopInfo;
                    r = {}, a ? r[a] = e : r[i] = e, f(e);
                }
            }).catch(function(o) {
                console.error("Detail Map", o);
            });
        }
    }
};