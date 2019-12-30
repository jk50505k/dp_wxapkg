Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.getBodyStr = function(t) {
    return t ? JSON.stringify(t) : "";
}, exports.isProd = function(t) {
    return "production" === t || !t;
};