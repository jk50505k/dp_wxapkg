Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSiblings = function(t) {
    var e = t[5];
    return e ? e[2] : [ t ];
}, exports.getAttributeValue = function(t, e) {
    return t[1] && t[1][e];
}, exports.hasAttrib = function(t, e) {
    return !!t[1] && !!t[1][e];
}, exports.getName = function(t) {
    return t[0].slice(3);
}, exports.isTag = function(t) {
    return "string" != typeof t;
}, exports.trueFunc = function() {
    return !0;
}, exports.falseFunc = function() {
    return !1;
};