function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    var a = e.request, s = e.adapter, o = e.httpPromise, u = e.hookManager, d = a;
    s || (s = t.default.adapter), d.data = (0, r.default)(d.data, d.headers, d.transformRequest);
    var n = {};
    return [ "url", "data", "header", "method", "dataType", "responseType", "success", "fail", "complete" ].map(function(e) {
        void 0 !== d[e] && (n[e] = d[e]);
    }), o || (o = s(n), e.httpPromise = o), u && u.trigger("dispatchRequest", e), o.then(function(t) {
        return t.data = (0, r.default)(t.data, t.headers, d.transformResponse), e.response = t, 
        Promise.resolve(e);
    }, function(e) {
        return Promise.reject(e);
    });
};

var t = e(require("../defaults")), r = e(require("./transformData"));