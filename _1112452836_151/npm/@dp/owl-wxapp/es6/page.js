Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, o) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Page, a = o.onLoad, t = o.onReady, n = o.onHide, c = o.onUnload, l = o.onPullDownRefresh, s = e.pageSpeed, d = e.cfgManager, i = e.error;
    o.onLoad = function(e) {
        try {
            if (!d.get("hasRecordApp")) {
                var o = this.route;
                s.appReady(o), d.update("hasRecordApp", !0);
            }
            s.pageLoad(d);
        } catch (e) {
            console.log("onLoad error:" + e.stack || e);
        }
        a && a.call(this, e);
    }, o.imageError = function(e) {
        i.pushError({
            content: e.detail && e.detail.errMsg,
            category: "jsError",
            sec_category: "image error",
            level: "error"
        });
    }, o.onReady = function(e) {
        try {
            s.pageReady();
        } catch (e) {
            console.log("onReady error:" + e.stack || e);
        }
        t && t.call(this, e);
    }, o.onHide = function(e) {
        try {
            s.report();
        } catch (e) {
            console.log("page onHide error:" + e.stack || e);
        }
        n && n.call(this, e);
    }, o.onUnload = function(e) {
        try {
            s.report();
        } catch (e) {
            console.log("page onUnload error:" + e.stack || e);
        }
        c && c.call(this, e);
    }, o.onPullDownRefresh = function(e) {
        try {
            s.pullRefresh();
        } catch (e) {
            console.log("page pullRefresh error:" + e.stack || e);
        }
        l && l.call(this, e);
    }, r(o);
};