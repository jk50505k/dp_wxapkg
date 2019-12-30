function e(e, r, u) {
    var n = function e(r) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return "object" === (void 0 === r ? "undefined" : t(r)) ? o = r : o.url = r, o.header || (o.header = {}), 
        e._request(o);
    };
    return e = e || o, n.config = r || {}, n.use = function(e) {
        n._request = e.call(n, n._request);
    }, n._request = u ? u.call(n, e) : e, n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.promiseRequest = void 0;

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.getRequest = e, exports.MtRequest = function() {
    return {
        request: e.apply(null, arguments)
    };
};

var r = require("../../mt-weapp-utils/lib/wx-promisify.js"), o = exports.promiseRequest = (0, 
r.wxPromisify)("request", wx);