var e = require("../../npm/@dp/sparrow/index.js"), r = require("../../utils/npm/owl/index"), t = require("../../public/logan"), n = require("../../utils/lx_wrap"), a = require("../../common/request"), i = {
    PARSE_SHOPID: "/wxmapi/shop/shopqrcode"
};

Page({
    data: {},
    onLoad: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = {};
        if (r.q) n.q = r.q, console.log("transfer二维码参数q:" + r.q), t.log("transfer二维码参数q:" + r.q), 
        this.parseQrcode(n); else if (r.scene) {
            var a = decodeURIComponent(r.scene);
            n.uuid = a, console.log("transfer小程序码参数scene:" + a), t.log("transfer小程序码参数scene:" + a), 
            this.parseQrcode(n);
        } else e.navigation.redirectTo({
            url: "/pages/index/index"
        });
    },
    parseQrcode: function(o) {
        var s = "/pages/index/index";
        a({
            url: this.getDomain() + i.PARSE_SHOPID,
            data: o
        }).then(function(r) {
            if (r && 200 == r.statusCode && r.data && 200 == r.data.code) {
                t.log("transfer解码返回: " + JSON.stringify(r.data)), console.log("transfer解码返回: " + JSON.stringify(r.data)), 
                s = r.data.path || s;
                try {
                    var a = s.match(/(?:\?|&)(utm_\w*=[^&#]*)/gi), i = void 0;
                    a && (i = {}, a.map(function(e) {
                        e = e.split("="), i[e[0].substring(1)] = e[1] || "";
                    })), i && n.setUTM(i);
                } catch (e) {}
            }
            e.navigation.redirectTo({
                url: s
            });
        }).catch(function(n) {
            e.navigation.redirectTo({
                url: s
            }), r.owl.error.addError("transfer 解码失败", n), t.log("transfer 解码失败", n);
        });
    },
    getDomain: function() {
        var r = "https://m.dianping.com";
        return "test" === e.env.get() && (r = "https://m.51ping.com"), r;
    }
});