function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./core/Axios")), u = e(require("./defaults")), r = new t.default(u.default);

r.Axios = t.default, r.create = function() {
    return new t.default(u.default);
}, exports.default = r;