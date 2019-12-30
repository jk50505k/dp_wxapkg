Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(o, r) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : App, n = r.onLaunch, c = r.onError, e = r.onHide, a = r.onPageNotFound, l = o.pageSpeed, u = o.error, h = o.resource;
    r.onLaunch = function(o) {
        try {
            var r = Date.now();
            l.appLaunch(r, o.path);
        } catch (o) {
            console.log("onLaunch error:" + o.stack || o);
        }
        n.call(this, o);
    }, r.onError = function(o) {
        try {
            o = r.preError ? r.preError(o) : o, u.onError(o);
        } catch (o) {
            console.log("onError catch:" + o.stack || o);
        }
        c && c.call(this, o);
    }, r.onHide = function() {
        try {
            u.report(), h.report();
        } catch (o) {
            console.log("onHide catch:" + o.stack || o);
        }
        e && e.call(this);
    }, r.onPageNotFound = function(o) {
        try {
            o && (o = r.preNotFound ? r.preNotFound(o) : o, u.addError("page not found", o.path));
        } catch (o) {
            console.log("onPageNotFound catch:" + o.stack || o);
        }
        a && a.call(this);
    }, t(r);
};