var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t, r) {
    "object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? module.exports = exports = r(require("./core"), require("./cipher-core")) : "function" == typeof define && define.amd ? define([ "./core", "./cipher-core" ], r) : r(t.CryptoJS);
}(void 0, function(e) {
    return function() {
        var t = e, r = t.lib.CipherParams, o = t.enc.Hex;
        t.format.Hex = {
            stringify: function(e) {
                return e.ciphertext.toString(o);
            },
            parse: function(e) {
                var t = o.parse(e);
                return r.create({
                    ciphertext: t
                });
            }
        };
    }(), e.format.Hex;
});