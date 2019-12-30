function e(r, o) {
    var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : wx.request, n = r.url, i = r.reportError, u = r.isRequest, c = Date.now(), p = r.complete;
    try {
        r.complete = function(s) {
            try {
                if (s && "object" === (void 0 === s ? "undefined" : t(s))) {
                    var u = s.statusCode, a = void 0 === u ? "500|" : u, y = s.errMsg, l = void 0 === y ? "request:ok" : y, d = s.connectType, f = void 0 === d ? "https" : d, m = s.responseTime, b = (void 0 === m ? 0 : m) || Date.now() - c;
                    b = b.toString(), c = c.toString();
                    var v = {};
                    if (i && "request:fail " !== l) {
                        var g = i(s, e) || {}, S = g.log, h = void 0 === S ? "" : S, q = g.code, C = void 0 === q ? 200 : q, j = g.name, w = void 0 === j ? "" : j, x = "";
                        (h || w) && (x = "ajaxError"), v = {
                            statusCode: a + "|" + C,
                            logContent: h,
                            firstCategory: x,
                            secondCategory: w || r.url
                        };
                    }
                    a = "" + a, o.resource.pushApi(Object.assign({
                        connectType: f,
                        timestamp: c,
                        requestbyte: 0,
                        responsebyte: 0,
                        statusCode: a,
                        resourceUrl: n,
                        responsetime: b
                    }, v));
                } else {
                    var E = Date.now() - c;
                    o.resource.pushApi({
                        connectType: "https",
                        timestamp: c.toString(),
                        requestbyte: "0",
                        responsebyte: "0",
                        statusCode: "500|",
                        resourceUrl: n,
                        responsetime: E.toString()
                    });
                }
            } catch (e) {
                o.error.addError("requestObject complete err", e);
            } finally {
                p && p.apply(this, arguments);
            }
        };
    } catch (e) {
        o.error.addError("requestObject complete err", e);
    }
    return u && s(r), r;
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = e;