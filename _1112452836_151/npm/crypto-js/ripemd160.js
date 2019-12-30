var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core")) : "function" == typeof define && define.amd ? define([ "./core" ], r) : r(t.CryptoJS);
}(void 0, function(e) {
    return function() {
        function t(e, t, r) {
            return e ^ t ^ r;
        }
        function r(e, t, r) {
            return e & t | ~e & r;
        }
        function o(e, t, r) {
            return (e | ~t) ^ r;
        }
        function n(e, t, r) {
            return e & r | t & ~r;
        }
        function c(e, t, r) {
            return e ^ (t | ~r);
        }
        function s(e, t) {
            return e << t | e >>> 32 - t;
        }
        var i = e, a = i.lib, u = a.WordArray, f = a.Hasher, d = i.algo, h = u.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]), l = u.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]), y = u.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]), p = u.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]), _ = u.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]), m = u.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]), v = d.RIPEMD160 = f.extend({
            _doReset: function() {
                this._hash = u.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(e, i) {
                for (q = 0; q < 16; q++) {
                    var a = i + q, u = e[a];
                    e[a] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8);
                }
                var f, d, v, b, w, S, x, D, H, M, P = this._hash.words, R = _.words, g = m.words, B = h.words, E = l.words, I = y.words, j = p.words;
                S = f = P[0], x = d = P[1], D = v = P[2], H = b = P[3], M = w = P[4];
                for (var k, q = 0; q < 80; q += 1) k = f + e[i + B[q]] | 0, k += q < 16 ? t(d, v, b) + R[0] : q < 32 ? r(d, v, b) + R[1] : q < 48 ? o(d, v, b) + R[2] : q < 64 ? n(d, v, b) + R[3] : c(d, v, b) + R[4], 
                k = (k = s(k |= 0, I[q])) + w | 0, f = w, w = b, b = s(v, 10), v = d, d = k, k = S + e[i + E[q]] | 0, 
                k += q < 16 ? c(x, D, H) + g[0] : q < 32 ? n(x, D, H) + g[1] : q < 48 ? o(x, D, H) + g[2] : q < 64 ? r(x, D, H) + g[3] : t(x, D, H) + g[4], 
                k = (k = s(k |= 0, j[q])) + M | 0, S = M, M = H, H = s(D, 10), D = x, x = k;
                k = P[1] + v + H | 0, P[1] = P[2] + b + M | 0, P[2] = P[3] + w + S | 0, P[3] = P[4] + f + x | 0, 
                P[4] = P[0] + d + D | 0, P[0] = k;
            },
            _doFinalize: function() {
                var e = this._data, t = e.words, r = 8 * this._nDataBytes, o = 8 * e.sigBytes;
                t[o >>> 5] |= 128 << 24 - o % 32, t[14 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), 
                e.sigBytes = 4 * (t.length + 1), this._process();
                for (var n = this._hash, c = n.words, s = 0; s < 5; s++) {
                    var i = c[s];
                    c[s] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
                }
                return n;
            },
            clone: function() {
                var e = f.clone.call(this);
                return e._hash = this._hash.clone(), e;
            }
        });
        i.RIPEMD160 = f._createHelper(v), i.HmacRIPEMD160 = f._createHmacHelper(v);
    }(Math), e.RIPEMD160;
});