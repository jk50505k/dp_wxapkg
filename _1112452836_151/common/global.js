var t = require("../npm/@dp/sparrow/index.js"), e = require("../npm/@mtfe/wx-rc-finger/dist/finger.js"), n = require("../utils/lx_wrap"), o = {
    init: function(e) {
        return t.appEntry.init(e);
    },
    getOpenId: function() {
        return t.login.getOpenIdSync();
    },
    setOpenId: function(e) {
        return t.login.setOpenId(e);
    },
    getToken: function() {
        return t.login.getTokenSync();
    },
    setToken: function(e) {
        e && this.setWebviewCookieState(!0), t.login.setToken(e);
    },
    getThirdUser: function(t) {
        return this.data.thirdUser;
    },
    setThirdUser: function(e) {
        return this.data.thirdUser = e, t.wxp.setStorage({
            key: "unoionid",
            data: e
        });
    },
    getWxUser: function() {
        return this.data.wxUser;
    },
    setWxUser: function(t) {
        this.data.wxUser = t;
    },
    getLocation: function() {
        return t.geo.getLocationSync();
    },
    getLocationInfo: function() {
        return t.geo.getLocationInfoSync();
    },
    setLocation: function(e) {
        t.geo.setLocation(e);
    },
    getUUID: function() {
        return t.uuid.getSync();
    },
    setUUID: function(e) {
        t.uuid.set(e);
    },
    getCity: function() {
        return t.geo.getCitySync();
    },
    setCity: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        n.isGeo ? t.geo.setLocCity(e, n) : t.geo.setCity(e, n);
    },
    getCityInfo: function() {
        return t.geo.getCityInfoSync();
    },
    getLocCityInfo: function() {
        return t.geo.getLocCityInfoSync();
    },
    setUserInfo: function(e) {
        return t.login.setUserInfo(e);
    },
    getUserInfo: function() {
        return t.login.getUserInfo();
    },
    getLocCity: function() {
        return t.geo.getLocCitySync();
    },
    store: function(t, e) {
        this.data.store[t] = e;
    },
    retrieve: function(t) {
        return this.data.store[t];
    },
    clear: function(t) {
        this.data.store[t] = void 0;
    },
    getCache: function() {
        return t.appEntry.getCache();
    },
    getSetting: function() {
        return new Promise(function(e) {
            t.wxp.getSetting().then(function(t) {
                e(t.authSetting);
            }).catch(function() {
                e();
            });
        });
    },
    getLxData: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return Object.assign({}, n.getLxData());
    },
    getUtmSource: function() {
        return n.get("utm") || {};
    },
    logger: function() {
        try {
            this.data.debug && console && console.log && console.log.apply(console, arguments);
        } catch (t) {
            console.log("console.log err:", t);
        }
    },
    getShowOptions: function() {
        return this.data.showData;
    },
    setShowOptions: function(t) {
        1036 == t.scene && (t.canLaunchApp = !0), this.data.showData = t, wx.setStorage({
            key: "showData",
            data: t
        });
    },
    getSystemInfo: function() {
        var e = this, n = wx.getSystemInfoSync() || {};
        return n.model && -1 != n.model.indexOf("iPhone X") && (n.isIpx = !0), new Promise(function(o) {
            t.wxp.getNetworkType().then(function(t) {
                n.networkType = t.networkType, o(n);
            }).catch(function(t) {
                e.logger("获取系统信息err:", t), o(n);
            });
        });
    },
    setSystemInfo: function(t) {
        this.data.sysInfo = t;
    },
    getFigure: function() {
        var t = this;
        return new Promise(function(n) {
            var o = t.data.figure;
            o ? n(o) : e.g(function(e) {
                t.setFigure(e), n(e);
            });
        });
    },
    setFigure: function(t) {
        this.data.figure = t;
    },
    setUTM: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        n.setUTM(t);
    },
    setWebviewCookieState: function(t) {
        this.data.isCookieInValid = t;
    },
    shouldUpdateWebviewCookie: function() {
        return this.data.isCookieInValid;
    },
    setDebug: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.data.debug = t;
    },
    isDebug: function() {
        return !!this.data.debug;
    }
};

module.exports = o;