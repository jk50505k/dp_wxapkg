function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

var i = require("../npm/@dp/sparrow/index.js"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../_test/config.js")), o = require("./api");

module.exports = new function a() {
    var e = this;
    t(this, a), i.domain.add([ {
        key: "dp",
        product: "https://m.dianping.com",
        test: "https://m.51ping.com"
    }, {
        key: "mapi",
        product: "https://mapi.dianping.com",
        test: "https://mapi.51ping.com"
    }, {
        key: "lx",
        product: "https://report.meituan.com"
    }, {
        key: "logan",
        product: "https://logan.sankuai.com"
    }, {
        key: "cat",
        product: "https://catfront.dianping.com"
    }, {
        key: "appmock",
        product: "https://appmock.sankuai.com"
    }, {
        key: "maoyan",
        product: "https://wx.maoyan.com"
    }, {
        key: "mt",
        product: "https://i.meituan.com"
    }, {
        key: "trip",
        product: "https://itrip.meituan.com"
    }, {
        key: "meishi",
        product: "https://meishi.meituan.com"
    }, {
        key: "account",
        product: "https://maccount.dianping.com",
        test: "https://m.51ping.com"
    } ]), this.VERSION = "4.26.1", this.DEBUG = !1, this.DOMAIN = i.domain.get("dp"), 
    this.MAPI_DOMAIN = i.domain.get("mapi"), this.LXDOMAIN = i.domain.get("lx"), this.ACCOUNT_DOMIAN = i.domain.get("account"), 
    this.API = o, this.APP_NAME = "dianping-wxapp", this.APPID = "wx734c1ad7b3562129", 
    this.ENV = "product", i.env.on("envChanged", function(t) {
        e.ENV = t, e.DOMAIN = i.domain.get("dp"), e.MAPI_DOMAIN = i.domain.get("mapi"), 
        e.LXDOMAIN = i.domain.get("lx"), e.ACCOUNT_DOMIAN = i.domain.get("account");
    }), "test" == n.default.env && i.env.set("test");
}();