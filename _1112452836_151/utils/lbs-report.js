Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportLBS = function() {
    var t = function(e) {
        var o = (e[0] || {}).networkType, t = (e[1] || {}).platform, n = (e[2] || {}).openId, r = e[3] || {}, i = r.latitude, a = r.longitude;
        return {
            os: /ios/gi.test(t) ? "iOS" : "Android",
            openId: n,
            net: o,
            lng: a,
            lat: i
        };
    };
    setTimeout(function() {
        var n = {
            actionType: 1,
            openId: "",
            net: "",
            os: "",
            lng: "",
            lat: "",
            coordinate: "WGS-84",
            addTime: Date.now()
        }, r = [ e.wxp.getNetworkType(), e.wxp.getSystemInfo(), e.login.getOpenId(), e.geo.getLocationCache() ];
        try {
            Promise.all(r).then(function(r) {
                var i = t(r), a = i.os, s = i.openId, l = i.net, c = i.lng, p = i.lat;
                n = Object.assign({}, n, {
                    os: a,
                    openId: s,
                    net: l,
                    lng: c,
                    lat: p
                }), e.request.mina({
                    url: o.DOMAIN + "/wxmapi/base/lbsreport",
                    data: n,
                    method: "POST"
                }).then(function(e) {
                    e && 200 == e.code ? console.log("lbs report success") : console.log("lbs report fail");
                }).catch(function() {
                    console.log("lbs report fail");
                });
            });
        } catch (e) {}
    }, 2e3);
};

var e = require("../npm/@dp/sparrow/index.js"), o = require("../config/index");