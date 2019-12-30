var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.isString = function(t) {
    return "string" == typeof t;
}, exports.isObject = function(o) {
    return null !== o && "object" === (void 0 === o ? "undefined" : t(o));
};