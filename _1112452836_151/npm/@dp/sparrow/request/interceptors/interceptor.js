function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function t(r) {
    e(this, t);
    var o = r.type, s = r.resolve, n = r.reject;
    if (this.type = o || "request", !s) throw new Error("interceptor必须实现resolve方法");
    this.resolve = s, n || (n = function(e) {
        return Promise.reject(e);
    }), this.reject = n;
};