Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./interceptor")), r = require("../../../owl-wxapp/es6/index.js");

exports.default = new e.default({
    type: "request",
    resolve: function(e) {
        var t = e.request;
        try {
            t.reportError = function(e) {
                var r = 404;
                return e && e.data && e.data.code && (r = e.data.code), {
                    code: r
                };
            }, t = (0, r.request)(t), e.request = t;
        } catch (e) {}
        return e;
    }
});