Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, t, n) {
    return n && n.length && n.map(function(n) {
        e = n(e, t);
    }), e;
};