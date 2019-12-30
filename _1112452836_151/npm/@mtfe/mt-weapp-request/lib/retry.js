Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(r) {
    var e = this;
    return function(t) {
        var n = e.config, u = t.retry || 1;
        return function e() {
            return r(t).catch(function(r) {
                return r;
            }).then(function(r) {
                if (r && (200 === r.statusCode || "request:ok" == r.errMsg)) return r;
                if (u > 0) return u--, e();
                var o = "[mt-weapp-request failed]: " + t.url + ", " + (r && (r.errMsg || r.message));
                if (console.log(o), n.throwError) throw new Error(o);
                return r;
            });
        }();
    };
};