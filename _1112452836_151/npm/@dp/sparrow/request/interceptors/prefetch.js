function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../prefetch/index")), r = e(require("./interceptor"));

exports.default = new r.default({
    type: "request",
    resolve: function(e) {
        var r = e.options, o = e.hookManager;
        if (r.cache) {
            var c = t.default.get(r.cache);
            void 0 !== c && (e.httpPromise = c, t.default.remove(r.cache));
        }
        return r.prefetch && o.on("dispatchRequest", function(e) {
            try {
                var o = e.httpPromise;
                r.prefetch === e.options.prefetch && t.default.add(r.prefetch, o);
            } catch (e) {}
        }), e;
    }
});