Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../utils");

exports.default = function(t, r) {
    r = r || {};
    var a = {};
    return [ "url", "method", "dataType", "responseType", "header" ].map(function(t) {
        (0, e.isString)(r[t]) ? void 0 !== r[t] && (a[t] = r[t]) : (0, e.isObject)(r[t]) && (a[t] = Object.assign({}, a[t], r[t]));
    }), a.data = r.data, a;
};